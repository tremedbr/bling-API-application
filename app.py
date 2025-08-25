"""
Bling API Application
Uma aplicação FastAPI para integração com a API do Bling ERP
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import uvicorn
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

# Configurações
PORT = int(os.getenv("PORT", 3000))
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
BLING_API_TOKEN = os.getenv("BLING_API_TOKEN")
BLING_API_URL = os.getenv("BLING_API_URL", "https://www.bling.com.br/Api/v3")

# Inicializa a aplicação FastAPI
app = FastAPI(
    title="Bling API Application",
    description="Aplicação para integração com a API do Bling ERP",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

@app.get("/")
async def root():
    """Endpoint raiz - Health check"""
    return {
        "message": "Bling API Application",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "bling-api-application"
    }

@app.get("/api/config")
async def get_config():
    """Retorna configurações básicas (sem dados sensíveis)"""
    return {
        "bling_api_url": BLING_API_URL,
        "port": PORT,
        "debug": DEBUG,
        "token_configured": bool(BLING_API_TOKEN)
    }

@app.get("/api/bling/test")
async def test_bling_connection():
    """Testa a conexão com a API do Bling"""
    if not BLING_API_TOKEN:
        raise HTTPException(
            status_code=400, 
            detail="Token da API do Bling não configurado"
        )
    
    # Aqui você pode implementar um teste real de conexão
    # Por enquanto, retorna apenas o status
    return {
        "message": "Conexão com Bling configurada",
        "api_url": BLING_API_URL,
        "status": "ready"
    }

# Middleware para CORS (se necessário)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure conforme necessário
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    print(f"🚀 Iniciando Bling API Application na porta {PORT}")
    print(f"📖 Documentação disponível em: http://localhost:{PORT}/docs")
    
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=PORT,
        reload=DEBUG
    )
