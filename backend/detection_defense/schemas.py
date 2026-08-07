"""
schemas.py
----------
Pydantic models used for request validation and response serialization.
Keeping these separate from the SQLAlchemy ORM models (models.py) is a
FastAPI best practice — it decouples the API contract from the DB schema,
which makes it easier for the frontend/other teams to integrate against
a stable JSON contract.
"""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


# ---------------------------------------------------------------------------
# Honeytoken schemas
# ---------------------------------------------------------------------------
class HoneytokenOut(BaseModel):
    id: int
    type: str
    value: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True  # allows creation from ORM objects (Pydantic v2)


# ---------------------------------------------------------------------------
# Alert schemas
# ---------------------------------------------------------------------------
class AlertOut(BaseModel):
    id: int
    token_id: int
    token_type: str
    attacker: str
    ip_address: Optional[str] = None
    severity: str
    action: str
    status: str
    timestamp: datetime

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# API 1: Simulate Attack
# ---------------------------------------------------------------------------
class SimulateAttackRequest(BaseModel):
    token_id: int = Field(..., description="ID of the honeytoken being accessed")
    attacker: str = Field(..., description="Name/identifier of the attacker or insider")
    ip: Optional[str] = Field(None, description="Source IP address of the access attempt")


class SimulateAttackResponse(BaseModel):
    message: str
    severity: str
    blocked: bool
    token_rotated: bool
    alert_id: Optional[int] = None
    new_token_value: Optional[str] = None


# ---------------------------------------------------------------------------
# API 3: Block Attacker
# ---------------------------------------------------------------------------
class BlockRequest(BaseModel):
    attacker: str = Field(..., description="Name/identifier of the attacker to block")


class BlockResponse(BaseModel):
    blocked: bool
    reason: str


# ---------------------------------------------------------------------------
# API 4: Rotate Token
# ---------------------------------------------------------------------------
class RotateTokenRequest(BaseModel):
    token_id: int = Field(..., description="ID of the honeytoken to rotate")


class RotateTokenResponse(BaseModel):
    old_token: str
    new_token: str
    status: str
