@echo off
echo Starting SentinelTrap - FastAPI Backend (port 8000)...
cd /d "%~dp0"
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
pause
