"""
Testes para a aplicação principal
"""

import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_root_endpoint():
    """Testa o endpoint raiz"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Bling API Application"
    assert data["status"] == "running"

def test_health_check():
    """Testa o health check"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "bling-api-application"

def test_config_endpoint():
    """Testa o endpoint de configuração"""
    response = client.get("/api/config")
    assert response.status_code == 200
    data = response.json()
    assert "bling_api_url" in data
    assert "port" in data
    assert "debug" in data
    assert "token_configured" in data
