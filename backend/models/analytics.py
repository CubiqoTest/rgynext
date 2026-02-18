"""
Analytics and monitoring models
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid


class UserSession(BaseModel):
    """User session tracking"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    session_start: datetime = Field(default_factory=datetime.utcnow)
    session_end: Optional[datetime] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    actions: List[Dict[str, Any]] = []


class SecurityAlert(BaseModel):
    """Security alert model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    alert_type: str  # failed_login, suspicious_activity, breach_attempt
    severity: str  # low, medium, high, critical
    user_id: Optional[str] = None
    ip_address: Optional[str] = None
    description: str
    metadata: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    resolved: bool = False
    resolved_at: Optional[datetime] = None


class AnalyticsMetric(BaseModel):
    """Analytics metric model"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    metric_type: str  # user_engagement, revenue, conversion, churn
    metric_name: str
    value: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: Dict[str, Any] = {}


class BusinessMetrics(BaseModel):
    """Business metrics dashboard data"""
    total_users: int
    active_users: int
    monthly_recurring_revenue: float
    annual_recurring_revenue: float
    churn_rate: float
    customer_lifetime_value: float
    customer_acquisition_cost: float
    conversion_rate: float
    period_start: datetime
    period_end: datetime


class UserActivityLog(BaseModel):
    """User activity logging"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    action: str
    resource: Optional[str] = None
    details: Dict[str, Any] = {}
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None


class AdminDashboardData(BaseModel):
    """Admin dashboard aggregated data"""
    total_users: int
    active_sessions: int
    security_alerts: int
    failed_logins_24h: int
    api_requests_24h: int
    avg_response_time_ms: float
    system_health: str  # healthy, degraded, critical
    last_updated: datetime = Field(default_factory=datetime.utcnow)
