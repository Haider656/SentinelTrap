"""
models.py
---------
SQLAlchemy ORM models representing the core database tables:

- Honeytoken: fake credentials planted to lure attackers.
- Alert: security incidents generated when a honeytoken is accessed.
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from models.database import Base


class Honeytoken(Base):
    """
    Represents a fake credential (AWS key, API key, employee login, etc.)
    planted in the system to detect unauthorized/insider access.
    """
    __tablename__ = "honeytokens"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)          # e.g. "AWS Key", "API Key"
    value = Column(String, nullable=False, unique=True)  # the fake credential string
    status = Column(String, default="Active")      # Active | Triggered | Rotated
    created_at = Column(DateTime, default=datetime.utcnow)

    # One honeytoken can have many historical alerts
    alerts = relationship("Alert", back_populates="honeytoken")


class Alert(Base):
    """
    Represents a security alert raised when a honeytoken is accessed
    by an attacker/insider.
    """
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    token_id = Column(Integer, ForeignKey("honeytokens.id"), nullable=False)
    token_type = Column(String, nullable=False)
    attacker = Column(String, nullable=False)
    ip_address = Column(String, nullable=True)
    severity = Column(String, default="High")       # Low | Medium | High | Critical
    action = Column(String, default="Blocked & Rotated")
    status = Column(String, default="Blocked")       # Blocked | Investigating | Resolved
    timestamp = Column(DateTime, default=datetime.utcnow)

    honeytoken = relationship("Honeytoken", back_populates="alerts")
