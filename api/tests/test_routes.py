import requests

BASE_URL = "http://127.0.0.1:8000"

def test_root_endpoint():
    """Testuje endpoint główny /"""
    url = f"{BASE_URL}/"
    response = requests.get(url)

    assert response.status_code == 200, f"Expected status 200, got {response.status_code}"
    assert response.json() == "Welcome to the Car Evaluation API!", f"Unexpected response: {response.json()}"

def test_evaluate_endpoint():
    """Testuje endpoint /evaluate"""
    url = f"{BASE_URL}/evaluate"
    payload = {
        "brand": "Toyota",
        "model": "Corolla",
        "year": 2015,
        "mileage": 50000,
        "fuel_type": "petrol",
        "transmission": "manual",
    }

    response = requests.post(url, json=payload)

    assert response.status_code == 200, f"Expected status 200, got {response.status_code}"

    json_response = response.json()
    assert "estimated_value" in json_response, "Response missing 'estimated_value'"
    assert "estimated_range" in json_response, "Response missing 'estimated_range'"
    assert isinstance(json_response["estimated_value"], float), "Estimated value should be a float"
    assert isinstance(json_response["estimated_range"], list), "Estimated range should be a list"
    assert len(json_response["estimated_range"]) == 2, "Estimated range should contain two values"
