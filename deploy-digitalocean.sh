#!/bin/bash

echo ""
echo "🚀 Iniciando Deploy Full Stack do PDV System na DigitalOcean..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
  echo -e "${RED}❌ DigitalOcean CLI (doctl) não está instalado!${NC}"
  echo -e "${YELLOW}Instale em: https://docs.digitalocean.com/reference/doctl/how-to/install/${NC}"
  echo ""
  exit 1
fi

echo -e "${BLUE}🔐 Autenticando com DigitalOcean...${NC}"
doctl auth init

echo ""
echo -e "${BLUE}🏗️  Criando App Platform...${NC}"
echo "Acesse: https://cloud.digitalocean.com/apps"
echo "e crie um novo app conectado ao seu repositório GitHub."
echo ""
echo -e "${YELLOW}DigitalOcean detectará automaticamente docker-compose.yml${NC}"
echo ""
echo -e "${YELLOW}Configure as variáveis de ambiente:${NC}"
echo "  JWT_SECRET=seu_secret_aqui"
echo "  NODE_ENV=production"
echo ""
echo -e "${GREEN}✅ Siga os passos no painel da DigitalOcean!${NC}"
echo ""
