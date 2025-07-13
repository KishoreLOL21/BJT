from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BigInteger, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User_Info(Base):
    __tablename__ = "user_info"
    
    user_id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String, nullable=False, index=True)
    lastName = Column(String, nullable=False, index=True)
    email = Column(String, nullable=False, index=True)
    countryCode = Column(Integer, index=True)
    phoneNo = Column(BigInteger, index=True)
    userName = Column(String(50), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)

    logins = relationship("Login_Info", back_populates="user")


class Login_Info(Base):
    __tablename__ = "login_info"

    login_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user_info.user_id"), nullable=False)
    login_time = Column(DateTime, default=datetime.utcnow)

    user = relationship("User_Info", back_populates="logins")
