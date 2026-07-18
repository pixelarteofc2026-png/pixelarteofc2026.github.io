# PDV System - Deployment Guide

## 🚀 Deployment Online

### Opção 1: Vercel (Frontend) + Railway (Backend)

#### Frontend - Vercel
```bash
# 1. Acesse vercel.com e faça login
# 2. Crie um novo projeto
# 3. Conecte seu repositório GitHub
# 4. Defina root directory como 'frontend'
# 5. Deploy automático
```

**Resultado**: `https://seu-app.vercel.app`

#### Backend - Railway
```bash
# 1. Acesse railway.app
# 2. Crie novo projeto
# 3. Conecte GitHub
# 4. Selecione a pasta 'backend'
# 5. Configure variáveis de ambiente:
#    - DATABASE_URL
#    - JWT_SECRET
#    - NODE_ENV=production
# 6. Deploy automático
```

**Resultado**: `https://seu-backend.up.railway.app`

---

### Opção 2: DigitalOcean App Platform (Full Stack)

```bash
# 1. Acesse digitalocean.com
# 2. Create -> App
# 3. Conecte GitHub
# 4. DigitalOcean detectará docker-compose.yml
# 5. Configure variáveis de ambiente
# 6. Deploy automático
```

**Resultado**: App DigitalOcean com PostgreSQL + Backend + Frontend

---

### Opção 3: Docker Hub + AWS

```bash
# 1. Build da imagem Docker
docker build -t seu-usuario/pdv-system .

# 2. Push para Docker Hub
docker push seu-usuario/pdv-system

# 3. Deploy na AWS ECS, EC2 ou Lightsail
```

---

### Opção 4: Heroku

```bash
# 1. Instale Heroku CLI
# 2. Login: heroku login
# 3. Crie app: heroku create seu-app
# 4. Adicione PostgreSQL: heroku addons:create heroku-postgresql:mini
# 5. Configure variáveis: heroku config:set JWT_SECRET=xxx
# 6. Deploy: git push heroku main
```

---

## 📋 Checklist de Deployment

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados criado
- [ ] JWT_SECRET definido
- [ ] CORS configurado
- [ ] SSL/HTTPS ativado
- [ ] Backup automático ativado
- [ ] Logs configurados
- [ ] Monitoramento ativo
- [ ] Domínio customizado
- [ ] Email configurado

---

## 🔐 Variáveis de Ambiente Necessárias

```env
# Backend
DATABASE_URL=postgresql://user:password@host/dbname
NODE_ENV=production
PORT=3001
JWT_SECRET=your_very_long_secret_key_here
FRONTEND_URL=https://seu-dominio.com

# Frontend
REACT_APP_API_URL=https://api.seu-dominio.com
```

---

## 🌐 Domínios Customizados

```bash
# Exemplo com Namecheap/GoDaddy
1. Compre domínio: pdv-system.com.br
2. Configure DNS para apontar para:
   - Frontend: CNAME vercel.com (Vercel)
   - Backend: CNAME railway.app (Railway)
3. Aguarde propagação (24-48h)
```

---

## 📊 Monitoramento

### Sentry (Error Tracking)
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: "production",
});
```

### New Relic (Performance)
```javascript
require('newrelic');
```

---

## 🔄 CI/CD Automático

O repositório já contém GitHub Actions. Todos os pushes para `main` disparam:
1. Build do frontend e backend
2. Testes automáticos
3. Deploy automático

---

## 📱 Status do Deployment

Acesse o dashboard do seu provedor de hosting:
- Vercel: https://vercel.com/dashboard
- Railway: https://railway.app/dashboard
- DigitalOcean: https://cloud.digitalocean.com/apps

---

**🎉 Seu PDV System está pronto para ir ao ar!**
