# File: backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# This is the magic that allows your frontend to talk to this backend
origins = [
    "http://localhost:5173", # Default Vite/React port
    "http://localhost:3000", # Default Create-React-App port
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# A simple health check endpoint
@app.get("/")
def read_root():
    return {"Status": "Aura Sentinel Backend is Running"}

# The main endpoint that returns FAKE alert data for now
@app.get("/api/alerts")
def get_alerts():
    # This fake data includes everything the frontend will need later
    return [
        {
            "id": "a1b2c3d4",
            "user": "user_jason",
            "location": "Moscow, RU",
            "timestamp": "2025-09-18T22:30:00Z",
            "risk_score": 95,
            "summary": "High-risk login from a new country outside of normal hours.",
            "recommended_action": "Recommend immediate account review and password reset.",
            "geo": {"lat": 55.7558, "lon": 37.6173} # For the map
        }
    ]