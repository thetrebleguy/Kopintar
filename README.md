# Kopintar 

A modern full-stack web application starter built with **React**, **TypeScript**, **Tailwind CSS**, and **FastAPI**.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI, Uvicorn, Pydantic, NumPy

---

## 📁 Project Structure

```text
Kopintar/
├── backend/
│   ├── main.py              # FastAPI app with CORS & endpoints
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components (Header, Card)
│   │   ├── hooks/           # Custom React hooks (useBackendHealth)
│   │   ├── pages/           # Application views (Home)
│   │   ├── services/        # API communication services
│   │   ├── types/           # TypeScript interfaces & types
│   │   ├── App.tsx          # Main App entry
│   │   ├── index.css        # Tailwind CSS styles
│   │   └── main.tsx         # React DOM mount point
│   ├── package.json
│   └── vite.config.ts       # Vite config (port 5173)
└── README.md
```

---

## ⚡ Quickstart Guide

### 1. Backend Setup (Port 8000)

Make sure you have **Python 3.10+** installed.

```bash
cd backend

# (Recommended) Create and activate a virtual environment
python -m venv .venv
# Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn main:app --reload --port 8000
```

- API Base URL: [http://localhost:8000](http://localhost:8000)
- Interactive API Docs (Swagger UI): [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 2. Frontend Setup (Port 5173)

Make sure you have **Node.js 18+** installed.

```bash
cd frontend

# Install dependencies (if first time)
npm install

# Start development server
npm run dev
```

- Web App: [http://localhost:5173](http://localhost:5173)

---

## 🔗 Connecting Frontend & Backend

CORS is already configured in `backend/main.py` to allow requests originating from `http://localhost:5173`. When both servers are running, the frontend will automatically connect to the backend and display live connection status.
