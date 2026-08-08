"""
Handles rotation of compromised honeytokens: the old value is retired
and a brand-new fake credential is generated and activated in its place.
"""

from sqlalchemy.orm import Session

from models import models
from utils.utils import generate_fake_credential


def rotate_token(db: Session, token: models.Honeytoken) -> dict:
    """
    Rotates a compromised honeytoken by generating a new fake credential
    and activating it.

    Args:
        db: Active database session.
        token: The Honeytoken ORM object to rotate.

    Returns:
        A dict with the old token value, new token value, and new status.
    """

    old_value = token.value

    # Generate a new unique fake credential
    new_value = generate_fake_credential(token.type)

    # Make sure the new value doesn't already exist
    while (
        db.query(models.Honeytoken)
        .filter(models.Honeytoken.value == new_value)
        .first()
    ):
        new_value = generate_fake_credential(token.type)

    # Replace the compromised credential
    token.value = new_value

    # IMPORTANT: new credential is active but marked as rotated
    token.status = "Rotated"

    db.commit()
    db.refresh(token)

    return {
        "old_token": old_value,
        "new_token": new_value,
        "status": token.status,
    }