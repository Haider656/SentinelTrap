"""
Production entry point for SentinelTrap.
Serves both the FastAPI backend and the built frontend.
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from models.database import engine, SessionLocal, Base
from models import models
from routes.routes import router
from utils.utils import generate_fake_credential


Base.metadata.create_all(bind=engine)


def migrate_last_triggered():
    from sqlalchemy import inspect, text
    inspector = inspect(engine)
    columns = [col["name"] for col in inspector.get_columns("honeytokens")]
    if "last_triggered" not in columns:
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE honeytokens ADD COLUMN last_triggered DATETIME"))
            conn.commit()
        print("Migrated: added last_triggered column to honeytokens.")


migrate_last_triggered()

app = FastAPI(
    title="SentinelTrap - Production",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
def seed():
    db = SessionLocal()
    try:
        if db.query(models.Honeytoken).count() == 0:
            samples = [
                models.Honeytoken(type="AWS Key", value=generate_fake_credential("AWS Key"), status="Active"),
                models.Honeytoken(type="API Key", value=generate_fake_credential("API Key"), status="Active"),
                models.Honeytoken(type="Employee Credential", value=generate_fake_credential("Employee Credential"), status="Active"),
            ]
            db.add_all(samples)
            db.commit()
            print(f"Seeded {len(samples)} honeytokens.")
    finally:
        db.close()


# Serve built frontend
frontend_path = os.path.join(os.path.dirname(__file__), "frontend_dist")
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

    @app.get("/{full_path:path}")
    async def catch_all(full_path: str):
        file_path = os.path.join(frontend_path, full_path)
        if full_path and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_path, "index.html"))
else:
    @app.get("/")
    def root():
        return {"status": "online", "module": "Detection & Active Defense", "docs": "/docs"}
