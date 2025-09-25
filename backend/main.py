# File: backend/main.py (Definitive Final Version)

import os
import pathway as pw
import json
import google.generativeai as genai
from datetime import datetime
from dotenv import load_dotenv
import threading
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- 1. SETUP ---
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file or environment secrets")
genai.configure(api_key=GEMINI_API_KEY)
generation_config = { "temperature": 0.5, "top_p": 1, "top_k": 1, "max_output_tokens": 2048 }
model = genai.GenerativeModel(model_name="gemini-1.5-flash", generation_config=generation_config)

# --- 2. FASTAPI SERVER & SHARED STATE ---
app = FastAPI(title="Aura Sentinel AI Backend")
alerts_state = []
alerts_lock = threading.Lock()
origins = ["http://localhost:5173", "http://localhost:5174"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. DATA SCHEMAS & STATEFUL LOGIC---
class Login(pw.Schema):
    timestamp: str; user_id: str; ip_address: str; location: str
    city: str; country: str; lat: float; lon: float

user_history_state = {}
history_lock = threading.Lock()

# --- 4. COMBINED UDF (TAKES COLUMNS AS ARGUMENTS) ---
def process_login_and_generate_alert(timestamp, user_id, ip_address, location, city, country, lat, lon):
    with history_lock:
        known_countries = user_history_state.get(user_id, set())
        is_anomaly = country not in known_countries
        previous_countries = sorted(list(known_countries))
        known_countries.add(country)
        user_history_state[user_id] = known_countries

    if not is_anomaly:
        return None

    try:
        timestamp_obj = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        prompt = f"""
        You are a cybersecurity threat analysis AI. Analyze the following login event and provide a response in JSON format.
        User '{user_id}' has a known login history from the following countries: {previous_countries}.
        A new, potentially anomalous event has occurred:
        - Location: '{location}'
        - Timestamp: '{timestamp_obj.isoformat()}'
        - IP Address: '{ip_address}'

        Based on this being a login from a new country, provide the following in a single JSON object without extra text or formatting:
        1. A 'risk_score' (integer 0-100).
        2. A 'summary' (one-sentence string).
        3. A 'recommended_action' (string).
        """
        response = model.generate_content(prompt)
        ai_analysis = json.loads(response.text)
        
        return (
            f"{user_id}-{timestamp_obj.isoformat()}", # alert_id [0]
            user_id,                                 # user [1]
            location,                                # location [2]
            timestamp_obj.isoformat(),               # timestamp [3]
            ai_analysis.get('risk_score', 90),       # risk_score [4]
            ai_analysis.get('summary', 'Analysis failed.'), # summary [5]
            ai_analysis.get('recommended_action', 'Manual review required.'), # recommended_action [6]
            {"lat": lat, "lon": lon}                 # geo [7]
        )
    except Exception as e:
        print(f"Error processing anomaly for user {user_id}: {e}")
        return None

# --- 5. PATHWAY PIPELINE DEFINITION ---
def define_pathway_pipeline():
    logins = pw.io.csv.read("./data/login_logs.csv", schema=Login, mode="streaming", autocommit_duration_ms=1000)

    alert_data_column = pw.apply(
        process_login_and_generate_alert,
        logins.timestamp, logins.user_id, logins.ip_address, logins.location,
        logins.city, logins.country, logins.lat, logins.lon,
    )
    
    alerts_table = logins.select(alert=alert_data_column)
    alerts_table = alerts_table.filter(pw.this.alert.is_not_none())

    final_alerts = alerts_table.select(
        alert_id=pw.this.alert[0],
        user=pw.this.alert[1],
        location=pw.this.alert[2],
        timestamp=pw.this.alert[3],
        risk_score=pw.this.alert[4],
        summary=pw.this.alert[5],
        recommended_action=pw.this.alert[6],
        geo=pw.this.alert[7],
    )

    # ★★★★★ THE FIX IS HERE: Use the documented on_change callback ★★★★★
    pw.io.subscribe(final_alerts, on_alert_change)
    pw.run()

# ★★★★★ AND HERE: The new callback function to handle row-by-row updates ★★★★★
def on_alert_change(key, row, time, is_addition):
    global alerts_state
    with alerts_lock:
        alert_id_to_find = row.get("alert_id")
        
        # Remove any existing version of this alert to handle updates
        alerts_state = [alert for alert in alerts_state if alert.get("alert_id") != alert_id_to_find]
        
        # If it's an addition (or an update), add the new version to the list
        if is_addition:
            alerts_state.append(row)
            
    print(f"State updated. Total alerts: {len(alerts_state)}")


# --- 6. API ENDPOINT & STARTUP ---
@app.get("/api/alerts")
def get_alerts():
    with alerts_lock:
        return alerts_state

pathway_thread = threading.Thread(target=define_pathway_pipeline, daemon=True)
pathway_thread.start()