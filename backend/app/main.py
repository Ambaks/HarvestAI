from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import api_router  # Absolute import for the routers
from database import base
from database.session import engine

# Initialize the FastAPI app
app = FastAPI(
    title="Avocado Supply Chain API",
    description="API to manage the avocado supply chain, including harvests, farmers, exporters, and transactions.",
    version="1.0.0",
)

# Allow cross-origin requests from all origins (you can customize this if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Include the routers for various resources (Harvest, Farmers, Exporters, Transactions)
app.include_router(api_router)

base.Base.metadata.create_all(bind=engine)

# This would typically be used to start the app with `uvicorn` or directly if run in development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
