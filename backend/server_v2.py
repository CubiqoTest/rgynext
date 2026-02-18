"""
Enhanced FastAPI server with modular architecture
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from dotenv import load_dotenv
from contextlib import asynccontextmanager

# Import configuration
from config.settings import settings

# Import middleware
from middleware.security import (
    SecurityHeadersMiddleware,
    RateLimitMiddleware,
    AntiPhishingMiddleware,
)

# Import API routers
from api.v1.endpoints import auth, business, admin

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database client
db_client = None
db = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    global db_client, db
    
    # Startup
    logger.info("Starting up application...")
    mongo_url = os.environ.get('MONGO_URL', settings.MONGO_URL)
    db_name = os.environ.get('DB_NAME', settings.DB_NAME)
    
    db_client = AsyncIOMotorClient(mongo_url)
    db = db_client[db_name]
    logger.info(f"Connected to MongoDB: {db_name}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down application...")
    if db_client:
        db_client.close()
        logger.info("MongoDB connection closed")


# Create FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

# Add security middleware
if settings.ENABLE_SECURITY_HEADERS:
    app.add_middleware(SecurityHeadersMiddleware)

if settings.ENABLE_RATE_LIMITING:
    app.add_middleware(
        RateLimitMiddleware,
        requests_per_minute=settings.RATE_LIMIT_PER_MINUTE
    )

app.add_middleware(AntiPhishingMiddleware)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=settings.CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)
app.include_router(business.router, prefix=settings.API_V1_PREFIX)
app.include_router(admin.router, prefix=settings.API_V1_PREFIX)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to CUBIQO - Startup Growth Platform",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": settings.VERSION
    }


@app.get("/api/health")
async def api_health_check():
    """API health check endpoint"""
    try:
        # Check database connection
        await db.command('ping')
        db_status = "connected"
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        db_status = "disconnected"
    
    return {
        "status": "healthy" if db_status == "connected" else "degraded",
        "database": db_status,
        "version": settings.VERSION
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server_v2:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
