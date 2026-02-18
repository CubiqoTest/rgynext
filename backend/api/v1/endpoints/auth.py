"""
Authentication endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any
from models.user import (
    UserCreate,
    User,
    LoginRequest,
    Token,
    UserInDB,
)
from core.auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
    get_current_user,
)
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["authentication"])


async def get_db():
    """Dependency to get database"""
    from config.settings import settings
    from motor.motor_asyncio import AsyncIOMotorClient
    import os
    
    mongo_url = os.environ.get('MONGO_URL', settings.MONGO_URL)
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', settings.DB_NAME)]
    return db


@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Register a new user"""
    
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user_dict = user_data.model_dump()
    password = user_dict.pop("password")
    
    user_in_db = UserInDB(
        **user_dict,
        hashed_password=get_password_hash(password)
    )
    
    # Save to database
    user_doc = user_in_db.model_dump()
    user_doc['created_at'] = user_doc['created_at'].isoformat()
    user_doc['updated_at'] = user_doc['updated_at'].isoformat()
    
    await db.users.insert_one(user_doc)
    
    # Return user (without password)
    return User(**user_data.model_dump(), id=user_in_db.id, 
                created_at=user_in_db.created_at, updated_at=user_in_db.updated_at)


@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Login user and return tokens"""
    
    # Find user
    user_doc = await db.users.find_one({"email": login_data.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Verify password
    if not verify_password(login_data.password, user_doc["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Update last login
    await db.users.update_one(
        {"id": user_doc["id"]},
        {"$set": {"last_login": datetime.utcnow().isoformat()}}
    )
    
    # Create tokens
    token_data = {
        "sub": user_doc["id"],
        "email": user_doc["email"],
        "role": user_doc.get("role", "user")
    }
    
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    
    return Token(access_token=access_token, refresh_token=refresh_token)


@router.get("/me", response_model=User)
async def get_current_user_info(
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get current user information"""
    
    user_doc = await db.users.find_one({"id": current_user["user_id"]}, {"_id": 0, "hashed_password": 0})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Convert ISO strings to datetime
    for field in ['created_at', 'updated_at', 'last_login']:
        if field in user_doc and user_doc[field]:
            user_doc[field] = datetime.fromisoformat(user_doc[field])
    
    return User(**user_doc)


@router.post("/refresh", response_model=Token)
async def refresh_token(refresh_token: str):
    """Refresh access token"""
    from core.auth import decode_token
    
    # Verify refresh token
    payload = decode_token(refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type"
        )
    
    # Create new access token
    token_data = {
        "sub": payload["sub"],
        "email": payload.get("email"),
        "role": payload.get("role")
    }
    
    access_token = create_access_token(token_data)
    new_refresh_token = create_refresh_token(token_data)
    
    return Token(access_token=access_token, refresh_token=new_refresh_token)
