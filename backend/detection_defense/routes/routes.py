"""
routes.py
---------
Defines all REST API endpoints for the Detection & Active Defense module,
organized using FastAPI's APIRouter so main.py stays clean and this router
can be easily mounted/imported by other teams' FastAPI apps.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.database import get_db
from models import models


from schemas import (
    SimulateAttackRequest,
    SimulateAttackResponse,
    AlertOut,
    BlockRequest,
    BlockResponse,
    RotateTokenRequest,
    RotateTokenResponse,
)

from services.simulator import simulate_attack
from services.alerts import get_all_alerts
from services.blocker import block_attacker
from services.rotator import rotate_token
router = APIRouter()


# ---------------------------------------------------------------------------
# API 1: Simulate Attack
# ---------------------------------------------------------------------------
@router.post("/simulate-attack", response_model=SimulateAttackResponse, tags=["Detection"])
def simulate_attack_endpoint(payload: SimulateAttackRequest, db: Session = Depends(get_db)):
    """
    Simulates an attacker/insider accessing a honeytoken.

    Runs the full pipeline: verify token -> detect -> alert -> block -> rotate.
    """
    result = simulate_attack(
        db=db,
        token_id=payload.token_id,
        attacker=payload.attacker,
        ip_address=payload.ip,
    )
    return result


# ---------------------------------------------------------------------------
# API 2: Get Alerts
# ---------------------------------------------------------------------------
@router.get("/alerts", response_model=list[AlertOut], tags=["Alerts"])
def get_alerts_endpoint(db: Session = Depends(get_db)):
    """Returns every alert ever generated, most recent first."""
    return get_all_alerts(db)


# ---------------------------------------------------------------------------
# API 3: Block Attacker
# ---------------------------------------------------------------------------
@router.post("/block", response_model=BlockResponse, tags=["Active Defense"])
def block_attacker_endpoint(payload: BlockRequest):
    """Manually/explicitly blocks an attacker by name (simulation only)."""
    result = block_attacker(payload.attacker, reason="Honeytoken accessed")
    return result


# ---------------------------------------------------------------------------
# API 4: Rotate Token
# ---------------------------------------------------------------------------
@router.post("/rotate-token", response_model=RotateTokenResponse, tags=["Active Defense"])
def rotate_token_endpoint(payload: RotateTokenRequest, db: Session = Depends(get_db)):
    """Rotates a honeytoken: retires the old fake credential and issues a new one."""
    token = db.query(models.Honeytoken).filter(models.Honeytoken.id == payload.token_id).first()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Honeytoken with id {payload.token_id} not found",
        )

    result = rotate_token(db, token)
    return result


# ---------------------------------------------------------------------------
# Bonus: List honeytokens (useful for frontend/testing, not in original spec
# but harmless and helpful for integration/demo purposes)
# ---------------------------------------------------------------------------
@router.get("/honeytokens", tags=["Honeytokens"])
def list_honeytokens(db: Session = Depends(get_db)):
    """Returns all honeytokens currently seeded in the system (for demo/testing)."""
    tokens = db.query(models.Honeytoken).all()
    return [
        {
            "id": t.id,
            "type": t.type,
            "value": t.value,
            "status": t.status,
            "created_at": t.created_at,
        }
        for t in tokens
    ]
