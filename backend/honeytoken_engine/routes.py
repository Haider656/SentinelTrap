from flask import Blueprint, request, jsonify
from datetime import datetime

from models import db, Honeytoken
from honeytoken_engine import generate_token


api = Blueprint(
    "api",
    __name__
)


# =========================================================
# HOME
# =========================================================

@api.route("/", methods=["GET"])
def home():

    return jsonify({
        "project": "SentinalTrap",
        "team": "Core Backend & Honeytoken Engine",
        "status": "Running",
        "version": "1.0"
    })


# =========================================================
# HEALTH CHECK
# =========================================================

@api.route("/health", methods=["GET"])
def health_check():

    return jsonify({
        "status": "online",
        "service": "SentinalTrap Backend",
        "database": "SQLite"
    })


# =========================================================
# GENERATE HONEYTOKEN
# =========================================================

@api.route(
    "/generate-token",
    methods=["POST"]
)
def create_token():

    data = request.get_json()

    if not data:

        return jsonify({
            "error": "Request body is required"
        }), 400

    token_type = data.get("type")

    if not token_type:

        return jsonify({
            "error": "Token type is required"
        }), 400

    token_type = token_type.upper()

    allowed_types = [
        "AWS",
        "API_KEY",
        "EMPLOYEE",
        "ENV"
    ]

    if token_type not in allowed_types:

        return jsonify({
            "error": "Invalid token type",
            "allowed_types": allowed_types
        }), 400

    try:

        value = generate_token(token_type)

        token = Honeytoken(
            token_type=token_type,
            value=str(value),
            description=f"Demo {token_type} honeytoken",
            status="Active"
        )

        db.session.add(token)

        db.session.commit()

        return jsonify(
            token.to_dict()
        ), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "error": str(e)
        }), 500


# =========================================================
# GET ALL HONEYTOKENS
# =========================================================

@api.route(
    "/tokens",
    methods=["GET"]
)
def get_tokens():

    tokens = Honeytoken.query.order_by(
        Honeytoken.id.desc()
    ).all()

    return jsonify([
        token.to_dict()
        for token in tokens
    ])


# =========================================================
# GET SINGLE HONEYTOKEN
# =========================================================

@api.route(
    "/tokens/<int:token_id>",
    methods=["GET"]
)
def get_token(token_id):

    token = Honeytoken.query.get(
        token_id
    )

    if not token:

        return jsonify({
            "error": "Honeytoken not found"
        }), 404

    return jsonify(
        token.to_dict()
    )


# =========================================================
# STATISTICS
# =========================================================

@api.route(
    "/stats",
    methods=["GET"]
)
def get_stats():

    total = Honeytoken.query.count()

    active = Honeytoken.query.filter_by(
        status="Active"
    ).count()

    triggered = Honeytoken.query.filter_by(
        status="Triggered"
    ).count()

    disabled = Honeytoken.query.filter_by(
        status="Disabled"
    ).count()

    return jsonify({

        "honeytokens_generated": total,

        "active_tokens": active,

        "triggered_tokens": triggered,

        "disabled_tokens": disabled

    })


# =========================================================
# TRIGGER HONEYTOKEN
# =========================================================

@api.route(
    "/tokens/<int:token_id>/trigger",
    methods=["POST"]
)
def trigger_token(token_id):

    token = Honeytoken.query.get(
        token_id
    )

    if not token:

        return jsonify({
            "error": "Honeytoken not found"
        }), 404

    token.status = "Triggered"

    token.last_triggered = datetime.utcnow()

    db.session.commit()

    return jsonify({

        "message": "Honeytoken triggered successfully",

        "token": token.to_dict()

    }), 200