# backend/app/api/__init__.py

# This file marks the 'api' directory as a Python package.
# You can import routers or any other logic that will be included in the FastAPI app.

# Example: importing the router for crop-related endpoints
from .endpoints.harvest import router as harvest_router
from .endpoints.farmer import router as farmer_router
from .endpoints.exporter import router as exporter_router
from .endpoints.transaction import router as transaction_router

# You can include additional setup or initialization code if necessary.
