"""
Entry point for the Detection & Active Defense FastAPI application.

Run with:
uvicorn main:app --reload --port 8000

Swagger UI:
http://127.0.0.1:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.database import engine, SessionLocal, Base
from models import models
from routes.routes import router
from utils.utils import generate_fake_credential


# Create database tables
Base.metadata.create_all(bind=engine)


def migrate_last_triggered():
    """Add last_triggered column to honeytokens table if missing."""
    from sqlalchemy import inspect, text
    inspector = inspect(engine)
    columns = [col["name"] for col in inspector.get_columns("honeytokens")]
    if "last_triggered" not in columns:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE honeytokens ADD COLUMN last_triggered DATETIME"))
            conn.commit()
        print("Migrated: added last_triggered column to honeytokens.")


migrate_last_triggered()


# FastAPI application
app = FastAPI(
    title="Honeytoken Insider Threat Detection - (Detection & Active Defense)",
    description=(
        "REST API for detecting honeytoken access, generating security alerts, "
        "simulating attacker blocking, and rotating compromised credentials."
    ),
    version="1.0.0",
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Mount routes
app.include_router(router)


# Seed sample honeytokens
def seed_sample_honeytokens():
    """
    Seeds the database with sample honeytokens only if
    the database is currently empty.
    """

    db = SessionLocal()

    try:
        existing_count = db.query(models.Honeytoken).count()

        if existing_count == 0:
            sample_tokens = [
                models.Honeytoken(
                    type="AWS Key",
                    value=generate_fake_credential("AWS Key"),
                    status="Active",
                ),
                models.Honeytoken(
                    type="API Key",
                    value=generate_fake_credential("API Key"),
                    status="Active",
                ),
                models.Honeytoken(
                    type="Employee Credential",
                    value=generate_fake_credential(
                        "Employee Credential"
                    ),
                    status="Active",
                ),
            ]

            db.add_all(sample_tokens)
            db.commit()

            print(f"Seeded {len(sample_tokens)} sample honeytokens.")

        else:
            print(
                f"Database already has {existing_count} "
                "honeytoken(s); skipping seed."
            )

    finally:
        db.close()


# Startup
@app.on_event("startup")
def on_startup():
    """Runs once when the FastAPI app starts."""
    seed_sample_honeytokens()


# Health check
@app.get("/", tags=["Health"])
def root():
    """Simple health-check endpoint."""

    return {
        "status": "online",
        "module": "Detection & Active Defense",
        "docs": "/docs",
    }