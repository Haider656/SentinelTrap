# Detection & Defense Module

## Overview

The **Detection & Defense Module** is responsible for detecting suspicious activities, generating alerts, and executing automated defense mechanisms within the SentinelTrap platform.

## Features

- Real-time threat detection
- Alert generation
- IP blocking
- Credential rotation
- Attack simulation
- SQLite database integration
- REST API support

## Project Structure

```
detection_defense/
├── models/         # Database models
├── routes/         # API endpoints
├── services/       # Detection & defense logic
├── utils/          # Helper functions
├── main.py         # FastAPI entry point
├── schemas.py      # API schemas
└── requirements.txt
```

## Tech Stack

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn

## Workflow

```
Request
   │
   ▼
Detection Engine
   │
   ▼
Threat Analysis
   ├── Alert Generation
   ├── IP Blocking
   └── Credential Rotation
   │
   ▼
Database Logging
```

## Run

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the server:

```bash
uvicorn main:app --reload
```

API Docs:

```
http://localhost:8000/docs
```

## Future Enhancements

- MITRE ATT&CK Mapping
- ML-based Detection
- WebSocket Monitoring
- ELK Stack Integration

---
**Module Responsibilities:** Threat Detection • Active Defense • Alert Generation • Attack Simulation • Security Event Logging
