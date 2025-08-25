"""
Modelos Pydantic para validação de dados
"""

from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime


class ProductBase(BaseModel):
    """Modelo base para produtos"""
    nome: str = Field(..., description="Nome do produto")
    codigo: Optional[str] = Field(None, description="Código do produto")
    preco: float = Field(..., description="Preço do produto")
    tipo: str = Field(default="P", description="Tipo do produto (P=Produto, S=Serviço)")
    situacao: str = Field(default="A", description="Situação (A=Ativo, I=Inativo)")


class Product(ProductBase):
    """Modelo completo de produto"""
    id: Optional[int] = Field(None, description="ID do produto")
    descricao: Optional[str] = Field(None, description="Descrição do produto")
    observacoes: Optional[str] = Field(None, description="Observações")
    created_at: Optional[datetime] = Field(None, description="Data de criação")
    updated_at: Optional[datetime] = Field(None, description="Data de atualização")


class ProductCreate(ProductBase):
    """Modelo para criação de produto"""
    pass


class ProductUpdate(BaseModel):
    """Modelo para atualização de produto"""
    nome: Optional[str] = None
    codigo: Optional[str] = None
    preco: Optional[float] = None
    tipo: Optional[str] = None
    situacao: Optional[str] = None
    descricao: Optional[str] = None
    observacoes: Optional[str] = None


class OrderItem(BaseModel):
    """Item de um pedido"""
    produto_id: int = Field(..., description="ID do produto")
    codigo: Optional[str] = Field(None, description="Código do produto")
    descricao: str = Field(..., description="Descrição do item")
    quantidade: float = Field(..., description="Quantidade")
    valor_unitario: float = Field(..., description="Valor unitário")
    valor_total: float = Field(..., description="Valor total do item")


class OrderBase(BaseModel):
    """Modelo base para pedidos"""
    numero: Optional[str] = Field(None, description="Número do pedido")
    data: datetime = Field(..., description="Data do pedido")
    cliente_id: int = Field(..., description="ID do cliente")
    situacao: str = Field(default="A", description="Situação do pedido")
    itens: List[OrderItem] = Field(..., description="Itens do pedido")


class Order(OrderBase):
    """Modelo completo de pedido"""
    id: Optional[int] = Field(None, description="ID do pedido")
    valor_total: Optional[float] = Field(None, description="Valor total do pedido")
    created_at: Optional[datetime] = Field(None, description="Data de criação")
    updated_at: Optional[datetime] = Field(None, description="Data de atualização")


class ApiResponse(BaseModel):
    """Modelo de resposta padrão da API"""
    success: bool = Field(..., description="Status da operação")
    message: str = Field(..., description="Mensagem de retorno")
    data: Optional[dict] = Field(None, description="Dados da resposta")


class ErrorResponse(BaseModel):
    """Modelo de resposta de erro"""
    error: str = Field(..., description="Tipo do erro")
    message: str = Field(..., description="Mensagem de erro")
    details: Optional[dict] = Field(None, description="Detalhes do erro")
