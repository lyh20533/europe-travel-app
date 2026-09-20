import os

bat_code = """@echo off
cd /d C:\\Users\\lyh\\.gemini\\antigravity-ide\\scratch\\europe_travel_webapp
echo =========================================================
echo Starting Europe Travel WebApp Server on http://localhost:8085
echo =========================================================
powershell -Command "Get-NetTCPConnection -LocalPort 8085 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"
ping 127.0.0.1 -n 2 >nul
py -3 server.py || py server.py
"""

sh_code = """#!/bin/bash
APP_DIR="C:/Users/lyh/.gemini/antigravity-ide/scratch/europe_travel_webapp"
cd "$APP_DIR" || cd /c/Users/lyh/.gemini/antigravity-ide/scratch/europe_travel_webapp
echo =========================================================
echo Starting Europe Travel WebApp Server on http://localhost:8085
echo =========================================================
powershell -Command "Get-NetTCPConnection -LocalPort 8085 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"
sleep 1
py -3 server.py || py server.py
"""

with open(r'C:\Users\lyh\run_server.bat', 'w', encoding='utf-8') as f:
    f.write(bat_code)

with open(r'C:\Users\lyh\run_server.sh', 'w', encoding='utf-8') as f:
    f.write(sh_code)

print("Updated scripts successfully.")
