"""
Role-Based Access Control (RBAC) utilities
"""
from typing import List
from fastapi import HTTPException, status, Depends
from core.auth import get_current_user


class Role:
    """User roles"""
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"
    FOUNDER = "founder"
    DEVELOPER = "developer"
    MARKETER = "marketer"


class Permission:
    """Permissions"""
    READ = "read"
    WRITE = "write"
    DELETE = "delete"
    ADMIN = "admin"


# Role permissions mapping
ROLE_PERMISSIONS = {
    Role.ADMIN: [Permission.READ, Permission.WRITE, Permission.DELETE, Permission.ADMIN],
    Role.FOUNDER: [Permission.READ, Permission.WRITE, Permission.DELETE],
    Role.DEVELOPER: [Permission.READ, Permission.WRITE],
    Role.MARKETER: [Permission.READ, Permission.WRITE],
    Role.USER: [Permission.READ, Permission.WRITE],
    Role.GUEST: [Permission.READ],
}


def require_role(required_roles: List[str]):
    """Decorator to require specific roles"""
    async def role_checker(current_user: dict = Depends(get_current_user)):
        user_role = current_user.get("role", Role.GUEST)
        if user_role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required roles: {', '.join(required_roles)}"
            )
        return current_user
    return role_checker


def has_permission(user_role: str, permission: str) -> bool:
    """Check if a role has a specific permission"""
    role_perms = ROLE_PERMISSIONS.get(user_role, [])
    return permission in role_perms
