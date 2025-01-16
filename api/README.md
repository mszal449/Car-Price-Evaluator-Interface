# Car Price Evaluator Interface

## 🚀 Project Overview
This project is a **FastAPI-based car price evaluation API** that predicts the estimated price of a car based on given parameters. It uses machine learning to provide an accurate valuation.

## 🪄 Setup & Installation Guide
### To get started, clone the repository using:
```bash
git clone git@github.com:mszal449/Car-Price-Evaluator-Interface.git
cd Car-Price-Evaluator-Interface
```

### Set Up the Virtual Environment

Linux/macOS:
```bash
python3 -m venv venv
source venv/bin/activate
```

Windows (CMD):
```cmd
python -m venv venv
venv\Scripts\activate
```

Windows (PowerShell):
```powershell
python -m venv venv
venv\Scripts\Activate.ps1
```

### Install Dependencies
```bash
pip install -r api/requirements.txt
```

### Run the FastAPI Server Using Uvicorn:
```bash
uvicorn api.main:app --reload
```

After starting the server, you should see an output similar to:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

## 📜 API Documentation
Once the server is running, you can explore the API documentation:

- **Swagger UI** (interactive API docs):
  👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc (alternative documentation format)**:
  👉 [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)


## 📌 Notes
- Ensure you have **Python 3.8+** installed.
- If using **Windows PowerShell**, you might need to enable script execution: `Set-ExecutionPolicy Unrestricted -Scope Process`.
- The `--reload` flag allows for automatic reloading during development.

Now your **Car Price Evaluator API** is up and running! 🚗💨