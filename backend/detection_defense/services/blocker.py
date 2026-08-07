"""
blocker.py
----------
Simulates blocking an attacker/insider once a honeytoken has been triggered.

NOTE: This is a SIMULATION for hackathon demo purposes. No real firewall,
IAM, or network ACL calls are made. In a production system this module
would call out to a firewall API, IAM policy, or SOAR platform instead.
"""

from typing import Set

# In-memory "blocklist" — simple set for demo purposes.
# In a real system this would be a database table or an external
# firewall/IAM service call.
_BLOCKED_ATTACKERS: Set[str] = set()


def block_attacker(attacker: str, reason: str = "Honeytoken accessed") -> dict:
    """
    Simulates blocking an attacker by adding them to an in-memory blocklist.

    Args:
        attacker: Name/identifier of the attacker to block.
        reason: Why the attacker is being blocked.

    Returns:
        A dict describing the result of the block action.
    """
    _BLOCKED_ATTACKERS.add(attacker)
    return {"blocked": True, "reason": reason}


def is_blocked(attacker: str) -> bool:
    """Checks whether a given attacker is currently on the blocklist."""
    return attacker in _BLOCKED_ATTACKERS


def get_blocked_attackers() -> list:
    """Returns the full list of currently blocked attackers (for debugging/demo)."""
    return sorted(_BLOCKED_ATTACKERS)
