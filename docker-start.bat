@echo off
echo.
echo 🐳 Iniciando PDV System com Docker...
echo.

where docker >nul 2>nul
if %errorlevel% neq 0 (
  echo ❌ Docker não está instalado!
  echo    Instale em: https://www.docker.com/products/docker-desktop
  pause
  exit /b 1
)

echo 🏗️  Construindo imagens Docker...
call docker-compose build

echo.
echo 🚀 Iniciando containers...
call docker-compose up

echo.
echo ✅ PDV System está rodando!
echo.
echo 🌐 Acesso:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3001/api
echo   Database: localhost:5432
echo.
echo 📝 Credenciais:
echo   Email: admin@example.com
echo   Senha: password123
echo.
pause
