# PDV System - Frente de Caixa

Sistema Web Profissional de PDV (Ponto de Venda) - Frente de Caixa

## Stack Tecnológico

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + Prisma ORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT + Refresh Token + 2FA
- **Containerização**: Docker
- **PWA**: Service Workers + Offline Mode
- **API**: REST API + Swagger

## Características Principais

### 🏪 Módulo PDV
- Frente de caixa profissional e intuitiva
- Pesquisa rápida (nome, código, código de barras)
- Leitor de código de barras USB integrado
- Carrinho de compras com gerenciamento completo
- Múltiplas formas de pagamento
- Parcelamento automático
- Impressão de cupom (térmica, A4, PDF)
- Emissão de NFC-e

### 📦 Módulo Produtos
- Cadastro completo com imagens
- Gestão de estoque
- Múltiplas categorias e marcas
- Controle de fornecedores
- Códigos (interno, barras, SKU)
- Preços diferenciados (venda, atacado, promoção)
- Histórico de movimentações

### 💳 Módulo Financeiro
- Fluxo de caixa em tempo real
- Contas a pagar e receber
- Centro de custos
- Dashboard financeiro com gráficos
- Relatórios detalhados

### 👥 Módulo Clientes
- Cadastro completo com CPF/CNPJ
- Histórico de compras
- Sistema de crédito
- Programa de fidelidade
- Lista VIP
- Aniversariantes

### 📊 Relatórios
- Vendas por período
- Produtos mais vendidos
- Desempenho de funcionários
- Gráficos e comparativos
- Exportar em Excel, PDF, CSV

### 🔐 Segurança
- Autenticação JWT com Refresh Token
- Autenticação de Dois Fatores (2FA)
- Controle de permissões por perfil
- Logs de auditoria
- Backup automático
- Criptografia de dados sensíveis

### 🌐 Integrações
- WhatsApp Business
- Mercado Pago
- PagSeguro
- Stripe
- Asaas
- Gerencianet
- Google Drive, Sheets
- ViaCEP
- Correios

## Estrutura do Projeto

```
pdv-system/
├── frontend/                 # React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── styles/
│   ├── public/
│   └── package.json
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── utils/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Instalação e Configuração

### Com Docker (Recomendado)

```bash
docker-compose up --build
```

### Instalação Local

#### Requisitos
- Node.js v18+
- PostgreSQL 14+
- npm ou yarn

#### Backend

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## Variáveis de Ambiente

Ver arquivos `.env.example` em cada diretório.

## Contribuindo

Ver CONTRIBUTING.md

## Licença

MIT
