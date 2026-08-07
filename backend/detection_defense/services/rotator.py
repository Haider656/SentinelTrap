"""
rotator.py
----------
Handles rotation of compromised honeytokens: the old value is retired
and marked "Rotated", and a brand-new fake credential is generated and
activated in its place (so the honeytoken can keep being used as a lure).
"""

from sqlalchemy.orm import Session

from models import models
from utils.utils import generate_fake_credential


def rotate_token(db: Session, token: models.Honeytoken) -> dict:
    """
    Rotates a compromised honeytoken by generating a new fake credential
    and updating the database record.

    Args:
        db: Active database session.
        token: The Honeytoken ORM object to rotate.

    Returns:
        A dict with the old token value, new token value, and new status.
    """
    old_value = token.value

    new_value = generate_fake_credential(token.type)
    # Ensure the newly generated value doesn't collide with an existing one
    while db.query(models.Honeytoken).filter(models.Honeytoken.value == new_value).first():
        new_value = generate_fake_credential(token.type)

    token.value = new_value
    token.status = "Rotated"

    db.commit()
    db.refresh(token)

    return {
        "old_token": old_value,
        "new_token": new_value,
        "status": token.status,
    }
