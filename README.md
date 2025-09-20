# Aegis Command 🛡️

A real-time threat intelligence platform using a Retrieval-Augmented Generation (RAG) pipeline to detect, explain, and visualize cybersecurity threats.

This project is a functional prototype developed in 7 days for the Code Cubicle 5.0 Hackathon, supported by Pathway's Trae Geek Room.

---

## Project Overview

In the domain of cybersecurity, the Mean Time to Detect and Respond (MTTD/MTTR) is a critical metric that often determines the difference between a minor incident and a catastrophic breach. Breaches typically succeed in the time gap between an initial compromise and the security team's ability to fully understand and react to the threat. Aegis Command is a proof-of-concept platform architected to drastically reduce this gap.

Our solution moves beyond the generic, high-volume alerts that lead to analyst fatigue. By leveraging a real-time Retrieval-Augmented Generation (RAG) pipeline, Aegis Command doesn't just flag an anomaly—it retrieves the specific, surrounding log data for crucial context and then utilizes a Large Language Model to generate a clear, human-readable explanation of the threat. This process transforms raw, noisy logs into actionable intelligence, empowering security teams to make faster, more informed decisions. A video walkthrough demonstrating the real-time capabilities of this prototype is also available.

---

## Key Features

- **Real-Time Threat Detection:** The system is designed to ingest and process live data streams, spotting anomalies and potential threats in under a second.
- **AI-Powered Explanations:** It utilizes a RAG pipeline to provide context-aware, intelligent summaries of threats, moving beyond simple error codes to deliver meaningful insights.
- **Role-Based Dashboards:** The platform features a comprehensive UI suite with four distinct dashboards tailored for different stakeholders: the Executive Dashboard, the Analytics Dashboard, the Live Monitoring view, and the main Command Center.
- **Global Threat Visualization:** An interactive map provides a geolocational view of security events as they happen, offering immediate situational awareness.
- **Fully Responsive UI:** The interface is built to be clean, modern, and accessible on a variety of devices.

---

## System Architecture

Our system follows a powerful, real-time data flow from ingestion to visualization:

Live Data Sources (Logs, Events)
│
└───> Pathway RAG Engine (Backend)
│   1. Detects Anomalies
│   2. Retrieves Contextual Data
│   3. Generates AI-powered Explanation
│
└───> Real-time API (WebSocket)
│
└───> React Frontend (UI)
│   - Visualizes alerts
│   - Displays dashboards

## Technology Stack

The backend of the platform is built with Python and leverages the powerful **Pathway** library to construct the real-time RAG pipeline. It interfaces with a Large Language Model (such as OpenAI's GPT or Google's Gemini) to generate intelligent threat explanations.

The frontend is a modern single-page application built with **React** and tooled with **Vite** for a fast development experience. All styling is handled with the utility-first framework **Tailwind CSS**.

---
