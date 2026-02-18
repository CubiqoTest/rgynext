"""
Business tool models for startup features
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid
from enum import Enum


class BusinessStage(str, Enum):
    """Business development stages"""
    IDEA = "idea"
    VALIDATION = "validation"
    MVP = "mvp"
    GROWTH = "growth"
    SCALE = "scale"


class IndustryType(str, Enum):
    """Industry types"""
    TECHNOLOGY = "technology"
    HEALTHCARE = "healthcare"
    FINANCE = "finance"
    EDUCATION = "education"
    ECOMMERCE = "ecommerce"
    SAAS = "saas"
    MARKETPLACE = "marketplace"
    OTHER = "other"


class BusinessProfile(BaseModel):
    """Business profile model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    business_name: str
    industry: IndustryType
    stage: BusinessStage
    description: Optional[str] = None
    target_market: Optional[str] = None
    founded_date: Optional[datetime] = None
    team_size: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class BusinessPlanRequest(BaseModel):
    """Business plan generation request"""
    business_name: str
    industry: IndustryType
    description: str
    target_market: str
    business_model: str
    competitive_advantage: str
    additional_context: Optional[str] = None


class BusinessPlan(BaseModel):
    """Generated business plan"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    business_profile_id: Optional[str] = None
    executive_summary: str
    market_analysis: str
    competitive_analysis: str
    marketing_strategy: str
    operations_plan: str
    financial_projections: str
    risk_analysis: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class PitchDeckRequest(BaseModel):
    """Pitch deck generation request"""
    business_name: str
    problem: str
    solution: str
    market_size: str
    business_model: str
    traction: Optional[str] = None
    team: Optional[str] = None
    funding_ask: Optional[str] = None


class PitchDeck(BaseModel):
    """Generated pitch deck"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    slides: List[Dict[str, Any]]  # Each slide with title, content, type
    created_at: datetime = Field(default_factory=datetime.utcnow)


class SWOTAnalysisRequest(BaseModel):
    """SWOT analysis request"""
    business_profile_id: str
    additional_context: Optional[str] = None


class SWOTAnalysis(BaseModel):
    """SWOT analysis result"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    business_profile_id: str
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]
    recommendations: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)


class CompetitorAnalysisRequest(BaseModel):
    """Competitor analysis request"""
    business_profile_id: str
    competitors: Optional[List[str]] = None


class CompetitorInfo(BaseModel):
    """Competitor information"""
    name: str
    description: str
    strengths: List[str]
    weaknesses: List[str]
    market_position: str


class CompetitorAnalysis(BaseModel):
    """Competitor analysis result"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    business_profile_id: str
    competitors: List[CompetitorInfo]
    market_gaps: List[str]
    recommendations: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)


class FundingStrategy(BaseModel):
    """Funding strategy recommendation"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    business_profile_id: str
    recommended_approach: str
    funding_stages: List[Dict[str, Any]]
    estimated_timeline: str
    key_milestones: List[str]
    investor_targeting: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
