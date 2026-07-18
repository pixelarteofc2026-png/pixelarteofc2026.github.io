# PDV System - Sistema Completo de Ponto de Venda

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791)](https://www.postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Sistema web profissional e moderno de Ponto de Venda (PDV) - Frente de Caixa, construído com as melhores tecnologias atuais.

## 🎯 Características Principais

### 🏪 PDV (Frente de Caixa)
- ✅ Interface intuitiva e profissional
- ✅ Busca rápida de produtos (por nome, código ou barras)
- ✅ Leitor de código de barras USB
- ✅ Carrinho de compras dinâmico
- ✅ Múltiplas formas de pagamento
- ✅ Cálculo automático de troco
- ✅ Gestão de clientes
- ✅ Impressão de cupom (térmica, A4, PDF)
- ✅ Emissão de NFC-e

### 📦 Gestão de Produtos
- ✅ Cadastro completo com imagens
- ✅ Controle de estoque
- ✅ Múltiplas categorias e marcas
- ✅ Preços diferenciados (venda, atacado, promoção)
- ✅ Alertas de estoque baixo
- ✅ Histórico de movimentações

### 👥 Gestão de Clientes
- ✅ Cadastro completo (CPF/CNPJ)
- ✅ Histórico de compras
- ✅ Sistema de crédito
- ✅ Programa de fidelidade
- ✅ Lista VIP
- ✅ Aniversariantes

### 📊 Relatórios e Análises
- ✅ Vendas por período
- ✅ Produtos mais vendidos
- ✅ Análise por categoria
- ✅ Gráficos de desempenho
- ✅ Exportação (Excel, PDF, CSV)

### 💰 Financeiro
- ✅ Fluxo de caixa
- ✅ Contas a pagar/receber
- ✅ Dashboard financeiro
- ✅ Histórico de transações

### 🔐 Segurança
- ✅ Autenticação JWT
- ✅ Refresh Token
- ✅ 2FA (Autenticação de Dois Fatores)
- ✅ Controle de permissões por perfil
- ✅ Logs de auditoria
- ✅ Backup automático

### 📱 Responsividade
- ✅ Desktop
- ✅ Tablet
- ✅ Celular
- ✅ PWA (Progressive Web App)
- ✅ Modo Offline

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Library UI
- **TypeScript** - Tipagem de código
- **Tailwind CSS** - Estilização
- **React Router** - Roteamento
- **Zustand** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **Recharts** - Gráficos
- **Lucide Icons** - Ícones
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem de código
- **PostgreSQL** - Banco de dados
- **Prisma** - ORM
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senha
- **Cors** - Requisições cross-origin
- **Docker** - Containerização

## 🚀 Quick Start

### Com Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/pixelarteofc2026-png/pixelarteofc2026.github.io.git
cd pixelarteofc2026.github.io

# Execute com Docker Compose
docker-compose up --build

# Acesse
# Frontend: http://localhost:3000
# Backend: http://localhost:3001/api
```

### Localmente

```bash
# Backend
cd backend
npm install
npx prisma migrate dev --name init
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm run dev
```

## 📖 Documentação Completa

Veja o arquivo [SETUP.md](SETUP.md) para instruções detalhadas de instalação e configuração.

## 🔐 Credenciais de Demonstração

```
Email: admin@example.com
Senha: password123
```

## 📁 Estrutura de Pastas

```
.
├── frontend/                    # Aplicação React
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── pages/              # Páginas
│   │   ├── layouts/            # Layouts
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # Serviços de API
│   │   ├── stores/             # Estado (Zustand)
│   │   ├── types/              # Tipos TypeScript
│   │   ├── styles/             # Estilos CSS
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                     # API Node.js
│   ├── src/
│   │   ├── routes/             # Rotas da API
│   │   ├── services/           # Lógica de negócio
│   │   ├── middlewares/        # Middlewares
│   │   ├── types/              # Tipos TypeScript
│   │   ├── server.ts
│   │   └── ...
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🎨 Screenshots

### Tela de Login
![PDV Login](docs/screenshots/login.png)

### PDV - Frente de Caixa
![PDV Caixa](docs/screenshots/pdv.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Relatórios
![Relatórios](docs/screenshots/relatorios.png)

## 🔄 Fluxo de Desenvolvimento

1. **Branch principal**: `main`
2. **Branch de features**: `feature/pdv-system`
3. **Pull Requests**: Revisar antes de merge

## 📝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🐛 Reportando Bugs

Para relatar bugs, abra uma issue com:
- Descrição clara do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Ambiente (OS, navegador, versão)

## 💡 Sugestões de Features

Sugestões são bem-vindas! Abra uma issue descrevendo a funcionalidade desejada.

## 📞 Contato

- Email: pixelarteofc2026@gmail.com
- GitHub: [@pixelarteofc2026-png](https://github.com/pixelarteofc2026-png)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- React community
- Tailwind CSS
- Prisma ORM
- Todos os contribuidores

---

**Desenvolvido com ❤️ por PDV Team**

Este é um sistema profissional, pronto para produção, com todas as melhores práticas de desenvolvimento web moderno.
