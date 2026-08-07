"""
alerts.py
---------
Responsible for creating and persisting security Alert records whenever
a honeytoken is accessed.
"""

from sqlalchemy.orm import Session
from datetime import datetime

from models import models
from utils.utils import determine_severity

def create_alert(
    db: Session,
    token: models.Honeytoken,
    attacker: str,
    ip_address: str,
    action: str = "Blocked & Rotated",
) -> models.Alert:
    """
    Creates and stores a new Alert record for a honeytoken access event.

    Args:
        db: Active database session.
        token: The Honeytoken ORM object that was accessed.
        attacker: Name/identifier of the attacker or insider.
        ip_address: Source IP of the access attempt.
        action: Description of the defensive action taken.

    Returns:
        The newly created Alert ORM object (already committed).
    """
    alert = models.Alert(
        token_id=token.id,
        token_type=token.type,
        attacker=attacker,
        ip_address=ip_address,
        severity=determine_severity(token.type),
        action=action,
        status="Blocked",
        timestamp=datetime.utcnow(),
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert


def get_all_alerts(db: Session):
    """Returns every alert, most recent first."""
    return db.query(models.Alert).order_by(models.Alert.timestamp.desc()).all()
