from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Honeytoken(db.Model):

    __tablename__ = "honeytokens"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    token_type = db.Column(
        db.String(50),
        nullable=False
    )

    value = db.Column(
        db.Text,
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(20),
        default="Active",
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    last_triggered = db.Column(
        db.DateTime,
        nullable=True
    )

    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "type": self.token_type,
            "value": self.value,
            "description": self.description,
            "status": self.status,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
            "last_triggered": (
                self.last_triggered.isoformat()
                if self.last_triggered
                else None
            )
        }