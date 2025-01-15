from fastapi import FastAPI
from api.routers import car_validation

app = FastAPI()

app.include_router(car_validation.router)

@app.get("/")
def read_root():
    return "Welcome to the Car Evaluation API!"
