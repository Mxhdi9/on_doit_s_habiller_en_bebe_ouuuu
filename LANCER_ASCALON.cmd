@echo off
cd /d "%~dp0"
echo.
echo  ASCALON - serveur local
echo  Adresse : http://127.0.0.1:4181/
echo.
echo  Une fenetre serveur va s'ouvrir.
echo  Garde la fenetre serveur ouverte pendant que tu utilises le site.
echo.
start "ASCALON - serveur 4181" cmd /k "node preview-server.cjs 4181"
powershell -NoProfile -Command "Start-Sleep -Seconds 1"
start "" "http://127.0.0.1:4181/"
