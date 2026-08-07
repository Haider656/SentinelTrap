import secrets
import string


def random_string(length=16):

    characters = (
        string.ascii_letters
        + string.digits
    )

    return "".join(
        secrets.choice(characters)
        for _ in range(length)
    )


def generate_aws_token():

    return (
        "AKIA-DEMO-"
        + random_string(12).upper()
    )


def generate_api_key():

    return (
        "sk-demo-"
        + random_string(24)
    )


def generate_employee_account():

    username = (
        "employee_"
        + random_string(6).lower()
    )

    password = (
        "Demo@"
        + random_string(12)
    )

    return {
        "username": username,
        "password": password
    }


def generate_env_file():

    api_key = generate_api_key()

    return (
        "APP_ENV=development\n"
        "DATABASE_URL=sqlite:///demo.db\n"
        f"API_KEY={api_key}\n"
        "DEBUG=False\n"
    )


def generate_token(token_type):

    token_type = token_type.upper()

    if token_type == "AWS":
        return generate_aws_token()

    elif token_type == "API_KEY":
        return generate_api_key()

    elif token_type == "EMPLOYEE":
        return generate_employee_account()

    elif token_type == "ENV":
        return generate_env_file()

    else:
        raise ValueError(
            "Unsupported token type"
        )