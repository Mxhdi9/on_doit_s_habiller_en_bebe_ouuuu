@echo off
setlocal
cd /d "%~dp0"

if not exist "assets\images\archive" mkdir "assets\images\archive"
if not exist "assets\images\operations" mkdir "assets\images\operations"
if not exist "assets\audio" mkdir "assets\audio"

echo.
echo Arborescence prete.
echo.
echo Ajoute tes medias ici avant de deployer :
echo  - assets\images\dex-reveal.svg
echo  - assets\images\world-map-relief.png
echo  - assets\images\archive\accueil.svg
echo  - assets\images\archive\cam01-exterieur.svg
echo  - assets\images\archive\cam02-entree.svg
echo  - assets\images\archive\cam03-couloir.svg
echo  - assets\images\archive\cam04-salon.svg
echo  - assets\images\archive\cam05-cuisine.svg
echo  - assets\images\archive\cam06-chambre.svg
echo  - assets\audio\ascalon-ambient.mp3
echo.
pause
