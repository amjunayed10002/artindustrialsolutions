from getpass import getpass
from pathlib import Path
import secrets

import MySQLdb


BASE_DIR = Path(__file__).resolve().parent


def main() -> None:
    root_password = getpass("MySQL root password (input hidden): ")
    app_password = secrets.token_urlsafe(32)
    secret_key = secrets.token_urlsafe(50)

    connection = MySQLdb.connect(
        host="localhost",
        user="root",
        passwd=root_password,
        charset="utf8mb4",
    )
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "CREATE DATABASE IF NOT EXISTS art_industrial_db "
                "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
            )
            cursor.execute(
                "CREATE USER IF NOT EXISTS 'art_app'@'localhost' IDENTIFIED BY %s",
                (app_password,),
            )
            cursor.execute(
                "ALTER USER 'art_app'@'localhost' IDENTIFIED BY %s",
                (app_password,),
            )
            cursor.execute(
                "GRANT ALL PRIVILEGES ON art_industrial_db.* TO 'art_app'@'localhost'"
            )
        connection.commit()
    finally:
        connection.close()

    env_file = BASE_DIR / ".env"
    env_file.write_text(
        "\n".join(
            [
                f"DJANGO_SECRET_KEY={secret_key}",
                "DJANGO_DEBUG=True",
                "DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1",
                "DB_NAME=art_industrial_db",
                "DB_USER=art_app",
                f"DB_PASSWORD={app_password}",
                "DB_HOST=127.0.0.1",
                "DB_PORT=3306",
                "",
            ]
        ),
        encoding="utf-8",
    )
    print(f"Database and app account are ready. Local settings saved to {env_file}.")


if __name__ == "__main__":
    main()