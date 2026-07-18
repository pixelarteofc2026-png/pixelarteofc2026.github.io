@echo off
echo.
echo 🚀 Iniciando PDV System...
echo.

echo 📦 Backend Setup
cd backend

if not exist "node_modules" (
  echo 📥 Instalando dependências do backend...
  call npm install
)

echo 📊 Criando banco de dados...
call npx prisma migrate dev --name init

echo 🌱 Populando banco de dados...
call npm run db:seed

echo.
echo 📱 Frontend Setup
cd ..
cd frontend

if not exist "node_modules" (
  echo 📥 Instalando dependências do frontend...
  call npm install
)

echo.
echo ✅ Setup concluído!
echo.
echo 🎯 Próximos passos:
echo.
echo 📦 Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo   🔗 http://localhost:3001/api
echo.
echo 📱 Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo   🔗 http://localhost:3000
echo.
echo 📝 Credenciais de acesso:
echo   Email: admin@example.com
echo   Senha: password123
echo.
pause
