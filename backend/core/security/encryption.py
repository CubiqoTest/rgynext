"""
Encryption utilities for data protection
"""
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2
from cryptography.hazmat.backends import default_backend
import base64
import os


class EncryptionService:
    """Service for encrypting and decrypting data"""
    
    def __init__(self, secret_key: str = None):
        if secret_key is None:
            secret_key = os.getenv('ENCRYPTION_KEY', Fernet.generate_key().decode())
        
        # Derive a key from the secret
        kdf = PBKDF2(
            algorithm=hashes.SHA256(),
            length=32,
            salt=b'cubiqo_salt_2024',  # In production, use a random salt per user
            iterations=100000,
            backend=default_backend()
        )
        key = base64.urlsafe_b64encode(kdf.derive(secret_key.encode()))
        self.fernet = Fernet(key)
    
    def encrypt(self, data: str) -> str:
        """Encrypt string data"""
        return self.fernet.encrypt(data.encode()).decode()
    
    def decrypt(self, encrypted_data: str) -> str:
        """Decrypt encrypted string data"""
        return self.fernet.decrypt(encrypted_data.encode()).decode()
    
    def encrypt_dict(self, data: dict) -> dict:
        """Encrypt dictionary values"""
        import json
        json_str = json.dumps(data)
        return {"encrypted": self.encrypt(json_str)}
    
    def decrypt_dict(self, encrypted_data: dict) -> dict:
        """Decrypt dictionary"""
        import json
        decrypted_str = self.decrypt(encrypted_data["encrypted"])
        return json.loads(decrypted_str)


# Singleton instance
_encryption_service = None


def get_encryption_service() -> EncryptionService:
    """Get or create encryption service instance"""
    global _encryption_service
    if _encryption_service is None:
        _encryption_service = EncryptionService()
    return _encryption_service
