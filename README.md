# 🛡️ SentinelTrap

**SentinelTrap** is a cybersecurity platform that leverages **honeytokens** to detect unauthorized credential access and demonstrate automated incident response. The project simulates real-world credential theft scenarios, detects malicious activity, and provides an interactive dashboard for monitoring threats.

---

## 🚀 Features

- 🍯 Honeytoken generation and management
- 🚨 Real-time honeytoken access detection
- 🛡️ Simulated active defense (block attacker & rotate credentials)
- 📊 Interactive dashboard with threat visualization
- 🤖 AI-powered security recommendations
- 📖 REST APIs with Swagger documentation

---

## 📂 Repository Structure

```text
SentinelTrap/
│
├── README.md
├── docs/
│   ├── architecture.md
│   ├── api-spec.md
│   └── screenshots/
│
├── backend/
│   ├── honeytoken-engine/
│   │   └── README.md
│   │
│   └── detection-defense/
│       └── README.md
│
└── frontend/
    └── README.md
```

---

## 📦 Modules

### 🍯 Honeytoken Engine
Responsible for generating and managing fake credentials (AWS keys, API keys, employee credentials, etc.) and exposing APIs for honeytoken management.

**Documentation:** `backend/honeytoken-engine/README.md`

---

### 🛡️ Detection & Active Defense
Detects honeytoken access, generates alerts, simulates attacker blocking, and rotates compromised credentials.

**Documentation:** `backend/detection-defense/README.md`

---

### 📊 Dashboard & AI
Provides a web dashboard for monitoring security events, visualizing alerts, displaying risk scores, and presenting AI-generated recommendations.

**Documentation:** `frontend/README.md`

---

## 🛠️ Tech Stack

### Backend
- FastAPI
- Python
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

### Frontend
- React
- Tailwind CSS
- Axios

### Tools
- Git & GitHub
- Postman
- Swagger UI
- Docker *(optional)*
- MITRE ATT&CK *(mapping)*

---

## ▶️ Getting Started

Clone the repository:

```bash
git clone https://github.com/Haider656/SentinelTrap.git
cd SentinelTrap
```

Refer to each module's README for setup and execution instructions.

---

## 👥 Team Structure

| Team | Module | Responsibility |
|------|--------|----------------|
| Team 1 | Honeytoken Engine | Generate and manage honeytokens |
| Team 2 | Detection & Active Defense | Detect attacks and automate incident response |
| Team 3 | Dashboard & AI | Build the frontend dashboard and AI insights |

---

## 📜 License

This project was developed as part of a cybersecurity hackathon for educational and demonstration purposes.
