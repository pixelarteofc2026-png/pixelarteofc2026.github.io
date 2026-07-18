# Como Executar o Sistema PDV

## 📋 Pré-requisitos

- Node.js v18+ ([download](https://nodejs.org))
- PostgreSQL 14+ ([download](https://www.postgresql.org/download/))
- Docker e Docker Compose (opcional, mas recomendado)
- Git

## 🚀 Instalação Rápida com Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/pixelarteofc2026-png/pixelarteofc2026.github.io.git
cd pixelarteofc2026.github.io

# Execute com Docker Compose
docker-compose up --build

# O sistema estará disponível em:
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001/api
# Banco de Dados: localhost:5432
```

## 🛠️ Instalação Local

### 1. Backend Setup

```bash
cd backend
npm install

# Configure o banco de dados
cp .env.example .env
# Edite .env com suas credenciais PostgreSQL

# Execute as migrações
npx prisma migrate dev --name init

# Inicie o servidor
npm run dev
# Backend rodando em http://localhost:3001
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Inicie o servidor de desenvolvimento
npm run dev
# Frontend rodando em http://localhost:3000
```

## 🔐 Credenciais de Demonstração

```
Email: admin@example.com
Senha: password123
```

## 📱 Funcionalidades Disponíveis

### ✅ PDV (Frente de Caixa)
- Busca rápida de produtos
- Leitor de código de barras
- Carrinho de compras dinâmico
- Múltiplas formas de pagamento (Dinheiro, PIX, Cartão)
- Cálculo automático de troco
- Gestão de clientes

### ✅ Produtos
- Cadastro e edição
- Gestão de estoque
- Busca por nome, código ou barras
- Categorização e fornecedores

### ✅ Clientes
- Cadastro completo (CPF/CNPJ)
- Histórico de compras
- Pontos de fidelidade
- Informações de contato

### ✅ Relatórios
- Vendas por período
- Produtos mais vendidos
- Análise por categoria
- Gráficos e comparativos

### ✅ Dashboard
- Visão geral de vendas
- Métricas em tempo real
- Tickets médios
- Gráficos de desempenho

## 📦 Estrutura do Projeto

```
pdv-system/
├── frontend/                 # React + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── layouts/         # Layouts
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # Serviços de API
│   │   ├── stores/          # Gerenciamento de estado (Zustand)
│   │   ├── types/           # Tipos TypeScript
│   │   └── styles/          # Estilos globais
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Node.js + Express + Prisma
│   ├── src/
│   │   ├── routes/          # Rotas da API
│   │   ├── controllers/     # Controladores
│   │   ├── services/        # Lógica de negócio
│   │   ├── middlewares/     # Middlewares
│   │   ├── types/           # Tipos TypeScript
│   │   └── utils/           # Utilitários
│   ├── prisma/
│   │   └── schema.prisma    # Schema do banco
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## 🔧 Variáveis de Ambiente

### Backend (.env)
```
DATABASE_URL=postgresql://pdv_user:pdv_password@localhost:5432/pdv_db
NODE_ENV=development
PORT=3001
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
```

## 🚀 Build para Produção

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

## 📚 Documentação da API

Acesse a documentação Swagger em:
```
http://localhost:3001/api/docs
```

## 🐛 Troubleshooting

### Erro de conexão ao banco de dados
```bash
# Verifique se PostgreSQL está rodando
# Windows:
net start postgresql-x64-15

# Linux:
sudo systemctl start postgresql

# macOS:
brew services start postgresql
```

### Erro de porta em uso
```bash
# Mude a porta no .env
PORT=3002  # para backend

# Ou no vite.config.ts
port: 3001  # para frontend
```

### Limpar cache do npm
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Suporte

Para relatar problemas ou sugerir melhorias, abra uma issue no repositório.

## 📝 Licença

MIT
