# Configuração do Ambiente Bling OAuth

## 🎯 Objetivo

Este guia te ajudará a configurar rapidamente o ambiente de integração com o Bling OAuth.

## 📋 Checklist de Configuração

### ✅ 1. Configuração no Bling

- [ ] Acesse [developer.bling.com.br](https://developer.bling.com.br)
- [ ] Crie uma aplicação OAuth
- [ ] Configure URL de callback: `http://localhost:3000/auth/bling/callback`
- [ ] Anote Client ID e Client Secret

### ✅ 2. Configuração do Backend

- [ ] Navegue para pasta `backend`
- [ ] Execute: `npm install`
- [ ] Copie `.env.example` para `.env`
- [ ] Configure as variáveis no `.env`:

```env
# OBRIGATÓRIO - Credenciais do Bling
BLING_CLIENT_ID=seu_client_id_aqui
BLING_CLIENT_SECRET=seu_client_secret_aqui

# OBRIGATÓRIO - JWT Secret (use um gerador online)
JWT_SECRET=sua_chave_jwt_super_secreta_aqui

# OPCIONAL - Configurações avançadas
PORT=3000
NODE_ENV=development
BLING_REDIRECT_URI=http://localhost:3000/auth/bling/callback
FRONTEND_URL=http://localhost:3001
```

### ✅ 3. Configuração do Frontend

- [ ] Navegue para pasta `frontend`
- [ ] Execute: `npm install`
- [ ] Verifique arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### ✅ 4. Executar o Sistema

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### ✅ 5. Testar Configuração

- [ ] Acesse: http://localhost:3001
- [ ] Verifique configuração: http://localhost:3000/config/check
- [ ] Clique em "Conectar com Bling"
- [ ] Complete o OAuth no Bling
- [ ] Confirme redirecionamento para dashboard

## 🚨 Problemas Comuns

### Erro: "Client ID não configurado"

**Solução:** Verifique se o arquivo `.env` existe e contém `BLING_CLIENT_ID`

### Erro: "Token inválido"

**Solução:** Faça logout e login novamente, ou verifique se a URL de callback está correta

### Erro: "Não foi possível conectar com a API"

**Solução:** Verifique se o backend está rodando na porta 3000

### Erro: CORS

**Solução:** Confirme que frontend (3001) e backend (3000) estão nas portas corretas

## 🔧 URLs Importantes

| Serviço         | URL                                | Descrição               |
| --------------- | ---------------------------------- | ----------------------- |
| Frontend        | http://localhost:3001              | Interface principal     |
| Backend         | http://localhost:3000              | API REST                |
| Health Check    | http://localhost:3000/health       | Status do servidor      |
| Config Check    | http://localhost:3000/config/check | Verificar configuração  |
| Bling Developer | https://developer.bling.com.br     | Painel do desenvolvedor |

## 📝 Comandos Úteis

```bash
# Verificar se as portas estão livres
netstat -an | findstr ":3000"
netstat -an | findstr ":3001"

# Instalar dependências de uma vez
cd backend && npm install && cd ../frontend && npm install

# Verificar logs do backend
cd backend && npm run dev

# Build do frontend
cd frontend && npm run build
```

## ⚡ Dicas de Desenvolvimento

1. **Mantenha os dois terminais abertos** - um para backend, outro para frontend
2. **Use o Config Check** - http://localhost:3000/config/check para verificar se tudo está OK
3. **Monitore os logs** - o backend mostra todas as requisições em tempo real
4. **Use a aba API Custom** - para testar endpoints não cobertos pela interface

## 🎉 Pronto!

Se tudo estiver funcionando, você verá:

- ✅ Frontend carregando em http://localhost:3001
- ✅ Backend respondendo em http://localhost:3000/health
- ✅ Configuração OK em http://localhost:3000/config/check
- ✅ Login com Bling funcionando

**Agora você pode começar a integrar com a API do Bling! 🚀**
