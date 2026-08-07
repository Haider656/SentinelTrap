"""
database.py
------------
Handles the SQLite database connection and session management for the
Honeytoken Detection & Active Defense module.

Uses SQLAlchemy's Core/ORM engine so the module can easily be swapped
to Postgres/MySQL later by other teams without touching business logic.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ---------------------------------------------------------------------------
# SQLite database file (relative to project root). Using check_same_thread=False
# because FastAPI can use multiple threads to serve requests.
# ---------------------------------------------------------------------------
SQLALCHEMY_DATABASE_URL = "sqlite:///./team2_honeytokens.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Session factory — each request gets its own DB session via get_db() dependency
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that all ORM models inherit from
Base = declarative_base()


def get_db():
    """
    FastAPI dependency that yields a database session and
    guarantees it is closed after the request completes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
