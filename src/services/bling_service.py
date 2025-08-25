"""
Serviço de integração com a API do Bling
"""

import os
import requests
from typing import Dict, Any, Optional
from requests.exceptions import RequestException


class BlingService:
    """Classe para integração com a API do Bling"""
    
    def __init__(self):
        self.api_token = os.getenv("BLING_API_TOKEN")
        self.api_url = os.getenv("BLING_API_URL", "https://www.bling.com.br/Api/v3")
        self.headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }
    
    def _make_request(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Faz uma requisição para a API do Bling"""
        if not self.api_token:
            raise ValueError("Token da API do Bling não configurado")
        
        url = f"{self.api_url}/{endpoint.lstrip('/')}"
        
        try:
            response = requests.request(
                method=method,
                url=url,
                headers=self.headers,
                json=data,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        
        except RequestException as e:
            raise Exception(f"Erro na requisição para o Bling: {str(e)}")
    
    def get_products(self, page: int = 1, limit: int = 100) -> Dict[str, Any]:
        """Busca produtos do Bling"""
        params = f"pagina={page}&limite={limit}"
        return self._make_request("GET", f"produtos?{params}")
    
    def get_product(self, product_id: str) -> Dict[str, Any]:
        """Busca um produto específico"""
        return self._make_request("GET", f"produtos/{product_id}")
    
    def create_product(self, product_data: Dict[str, Any]) -> Dict[str, Any]:
        """Cria um novo produto"""
        return self._make_request("POST", "produtos", product_data)
    
    def update_product(self, product_id: str, product_data: Dict[str, Any]) -> Dict[str, Any]:
        """Atualiza um produto"""
        return self._make_request("PUT", f"produtos/{product_id}", product_data)
    
    def get_orders(self, page: int = 1, limit: int = 100) -> Dict[str, Any]:
        """Busca pedidos do Bling"""
        params = f"pagina={page}&limite={limit}"
        return self._make_request("GET", f"pedidos?{params}")
    
    def get_order(self, order_id: str) -> Dict[str, Any]:
        """Busca um pedido específico"""
        return self._make_request("GET", f"pedidos/{order_id}")
    
    def test_connection(self) -> Dict[str, Any]:
        """Testa a conexão com a API do Bling"""
        try:
            # Faz uma requisição simples para testar
            response = self._make_request("GET", "produtos?limite=1")
            return {
                "success": True,
                "message": "Conexão com Bling estabelecida com sucesso",
                "data": response
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Erro na conexão com Bling: {str(e)}"
            }
