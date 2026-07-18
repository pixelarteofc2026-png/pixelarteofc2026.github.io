# 🚀 Scripts de Deploy

## Opção 1: Vercel (Frontend) + Railway (Backend)

### Deploy Frontend na Vercel
```bash
bash deploy-vercel.sh
```

### Deploy Backend na Railway
```bash
bash deploy-railway.sh
```

---

## Opção 2: DigitalOcean Full Stack

```bash
bash deploy-digitalocean.sh
```

---

## Opção 3: Docker Hub

```bash
# Build
docker build -f backend/Dockerfile.prod -t seu-usuario/pdv-backend:latest ./backend
docker build -f frontend/Dockerfile.prod -t seu-usuario/pdv-frontend:latest ./frontend

# Push
docker push seu-usuario/pdv-backend:latest
docker push seu-usuario/pdv-frontend:latest
```

---

## Opção 4: Heroku

```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Criar app
heroku create seu-app-name

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:mini

# Definir variáveis
heroku config:set JWT_SECRET=seu_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

---

## Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados migrado
- [ ] CORS configurado
- [ ] SSL/HTTPS ativado
- [ ] Domínio customizado
- [ ] Backup automático
- [ ] Monitoramento ativo

---

**Desenvolvido com ❤️ por PDV Team**
