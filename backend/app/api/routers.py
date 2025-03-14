from fastapi import APIRouter
from .endpoints.farmer import router as farmer_router
from .endpoints.transaction import router as transaction_router
from .endpoints.exporter import router as exporter_router
from .endpoints.harvest import router as harvest_router
from .endpoints.auth import router as auth_router
from .endpoints.user import router as user_router
from .endpoints.earnings import router as earnings_router
from .endpoints.orders import router as order_router
from .endpoints.exportercrops import router as exportercrops_router



api_router = APIRouter()
api_router.include_router(farmer_router, prefix="/farmers", tags=["Farmers"])
api_router.include_router(transaction_router, prefix="/transactions", tags=["Transactions"])
api_router.include_router(earnings_router, prefix="/earnings", tags=["Earnings"])
api_router.include_router(exporter_router, prefix="/exporters", tags=["Exporters"])
api_router.include_router(harvest_router, prefix="/harvests", tags=["Harvests"])
api_router.include_router(order_router, tags=["Orders"])
api_router.include_router(auth_router, tags=["auth"])
api_router.include_router(user_router, tags=["users"])
api_router.include_router(exportercrops_router, tags=["exporter_crops"])



