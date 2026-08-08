@echo off
echo Starting SentinelTrap - Flask Backend (port 5000)...
cd /d "%~dp0"
pip install -r requirements.txt
python app.py
pause
