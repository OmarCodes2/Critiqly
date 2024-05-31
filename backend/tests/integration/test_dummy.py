import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client

def test_dummy_integration(test_app):
    response = test_app.get("/")
    assert response.status_code == 404
