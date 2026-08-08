"""
detector.py
-----------
The core Detection Engine. This is the brain of the module: given a
honeytoken that has just been accessed, it orchestrates the full
incident response flow:

    Honeytoken Accessed
            |
    Detection Engine (this file)
            |
    Generate Alert  (alerts.py)
            |
    Block Attacker  (blocker.py)
            |
    Rotate Token    (rotator.py)
            |
    Return incident details
"""

from datetime import datetime

from sqlalchemy.orm import Session

from models import models
from services.alerts import create_alert
from services.blocker import block_attacker
from services.rotator import rotate_token


def detect_attack(db: Session, token: models.Honeytoken, attacker: str, ip_address: str) -> dict:
    """
    Reusable detection engine function. Call this whenever a honeytoken
    access event needs to be processed end-to-end.

    Args:
        db: Active database session.
        token: The Honeytoken ORM object that was accessed. Must currently
               be "Active" for the full incident-response flow to run.
        attacker: Name/identifier of the attacker or insider.
        ip_address: Source IP of the access attempt.

    Returns:
        A dict containing the complete incident details: alert info,
        block result, and rotation result.
    """
    # Mark honeytoken as triggered before rotation replaces its value
    token.status = "Triggered"
    token.last_triggered = datetime.utcnow()

    # 1. Generate a security alert for this access event
    alert = create_alert(db, token, attacker, ip_address)

    # 2. Simulate blocking the attacker
    block_result = block_attacker(attacker, reason="Honeytoken accessed")

    # 3. Rotate the compromised token so the fake credential can't be reused
    rotation_result = rotate_token(db, token)

    # 4. Assemble the full incident report
    return {
        "message": "Honeytoken Triggered",
        "severity": alert.severity,
        "blocked": block_result["blocked"],
        "token_rotated": True,
        "alert_id": alert.id,
        "new_token_value": rotation_result["new_token"],
    }
