@echo off
cd /d "%~dp0"
echo.
echo  ASCALON - serveur local alternatif
echo  Adresse : http://127.0.0.1:4182/
echo.
echo  Une fenetre serveur va s'ouvrir.
echo  Garde la fenetre serveur ouverte pendant que tu utilises le site.
echo.
start "ASCALON - serveur 4182" cmd /k "node preview-server.cjs 4182"
powershell -NoProfile -Command "Start-Sleep -Seconds 1"
start "" "http://127.0.0.1:4182/"
