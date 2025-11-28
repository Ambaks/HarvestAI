from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import api_router  # Absolute import for the routers
from database import base
from database.session import engine
from config import settings

# Initialize the FastAPI app
app = FastAPI(
    title="HarvestAI Supply Chain API",
    description="API to manage the agricultural supply chain, including harvests, farmers, exporters, and transactions.",
    version="1.0.0",
)

# Parse allowed origins from config
allowed_origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",")]

# Allow cross-origin requests from configured origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers for various resources (Harvest, Farmers, Exporters, Transactions)
app.include_router(api_router)

base.Base.metadata.create_all(bind=engine)

# This would typically be used to start the app with `uvicorn` or directly if run in development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
