import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_dummy_e2e():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 404
