@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0COPIER_MEDIAS_VERCEL.ps1"
pause
