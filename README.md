# Bling API Application

Uma aplicação Python para integração com a API do Bling ERP, desenvolvida para automatizar e facilitar operações comerciais.

## 📋 Sobre o Projeto

Este projeto oferece uma interface simplificada para interagir com a API do Bling, permitindo:
- Gerenciamento de produtos
- Controle de pedidos
- Sincronização de estoque
- Relatórios financeiros
- Integração com outros sistemas

## 🚀 Tecnologias Utilizadas

- **Python 3.11+**
- **FastAPI** - Framework web moderno e rápido
- **Requests** - Para comunicação com a API do Bling
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI

## 📦 Instalação

### Pré-requisitos
- Python 3.11 ou superior
- Conta no Bling ERP
- Token de API do Bling

### Configuração Local

1. Clone o repositório:
```bash
git clone https://github.com/tremedbr/bling-API-application.git
cd bling-API-application
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

4. Execute a aplicação:
```bash
python app.py
```

A aplicação estará disponível em `http://localhost:3000`

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
BLING_API_TOKEN=seu_token_aqui
BLING_API_URL=https://www.bling.com.br/Api/v3
PORT=3000
DEBUG=false
```

### Obtenção do Token da API Bling

1. Acesse sua conta no Bling ERP
2. Vá em Configurações > Usuários > API
3. Gere um novo token de acesso
4. Configure as permissões necessárias

## 📚 Documentação da API

Após iniciar a aplicação, acesse:
- Documentação Swagger: `http://localhost:3000/docs`
- Documentação ReDoc: `http://localhost:3000/redoc`

## 🚀 Deploy

### Coolify + Nixpacks

Este projeto está configurado para deploy automático no Coolify utilizando Nixpacks:

1. **Configuração no Coolify:**
   - Conecte seu repositório Git
   - Configure a porta: `3000`
   - Nixpacks detectará automaticamente as dependências Python

2. **Variáveis de Ambiente no Deploy:**
   - Configure as mesmas variáveis do arquivo `.env`
   - Certifique-se de definir `PORT=3000`

3. **Build Automático:**
   - Nixpacks utilizará o `requirements.txt`
   - O arquivo `nixpacks.toml` define configurações específicas
   - A aplicação será automaticamente servida na porta 3000

## 📁 Estrutura do Projeto

```
bling-API-application/
├── app.py              # Arquivo principal da aplicação
├── requirements.txt    # Dependências Python
├── nixpacks.toml      # Configuração Nixpacks
├── .env.example       # Exemplo de variáveis de ambiente
├── .gitignore         # Arquivos ignorados pelo Git
├── src/               # Código fonte
│   ├── __init__.py
│   ├── api/           # Endpoints da API
│   ├── models/        # Modelos de dados
│   ├── services/      # Serviços de integração
│   └── utils/         # Utilitários
└── tests/             # Testes
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte, entre em contato através:
- Email: suporte@tremed.com.br
- Issues do GitHub: [Criar Issue](https://github.com/tremedbr/bling-API-application/issues)

## 📈 Roadmap

- [ ] Interface web para gerenciamento
- [ ] Webhooks do Bling
- [ ] Relatórios avançados
- [ ] Integração com sistemas de terceiros
- [ ] Cache e otimizações de performance
