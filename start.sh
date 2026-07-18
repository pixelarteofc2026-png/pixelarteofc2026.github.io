#!/bin/bash

echo ""
echo "🚀 Iniciando PDV System..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Backend Setup${NC}"
cd backend

if [ ! -d "node_modules" ]; then
  echo "📥 Instalando dependências do backend..."
  npm install
fi

echo "📊 Criando banco de dados..."
npx prisma migrate dev --name init 2>/dev/null || true

echo "🌱 Populando banco de dados..."
npm run db:seed

echo ""
echo -e "${BLUE}📱 Frontend Setup${NC}"
cd ../frontend

if [ ! -d "node_modules" ]; then
  echo "📥 Instalando dependências do frontend..."
  npm install
fi

echo ""
echo -e "${GREEN}✅ Setup concluído!${NC}"
echo ""
echo -e "${YELLOW}🎯 Próximos passos:${NC}"
echo ""
echo -e "${BLUE}Terminal 1 - Backend:${NC}"
echo "  cd backend"
echo "  npm run dev"
echo "  🔗 http://localhost:3001/api"
echo ""
echo -e "${BLUE}Terminal 2 - Frontend:${NC}"
echo "  cd frontend"
echo "  npm run dev"
echo "  🔗 http://localhost:3000"
echo ""
echo -e "${YELLOW}📝 Credenciais de acesso:${NC}"
echo "  Email: admin@example.com"
echo "  Senha: password123"
echo ""
