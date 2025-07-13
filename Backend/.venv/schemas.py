from pydantic import BaseModel, Field
from datetime import datetime

class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    phoneNo: int
    countryCode: int
    userName: str
    password: str

class LoginRequest(BaseModel):
    userName: str
    password: str
    LoginTime: datetime = Field(default_factory=datetime.utcnow)
    
class ForgotPasswordRequest(BaseModel):
    userName: str

class ResetPasswordRequest(BaseModel):
    userName: str
    newPassword: str

