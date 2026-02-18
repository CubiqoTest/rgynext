"""
Admin dashboard endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
from models.analytics import (
    AdminDashboardData,
    SecurityAlert,
    UserSession,
    BusinessMetrics,
    UserActivityLog,
)
from core.auth import get_current_user
from core.security.rbac import require_role, Role
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter(prefix="/admin", tags=["admin"])


async def get_db():
    """Dependency to get database"""
    from config.settings import settings
    from motor.motor_asyncio import AsyncIOMotorClient
    import os
    
    mongo_url = os.environ.get('MONGO_URL', settings.MONGO_URL)
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', settings.DB_NAME)]
    return db


@router.get("/dashboard", response_model=AdminDashboardData)
async def get_admin_dashboard(
    current_user: Dict[str, Any] = Depends(require_role([Role.ADMIN])),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get admin dashboard overview data"""
    
    # Get total users
    total_users = await db.users.count_documents({})
    
    # Get active sessions (last 24 hours)
    yesterday = datetime.utcnow() - timedelta(days=1)
    active_sessions = await db.user_sessions.count_documents({
        "session_start": {"$gte": yesterday.isoformat()}
    })
    
    # Get security alerts (unresolved)
    security_alerts = await db.security_alerts.count_documents({
        "resolved": False
    })
    
    # Get failed logins (last 24 hours)
    failed_logins = await db.security_alerts.count_documents({
        "alert_type": "failed_login",
        "created_at": {"$gte": yesterday.isoformat()}
    })
    
    # Get API requests (last 24 hours)
    api_requests = await db.activity_logs.count_documents({
        "timestamp": {"$gte": yesterday.isoformat()}
    })
    
    dashboard_data = AdminDashboardData(
        total_users=total_users,
        active_sessions=active_sessions,
        security_alerts=security_alerts,
        failed_logins_24h=failed_logins,
        api_requests_24h=api_requests,
        avg_response_time_ms=125.5,  # Would calculate from metrics
        system_health="healthy"
    )
    
    return dashboard_data


@router.get("/security-alerts", response_model=List[SecurityAlert])
async def get_security_alerts(
    resolved: bool = False,
    limit: int = 100,
    current_user: Dict[str, Any] = Depends(require_role([Role.ADMIN])),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get security alerts"""
    
    alerts = await db.security_alerts.find(
        {"resolved": resolved}, {"_id": 0}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    
    for alert in alerts:
        alert['created_at'] = datetime.fromisoformat(alert['created_at'])
        if alert.get('resolved_at'):
            alert['resolved_at'] = datetime.fromisoformat(alert['resolved_at'])
    
    return alerts


@router.put("/security-alerts/{alert_id}/resolve")
async def resolve_security_alert(
    alert_id: str,
    current_user: Dict[str, Any] = Depends(require_role([Role.ADMIN])),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Resolve a security alert"""
    
    result = await db.security_alerts.update_one(
        {"id": alert_id},
        {
            "$set": {
                "resolved": True,
                "resolved_at": datetime.utcnow().isoformat()
            }
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    return {"message": "Alert resolved"}


@router.get("/users", response_model=List[Dict[str, Any]])
async def get_all_users(
    limit: int = 100,
    skip: int = 0,
    current_user: Dict[str, Any] = Depends(require_role([Role.ADMIN])),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get all users (admin only)"""
    
    users = await db.users.find(
        {}, {"_id": 0, "hashed_password": 0}
    ).skip(skip).limit(limit).to_list(limit)
    
    for user in users:
        for field in ['created_at', 'updated_at', 'last_login']:
            if field in user and user[field]:
                user[field] = datetime.fromisoformat(user[field])
    
    return users


@router.get("/sessions", response_model=List[UserSession])
async def get_active_sessions(
    limit: int = 100,
    current_user: Dict[str, Any] = Depends(require_role([Role.ADMIN])),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get active user sessions"""
    
    sessions = await db.user_sessions.find(
        {"session_end": None}, {"_id": 0}
    ).sort("session_start", -1).limit(limit).to_list(limit)
    
    for session in sessions:
        session['session_start'] = datetime.fromisoformat(session['session_start'])
        if session.get('session_end'):
            session['session_end'] = datetime.fromisoformat(session['session_end'])
    
    return sessions


@router.get("/activity-logs", response_model=List[UserActivityLog])
async def get_activity_logs(
    user_id: Optional[str] = None,
    limit: int = 100,
    current_user: Dict[str, Any] = Depends(require_role([Role.ADMIN])),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get user activity logs"""
    
    query = {}
    if user_id:
        query["user_id"] = user_id
    
    logs = await db.activity_logs.find(
        query, {"_id": 0}
    ).sort("timestamp", -1).limit(limit).to_list(limit)
    
    for log in logs:
        log['timestamp'] = datetime.fromisoformat(log['timestamp'])
    
    return logs


@router.get("/business-metrics", response_model=BusinessMetrics)
async def get_business_metrics(
    days: int = 30,
    current_user: Dict[str, Any] = Depends(require_role([Role.ADMIN, Role.FOUNDER])),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get business metrics for the specified period"""
    
    period_end = datetime.utcnow()
    period_start = period_end - timedelta(days=days)
    
    # Calculate metrics (simplified for demo)
    total_users = await db.users.count_documents({})
    
    active_users = await db.user_sessions.count_documents({
        "session_start": {"$gte": period_start.isoformat()}
    })
    
    metrics = BusinessMetrics(
        total_users=total_users,
        active_users=active_users,
        monthly_recurring_revenue=50000.0,  # Would calculate from payments
        annual_recurring_revenue=600000.0,
        churn_rate=0.05,  # 5%
        customer_lifetime_value=12000.0,
        customer_acquisition_cost=500.0,
        conversion_rate=0.15,  # 15%
        period_start=period_start,
        period_end=period_end
    )
    
    return metrics
