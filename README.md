# SentinelTrap AI — Autonomous Deception Intelligence Platform

**Honeytokens Engine and Backend API module.**

This module provides the **Flask backend, SQLite database, REST APIs, and Honeytoken Engine** for SentinelTrap AI.

## Project Structure

```text
SentinelTrap/
├── app.py                    # Flask application entry point
├── config.py                 # SQLite/database configuration
├── models.py                 # SQLAlchemy database models
├── routes.py                 # REST API endpoints
├── honeytoken_engine.py      # Honeytoken generation
├── requirements.txt          # Python dependencies
├── README.md
├── .gitignore
└── instance/
    └── sentinaltrap.db       # Local database, not committed
```

## 1. Open the Project in VS Code

Clone/download the repository and open the **SentinelTrap** folder in VS Code.

Open the terminal:

```text
Terminal → New Terminal
```

## 2. Create a Virtual Environment

```powershell
python -m venv venv
```

Activate on Windows:

```powershell
venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source venv/bin/activate
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

Main dependencies:

```text
Flask
Flask-SQLAlchemy
```

## 4. Initialize the Database

The SQLite database and required tables are created automatically when the application starts.

```bash
python app.py
```

Database location:

```text
instance/sentinaltrap.db
```

## 5. Run the Backend

```bash
python app.py
```

API:

```text
http://127.0.0.1:5000
```

### Health Check

```text
GET /health
```

Expected response:

```json
{
  "status": "online",
  "service": "SentinalTrap Backend",
  "database": "SQLite"
}
```

## 6. Honeytoken API

| Method | Endpoint               | Purpose             |
| ------ | ---------------------- | ------------------- |
| GET    | `/`                    | Backend status      |
| GET    | `/health`              | Health check        |
| POST   | `/generate-token`      | Generate honeytoken |
| GET    | `/tokens`              | Get all tokens      |
| GET    | `/tokens/<id>`         | Get one token       |
| GET    | `/stats`               | Token statistics    |
| POST   | `/tokens/<id>/trigger` | Trigger a token     |

### Generate a Honeytoken

```http
POST /generate-token
```

Request:

```json
{
  "type": "AWS"
}
```

Supported types:

```text
AWS
API_KEY
EMPLOYEE
ENV
```

Generated tokens are fake demo credentials designed for the deception environment and are not connected to real services.

## 7. Honeytoken Engine

`honeytoken_engine.py` generates randomized demo:

* AWS-style keys
* API keys
* Employee credentials
* `.env` configuration values

The Python `secrets` module is used for random token generation.

## 8. Database

The project uses **SQLite + Flask-SQLAlchemy**.

The `Honeytoken` model stores:

* Token ID
* Token type
* Value
* Description
* Status
* Creation time
* Last triggered time

The database is automatically created locally and should **not** be committed to GitHub.

## 9. Git & Security

`.gitignore` excludes:

```gitignore
venv/
__pycache__/
*.pyc
instance/
*.db
.env
```

Do not commit real credentials, API keys, passwords, or other secrets.

## Future Enhancements

* Real-time attacker monitoring
* Security alerts
* Threat intelligence
* IP/request tracking
* AI-based attack analysis
* Attack timeline
* Incident reports
* Automated containment
* Frontend dashboard integration

**Module:** Core Backend & Honeytoken Engine
**Project:** SentinelTrap AI
