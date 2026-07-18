#!/bin/bash

echo ""
echo "🚀 Iniciando Deploy do PDV System na Railway..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
  echo -e "${RED}❌ Railway CLI não está instalado!${NC}"
  echo -e "${YELLOW}Instale com: npm install -g @railway/cli${NC}"
  echo ""
  exit 1
fi

echo -e "${BLUE}📋 Fazendo login na Railway...${NC}"
railway login

echo ""
echo -e "${BLUE}🔧 Inicializando projeto Railway...${NC}"
railway init

echo ""
echo -e "${BLUE}📦 Adicionando PostgreSQL...${NC}"
railway add --plugin postgresql

echo ""
echo -e "${BLUE}🔐 Configurando variáveis de ambiente...${NC}"
railway variables set JWT_SECRET="$(openssl rand -base64 32)"
railway variables set NODE_ENV="production"

echo ""
echo -e "${BLUE}🚀 Fazendo deploy...${NC}"
railway up

echo ""
echo -e "${GREEN}✅ Deploy concluído!${NC}"
echo ""
echo -e "${YELLOW}🌐 Seu app está em:${NC}"
railway open
echo ""
