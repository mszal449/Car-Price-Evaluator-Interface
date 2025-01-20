from fastapi import FastAPI
from api.routers import car_validation
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(car_validation.router)

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return "Welcome to the Car Evaluation API!"
