@echo off
set /p message=Mensaje del commit: 
git add .
git commit -m "%date% %time% - %message%"
git push origin main
pause
