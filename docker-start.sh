#!/bin/bash

echo ""
echo "🐳 Iniciando PDV System com Docker..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo -e "${RED}❌ Docker não está instalado!${NC}"
  echo "   Instale em: https://www.docker.com/products/docker-desktop"
  exit 1
fi

echo -e "${BLUE}🏗️  Construindo imagens Docker...${NC}"
docker-compose build

echo ""
echo -e "${BLUE}🚀 Iniciando containers...${NC}"
docker-compose up

echo ""
echo -e "${GREEN}✅ PDV System está rodando!${NC}"
echo ""
echo -e "${YELLOW}🌐 Acesso:${NC}"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001/api"
echo "  Database: localhost:5432"
echo ""
echo -e "${YELLOW}📝 Credenciais:${NC}"
echo "  Email: admin@example.com"
echo "  Senha: password123"
echo ""
