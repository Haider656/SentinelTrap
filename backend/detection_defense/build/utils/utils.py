"""
utils.py
--------
Small reusable helper functions shared across the module.
"""

import random
import string


def generate_fake_credential(token_type: str) -> str:
    """
    Generates a realistic-looking FAKE credential string based on token type.
    These are simulation-only values and are never valid real-world secrets.

    Args:
        token_type: The category of honeytoken, e.g. "AWS Key", "API Key",
                     "Employee Credential".

    Returns:
        A fake credential string appropriate to the token type.
    """
    token_type_lower = token_type.lower()

    if "aws" in token_type_lower:
        # Mimic AWS Access Key ID format: AKIA + 16 uppercase alphanumeric chars
        suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=16))
        return f"AKIA{suffix}"

    if "employee" in token_type_lower or "credential" in token_type_lower:
        # Mimic a fake employee login token
        suffix = "".join(random.choices(string.digits, k=6))
        return f"EMP-USER-{suffix}"

    # Generic API key format
    suffix = "".join(random.choices(string.ascii_letters + string.digits, k=24))
    return f"sk_fake_{suffix}"


def determine_severity(token_type: str) -> str:
    """
    Assigns a severity level based on the sensitivity of the token type.
    This can be extended with more nuanced business rules later.
    """
    token_type_lower = token_type.lower()

    if "aws" in token_type_lower or "root" in token_type_lower:
        return "Critical"
    if "employee" in token_type_lower or "credential" in token_type_lower:
        return "High"
    return "Medium"
