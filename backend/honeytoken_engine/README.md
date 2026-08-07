# SentinelTrap AI — Autonomous Deception Intelligence Platform

Honeytokens & Active Defense hackathon project. This README covers the
**database module** (owned by the backend/database team): setting up the
project in VS Code, initializing SQLite, seeding demo data, and running the
Flask backend.

## Project structure

```
SentinelTrap/
├── backend/
│   ├── app.py              # Flask app entry point (application factory)
│   ├── database.py         # ALL SQL lives here — connection + CRUD helpers
│   ├── init_db.py          # Creates security.db and all tables
│   ├── seed_db.py          # Inserts demo honeytokens, attacks, defense, reports
│   ├── requirements.txt
│   ├── routes/             # Flask blueprints (import from database.py only)
│   ├── models/             # Schema reference / optional dataclasses
│   ├── utils/              # Shared helpers (no direct SQL)
│   └── security.db         # Created automatically — not committed to git
├── frontend/                # Frontend team's code
├── docs/                    # Architecture docs, diagrams, reports
├── .gitignore
└── README.md
```

## 1. Open the project in VS Code

1. Clone or download the repository.
2. Open the `SentinelTrap/` root folder in VS Code (`File > Open Folder...`).
3. Install the official **Python extension** (Microsoft) if you don't
   already have it — VS Code will prompt you.
4. Open a terminal inside VS Code: `` Terminal > New Terminal `` (or
   `` Ctrl+` ``). All commands below run from this terminal.

## 2. Create a virtual environment

From the **repository root**:

```bash
cd backend
python -m venv venv
```

Activate it:

- **Windows (PowerShell):** `venv\Scripts\Activate.ps1`
- **Windows (cmd.exe):** `venv\Scripts\activate.bat`
- **macOS / Linux:** `source venv/bin/activate`

In VS Code, you can also press `Ctrl+Shift+P` → **"Python: Select
Interpreter"** → choose the interpreter inside `backend/venv`.

You should see `(venv)` appear at the start of your terminal prompt once
it's active.

## 3. Install dependencies

With the virtual environment active:

```bash
pip install -r requirements.txt
```

## 4. Initialize the database

This creates `backend/security.db` and every table (`honeytokens`,
`attack_logs`, `active_defense`, `ai_reports`). Safe to re-run at any time —
it will never overwrite existing tables.

```bash
python init_db.py
```

You should see:

```
[init_db] All tables created successfully at: .../backend/security.db
```

## 5. Seed the database with demo data

Populates the database with fake AWS keys, API keys, employee credentials,
`.env` secrets, sample attack logs, defense actions, and AI reports — enough
to demo the dashboard immediately.

```bash
python seed_db.py
```

## 6. Run the Flask backend

```bash
python app.py
```

The API starts on `http://127.0.0.1:5000`. Confirm it's wired up correctly:

```bash
curl http://127.0.0.1:5000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "SentinelTrap AI backend",
  "database": ".../backend/security.db"
}
```

## Using the database module from other parts of the app

Nobody outside `database.py` should write raw SQL. Route files, AI
report-generation code, and utility scripts should just import the helper
functions they need:

```python
from database import (
    create_honeytoken,
    get_all_honeytokens,
    get_honeytoken_by_id,
    update_honeytoken_status,
    delete_honeytoken,
    create_attack_log,
    get_all_attack_logs,
    delete_attack_log,
    create_defense_action,
    get_all_defense_actions,
    create_ai_report,
    get_all_ai_reports,
)
```

Every function returns plain Python dicts/lists (JSON-serializable out of
the box) or `None`/`False` on failure — never raw `sqlite3.Row` objects, and
every write uses parameterized queries, so it's safe to pass user-supplied
input straight through.

## Notes

- All seeded "secrets" (AWS keys, API keys, credentials, `.env` values) are
  entirely fake placeholders generated for the demo — they are decoys by
  design and are not connected to any real service.
- `security.db` is excluded from git via `.gitignore`. Each teammate should
  run `init_db.py` + `seed_db.py` locally after cloning.
