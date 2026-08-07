"""
main.py
-------
Entry point for the Team 2 - Detection & Active Defense FastAPI application.

Run with:
    uvicorn main:app --reload --port 8000

Swagger UI available at:
    http://127.0.0.1:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.database import engine, SessionLocal, Base
from models import models
from routes.routes import router
from utils.utils import generate_fake_credential
# ---------------------------------------------------------------------------
# Create all database tables (if they don't already exist)
# ---------------------------------------------------------------------------
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Honeytoken Insider Threat Detection - (Detection & Active Defense)",
    description=(
        "REST API for detecting honeytoken access, generating security alerts, "
        "simulating attacker blocking, and rotating compromised credentials."
    ),
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS - allow the React frontend (and other team services) to call these APIs
# during the hackathon. Restrict origins in a real production deployment.
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all Detection & Active Defense routes
app.include_router(router)


def seed_sample_honeytokens():
    """
    Seeds the database with a handful of sample honeytokens on startup,
    ONLY if the table is currently empty. This makes the API immediately
    testable without any manual setup — handy for a hackathon demo.
    """
    db = SessionLocal()
    try:
        existing_count = db.query(models.Honeytoken).count()
        if existing_count == 0:
            sample_tokens = [
                models.Honeytoken(type="AWS Key", value=generate_fake_credential("AWS Key")),
                models.Honeytoken(type="API Key", value=generate_fake_credential("API Key")),
                models.Honeytoken(
                    type="Employee Credential",
                    value=generate_fake_credential("Employee Credential"),
                ),
            ]
            db.add_all(sample_tokens)
            db.commit()
            print(f"Seeded {len(sample_tokens)} sample honeytokens.")
        else:
            print(f"Database already has {existing_count} honeytoken(s); skipping seed.")
    finally:
        db.close()


@app.on_event("startup")
def on_startup():
    """Runs once when the FastAPI app starts."""
    seed_sample_honeytokens()


@app.get("/", tags=["Health"])
def root():
    """Simple health-check / welcome endpoint."""
    return {
        "status": "online",
        "module": "- Detection & Active Defense",
        "docs": "/docs",
    }
