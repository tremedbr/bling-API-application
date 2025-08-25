"""
Configurações da aplicação
"""

import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Configurações da aplicação"""
    
    # Configurações do Bling
    bling_api_token: str = ""
    bling_api_url: str = "https://www.bling.com.br/Api/v3"
    
    # Configurações da aplicação
    app_name: str = "Bling API Application"
    app_version: str = "1.0.0"
    port: int = 3000
    debug: bool = False
    log_level: str = "INFO"
    
    # Configurações de CORS
    cors_origins: list = ["*"]
    cors_methods: list = ["*"]
    cors_headers: list = ["*"]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """Retorna as configurações da aplicação (cached)"""
    return Settings()
