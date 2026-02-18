"""
Business tools endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, List
from models.business import (
    BusinessProfile,
    BusinessPlanRequest,
    BusinessPlan,
    PitchDeckRequest,
    PitchDeck,
    SWOTAnalysisRequest,
    SWOTAnalysis,
    CompetitorAnalysisRequest,
    CompetitorAnalysis,
    FundingStrategy,
)
from core.auth import get_current_user
from services.ai.business_assistant import get_ai_assistant
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter(prefix="/business", tags=["business_tools"])


async def get_db():
    """Dependency to get database"""
    from config.settings import settings
    from motor.motor_asyncio import AsyncIOMotorClient
    import os
    
    mongo_url = os.environ.get('MONGO_URL', settings.MONGO_URL)
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', settings.DB_NAME)]
    return db


@router.post("/profiles", response_model=BusinessProfile, status_code=status.HTTP_201_CREATED)
async def create_business_profile(
    profile_data: BusinessProfile,
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Create a business profile"""
    profile_data.user_id = current_user["user_id"]
    
    profile_doc = profile_data.model_dump()
    profile_doc['created_at'] = profile_doc['created_at'].isoformat()
    profile_doc['updated_at'] = profile_doc['updated_at'].isoformat()
    if profile_doc.get('founded_date'):
        profile_doc['founded_date'] = profile_doc['founded_date'].isoformat()
    
    await db.business_profiles.insert_one(profile_doc)
    return profile_data


@router.get("/profiles", response_model=List[BusinessProfile])
async def get_business_profiles(
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get user's business profiles"""
    profiles = await db.business_profiles.find(
        {"user_id": current_user["user_id"]}, {"_id": 0}
    ).to_list(100)
    
    from datetime import datetime
    for profile in profiles:
        profile['created_at'] = datetime.fromisoformat(profile['created_at'])
        profile['updated_at'] = datetime.fromisoformat(profile['updated_at'])
        if profile.get('founded_date'):
            profile['founded_date'] = datetime.fromisoformat(profile['founded_date'])
    
    return profiles


@router.post("/business-plan", response_model=BusinessPlan)
async def generate_business_plan(
    request: BusinessPlanRequest,
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Generate AI-powered business plan"""
    ai_assistant = get_ai_assistant()
    
    business_plan = await ai_assistant.generate_business_plan(
        request, current_user["user_id"]
    )
    
    # Save to database
    plan_doc = business_plan.model_dump()
    plan_doc['created_at'] = plan_doc['created_at'].isoformat()
    await db.business_plans.insert_one(plan_doc)
    
    return business_plan


@router.post("/pitch-deck", response_model=PitchDeck)
async def generate_pitch_deck(
    request: PitchDeckRequest,
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Generate AI-powered pitch deck"""
    ai_assistant = get_ai_assistant()
    
    pitch_deck = await ai_assistant.generate_pitch_deck(
        request, current_user["user_id"]
    )
    
    # Save to database
    deck_doc = pitch_deck.model_dump()
    deck_doc['created_at'] = deck_doc['created_at'].isoformat()
    await db.pitch_decks.insert_one(deck_doc)
    
    return pitch_deck


@router.post("/swot-analysis", response_model=SWOTAnalysis)
async def perform_swot_analysis(
    request: SWOTAnalysisRequest,
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Perform AI-powered SWOT analysis"""
    
    # Get business profile
    business_profile = await db.business_profiles.find_one(
        {"id": request.business_profile_id, "user_id": current_user["user_id"]}
    )
    if not business_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business profile not found"
        )
    
    ai_assistant = get_ai_assistant()
    swot = await ai_assistant.perform_swot_analysis(request, business_profile)
    
    # Save to database
    swot_doc = swot.model_dump()
    swot_doc['created_at'] = swot_doc['created_at'].isoformat()
    await db.swot_analyses.insert_one(swot_doc)
    
    return swot


@router.post("/competitor-analysis", response_model=CompetitorAnalysis)
async def analyze_competitors(
    request: CompetitorAnalysisRequest,
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Perform AI-powered competitor analysis"""
    
    # Get business profile
    business_profile = await db.business_profiles.find_one(
        {"id": request.business_profile_id, "user_id": current_user["user_id"]}
    )
    if not business_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business profile not found"
        )
    
    ai_assistant = get_ai_assistant()
    analysis = await ai_assistant.analyze_competitors(request, business_profile)
    
    # Save to database
    analysis_doc = analysis.model_dump()
    analysis_doc['created_at'] = analysis_doc['created_at'].isoformat()
    await db.competitor_analyses.insert_one(analysis_doc)
    
    return analysis


@router.post("/funding-strategy", response_model=FundingStrategy)
async def generate_funding_strategy(
    business_profile_id: str,
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Generate funding strategy recommendation"""
    
    # Get business profile
    business_profile = await db.business_profiles.find_one(
        {"id": business_profile_id, "user_id": current_user["user_id"]}
    )
    if not business_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business profile not found"
        )
    
    ai_assistant = get_ai_assistant()
    strategy = await ai_assistant.generate_funding_strategy(
        business_profile_id, business_profile
    )
    
    # Save to database
    strategy_doc = strategy.model_dump()
    strategy_doc['created_at'] = strategy_doc['created_at'].isoformat()
    await db.funding_strategies.insert_one(strategy_doc)
    
    return strategy
