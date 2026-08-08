# SentinelTrap - Deployment Guide

## Build Artifacts

### Frontend
- **Location:** `frontend/dist/`
- **Contents:** Static HTML, CSS, JS files ready for hosting
- **Deploy to:** Vercel, Netlify, Cloudflare Pages, or serve from FastAPI

### FastAPI Backend
- **Location:** `backend/detection_defense/build/`
- **Contents:** All backend source files, database, and startup scripts
- **Port:** 8000

### Flask Backend (Optional)
- **Location:** `backend/honeytoken_engine/build/`
- **Contents:** Flask app, config, and database
- **Port:** 5000

---

## Option 1: Deploy Frontend + FastAPI (Recommended)

The FastAPI build folder includes the frontend static files in `frontend_dist/`.

1. Deploy `backend/detection_defense/build/` to Render/Railway/Fly.io
2. Set the start command to:
   ```bash
   uvicorn production:app --host 0.0.0.0 --port $PORT
   ```
3. The app serves the API at `/api/*` and the frontend at `/`

---

## Option 2: Deploy Separately

### Frontend (Vercel/Netlify)
1. Connect your Git repo
2. Set build command: `npm run build`
3. Set output directory: `frontend/dist`
4. Set environment variable: `VITE_API_URL=https://your-backend-url.com`

### FastAPI Backend (Render/Railway)
1. Connect your Git repo
2. Set build command: `pip install -r backend/detection_defense/requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables for CORS origin

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port (set by platform) | 8000 |
| `DATABASE_URL` | PostgreSQL connection string | SQLite file |
| `CORS_ORIGIN` | Allowed frontend origin | `*` |

---

## Database

- **Development:** SQLite files included in build folders
- **Production:** Replace with PostgreSQL via `DATABASE_URL`
- Both backends use SQLAlchemy and support DATABASE_URL env var

---

## Quick Local Test

```bash
# Terminal 1: FastAPI
cd backend/detection_defense/build
uvicorn production:app --reload --port 8000

# Terminal 2: Flask (optional)
cd backend/honeytoken_engine/build
python app.py
```

Then open `http://localhost:8000`
