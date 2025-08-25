"""
Endpoints relacionados a produtos
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List
from src.services.bling_service import BlingService
from src.models.schemas import Product, ProductCreate, ProductUpdate, ApiResponse

router = APIRouter(prefix="/products", tags=["products"])

def get_bling_service():
    """Dependency para obter o serviço do Bling"""
    return BlingService()

@router.get("/", response_model=List[Product])
async def list_products(
    page: int = 1,
    limit: int = 100,
    bling_service: BlingService = Depends(get_bling_service)
):
    """Lista produtos do Bling"""
    try:
        response = bling_service.get_products(page=page, limit=limit)
        return response.get("data", [])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{product_id}", response_model=Product)
async def get_product(
    product_id: str,
    bling_service: BlingService = Depends(get_bling_service)
):
    """Busca um produto específico"""
    try:
        response = bling_service.get_product(product_id)
        if not response.get("data"):
            raise HTTPException(status_code=404, detail="Produto não encontrado")
        return response["data"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=ApiResponse)
async def create_product(
    product: ProductCreate,
    bling_service: BlingService = Depends(get_bling_service)
):
    """Cria um novo produto"""
    try:
        response = bling_service.create_product(product.dict())
        return ApiResponse(
            success=True,
            message="Produto criado com sucesso",
            data=response
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{product_id}", response_model=ApiResponse)
async def update_product(
    product_id: str,
    product: ProductUpdate,
    bling_service: BlingService = Depends(get_bling_service)
):
    """Atualiza um produto"""
    try:
        # Remove campos None do update
        update_data = {k: v for k, v in product.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(status_code=400, detail="Nenhum campo para atualizar")
        
        response = bling_service.update_product(product_id, update_data)
        return ApiResponse(
            success=True,
            message="Produto atualizado com sucesso",
            data=response
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
