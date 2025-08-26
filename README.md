# Integração Bling OAuth

Sistema completo para integração com a API do Bling via OAuth 2.0, desenvolvido com Node.js (backend) e Next.js (frontend).

## 📋 Funcionalidades

- ✅ **Autenticação OAuth 2.0** com o Bling
- ✅ **Interface moderna** com Next.js e Tailwind CSS
- ✅ **API RESTful** com Express.js
- ✅ **Listagem de produtos** com filtros
- ✅ **Consulta de pedidos** por período
- ✅ **Gerenciamento de contatos**
- ✅ **Requisições personalizadas** para qualquer endpoint
- ✅ **Renovação automática** de tokens
- ✅ **Rate limiting** e segurança
- ✅ **Tratamento de erros** robusto

## 🚀 Configuração Rápida

### 1. Pré-requisitos

- Node.js 16+ instalado
- Conta no Bling com app OAuth configurado
- Git (opcional)

### 2. Configuração do Bling

1. Acesse o [Painel de Desenvolvedor do Bling](https://developer.bling.com.br)
2. Crie uma nova aplicação OAuth
3. Configure a URL de callback: `http://localhost:3000/auth/bling/callback`
4. Anote o `Client ID` e `Client Secret`

### 3. Instalação do Backend

```bash
cd backend
npm install
```

Copie o arquivo de configuração:

```bash
copy .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
BLING_CLIENT_ID=seu_client_id_aqui
BLING_CLIENT_SECRET=seu_client_secret_aqui
JWT_SECRET=uma_chave_secreta_muito_segura
```

### 4. Instalação do Frontend

```bash
cd frontend
npm install
```

### 5. Executar o Sistema

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

Acesse: http://localhost:3001

## 📁 Estrutura do Projeto

```
integracao-bling/
├── backend/                    # API Node.js
│   ├── src/
│   │   ├── config/            # Configurações
│   │   ├── controllers/       # Controladores
│   │   ├── middleware/        # Middlewares
│   │   ├── routes/           # Rotas
│   │   ├── services/         # Serviços
│   │   ├── utils/            # Utilitários
│   │   └── app.js            # Aplicação principal
│   ├── package.json
│   └── .env.example
├── frontend/                   # Interface Next.js
│   ├── src/
│   │   ├── app/              # Pages (App Router)
│   │   ├── components/       # Componentes React
│   │   ├── hooks/           # Custom hooks
│   │   └── services/        # Serviços de API
│   ├── package.json
│   └── next.config.js
└── README.md
```

## 🔧 API Endpoints

### Autenticação

- `GET /auth` - Iniciar OAuth
- `GET /auth/bling/callback` - Callback OAuth
- `POST /auth/refresh` - Renovar token
- `GET /auth/check` - Verificar autenticação
- `POST /auth/logout` - Logout

### API Bling

- `GET /api/bling/user` - Informações do usuário
- `GET /api/bling/produtos` - Listar produtos
- `GET /api/bling/pedidos` - Listar pedidos
- `GET /api/bling/contatos` - Listar contatos
- `POST /api/bling/custom` - Requisição personalizada

### Utilitários

- `GET /health` - Health check
- `GET /config/check` - Verificar configuração

## 🎯 Como Usar

### 1. Primeira Autenticação

1. Acesse http://localhost:3001
2. Clique em "Conectar com Bling"
3. Autorize a aplicação no Bling
4. Será redirecionado para o dashboard

### 2. Explorar Dados

- **Produtos**: Liste e filtre produtos por tipo e situação
- **Pedidos**: Consulte pedidos por período e status
- **Contatos**: Visualize clientes e fornecedores
- **API Custom**: Faça requisições personalizadas

### 3. Requisições Personalizadas

Use a aba "API Custom" para:

- Testar endpoints não cobertos
- Fazer requisições POST/PUT
- Explorar a API completa do Bling

## 🔒 Segurança

- **OAuth 2.0** para autenticação segura
- **JWT** para sessões
- **Rate limiting** por IP
- **Sanitização** de dados
- **Validação** de state CSRF
- **Headers de segurança** com Helmet.js

## 🛠️ Desenvolvimento

### Executar em modo de desenvolvimento:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### Build para produção:

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend (usar PM2 ou similar)
cd backend
npm start
```

## 📚 Documentação da API do Bling

- [Documentação Oficial](https://developer.bling.com.br)
- [Referência da API v3](https://developer.bling.com.br/reference)
- [Guia OAuth](https://developer.bling.com.br/guide/oauth)

## 🐛 Solução de Problemas

### Erro "Client ID não configurado"

- Verifique se o arquivo `.env` existe no backend
- Confirme se `BLING_CLIENT_ID` e `BLING_CLIENT_SECRET` estão corretos

### Erro "Token inválido"

- Clique em "Sair" e faça login novamente
- Verifique se a URL de callback está correta no Bling

### Erro "CORS"

- Verifique se o backend está rodando na porta 3000
- Confirme se o frontend está na porta 3001

### Erro 404 nos endpoints

- Verifique se o backend está rodando
- Confirme se a `NEXT_PUBLIC_API_URL` está correta

## 📈 Próximas Funcionalidades

- [ ] Dashboard com métricas
- [ ] Sincronização automática
- [ ] Webhooks do Bling
- [ ] Cache Redis
- [ ] Logs estruturados
- [ ] Testes automatizados
- [ ] Deploy com Docker

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 📞 Suporte

Para dúvidas sobre:

- **API do Bling**: [Suporte Bling](https://ajuda.bling.com.br)
- **Este projeto**: Abra uma issue no GitHub

---

**Desenvolvido com ❤️ para facilitar a integração com o Bling**
