#!/bin/bash

echo ""
echo "🚀 Iniciando Deploy do PDV System na Vercel..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo -e "${RED}❌ Vercel CLI não está instalado!${NC}"
  echo -e "${YELLOW}Instale com: npm install -g vercel${NC}"
  echo ""
  exit 1
fi

echo -e "${BLUE}📋 Navegando para a pasta frontend...${NC}"
cd frontend

echo ""
echo -e "${BLUE}🔐 Fazendo login na Vercel...${NC}"
vercel login

echo ""
echo -e "${BLUE}🚀 Fazendo deploy do Frontend...${NC}"
vercel --prod

echo ""
echo -e "${GREEN}✅ Frontend deployado com sucesso!${NC}"
echo ""
echo -e "${YELLOW}📝 Próximo passo: Deploy do Backend na Railway${NC}"
echo -e "${YELLOW}Execute: bash deploy-railway.sh${NC}"
echo ""
