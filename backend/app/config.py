from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

class Settings(BaseSettings):
    # Database URL, which can be defined in the .env file
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ENVIRONMENT: str = "development"
    SECURE_COOKIES: bool = False
    ALLOWED_ORIGINS: str = "http://localhost:5173"

    class Config:
        env_file = ".env"  # Path to the .env file

# Instantiate the settings class to access the variables
settings = Settings()

# Optionally print the value to verify it's loaded correctly
# print(settings.DATABASE_URL)
