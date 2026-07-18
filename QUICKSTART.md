# 🚀 Como Executar o PDV System

## Opção 1: Com Docker (Recomendado) ✨

### Windows
```bash
docker-start.bat
```

### macOS / Linux
```bash
bash docker-start.sh
```

### Acesso
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend: http://localhost:3001/api  
- 🗄️ Banco de dados: localhost:5432

---

## Opção 2: Setup Local Automático

### Windows
```bash
start.bat
```

### macOS / Linux
```bash
bash start.sh
```

---

## Opção 3: Setup Manual

### 1️⃣ Backend
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

### 2️⃣ Frontend (em outro terminal)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Credenciais de Acesso

```
Email: admin@example.com
Senha: password123
```

---

## 🎯 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

---

## ❓ Problemas?

### Porta em uso
```bash
# Backend (mudar a porta em backend/.env)
PORT=3002

# Frontend (mudar em frontend/vite.config.ts)
port: 3001
```

### Erro de banco de dados
```bash
# Verifique se PostgreSQL está rodando
# Docker:
docker ps

# Local:
sudo systemctl start postgresql  # Linux
brew services start postgresql    # macOS
```

### Limpar cache
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Estrutura do Projeto

```
.
├── frontend/          # React + TypeScript + Tailwind
├── backend/           # Node.js + Express + Prisma
├── docker-compose.yml # Orquestração Docker
├── start.sh           # Script de setup (Mac/Linux)
├── start.bat          # Script de setup (Windows)
├── docker-start.sh    # Docker setup (Mac/Linux)
└── docker-start.bat   # Docker setup (Windows)
```

---

## ✨ Funcionalidades Principais

✅ PDV - Frente de Caixa profissional
✅ Gestão de Produtos
✅ Gestão de Clientes
✅ Relatórios e Gráficos
✅ Dashboard em tempo real
✅ Múltiplas formas de pagamento
✅ Autenticação JWT segura
✅ Interface responsiva
✅ Modo offline (PWA)

---

## 🎨 Tecnologias

- **Frontend**: React 18, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL
- **Containerização**: Docker & Docker Compose

---

**Desenvolvido com ❤️ por PDV Team**
