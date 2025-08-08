@echo off
REM ===============================
REM Script para git commit con mensaje manual y fecha
REM ===============================

REM Pedir mensaje al usuario
set /p mensaje=Escribe el mensaje del commit: 

REM Obtener fecha (Windows usa formato distinto según configuración regional)
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do (
    set dia=%%a
    set mes=%%b
    set anio=%%c
)

REM Obtener hora
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set hora=%%a
    set minuto=%%b
)

REM Quitar AM/PM si existe
set hora=%hora: =0%

REM Unir mensaje con fecha y hora
set mensajeFinal=%mensaje% - %dia%/%mes%/%anio% %hora%:%minuto%

echo ===============================
echo Haciendo commit con mensaje:
echo "%mensajeFinal%"
echo ===============================

git add .
git commit -m "%mensajeFinal%"
git push

pause
