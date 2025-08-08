@echo off
REM ===============================
REM Script para git commit con fecha
REM ===============================

REM Formato de fecha y hora
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do (
    set dia=%%a
    set mes=%%b
    set anio=%%c
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set hora=%%a
    set minuto=%%b
)

REM Quita AM/PM si existe
set hora=%hora: =0%

REM Mensaje del commit
set mensaje=Actualización automática - %dia%/%mes%/%anio% %hora%:%minuto%

echo ===============================
echo Haciendo commit con mensaje:
echo "%mensaje%"
echo ===============================

git add .
git commit -m "%mensaje%"
git push

pause
