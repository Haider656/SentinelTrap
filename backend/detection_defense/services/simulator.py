"""
simulator.py
------------
Simulates an attacker/insider accessing a honeytoken. This module is the
entry point used by the /simulate-attack API — it validates the token,
checks whether it's a live honeytoken, and hands off to the detection
engine to run the full response flow.
"""

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from models import models
from services.detector import detect_attack


def simulate_attack(db: Session, token_id: int, attacker: str, ip_address: str) -> dict:
    """
    Simulates an attacker accessing a honeytoken and triggers the full
    detection + active-defense pipeline.

    Args:
        db: Active database session.
        token_id: ID of the honeytoken being "accessed".
        attacker: Name/identifier of the attacker or insider.
        ip_address: Source IP of the access attempt.

    Raises:
        HTTPException(404): If no honeytoken with that ID exists.
        HTTPException(409): If the token has already been triggered/rotated
                             (i.e., it's not currently Active).

    Returns:
        The complete incident details dict from the detection engine.
    """
    token = db.query(models.Honeytoken).filter(models.Honeytoken.id == token_id).first()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Honeytoken with id {token_id} not found",
        )

    if token.status != "Active":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Honeytoken {token_id} is not active (current status: {token.status})",
        )

    # Hand off to the detection engine for the full response pipeline
    return detect_attack(db, token, attacker, ip_address)
