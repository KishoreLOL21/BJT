from fastapi import FastAPI, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
import schemas as S
import models
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
import bcrypt
from models import Login_Info
import requests
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

@app.post("/sign-up")
def sign_up(request: S.User, db: Session = Depends(get_db)):
    existing_user = db.query(models.User_Info).filter(models.User_Info.userName == request.userName).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists. Please choose another one."
        )

    hashed_pw = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    user = models.User_Info(
        firstName=request.firstName,
        lastName=request.lastName,
        email=request.email,
        phoneNo=request.phoneNo,
        countryCode=request.countryCode,
        userName=request.userName,
        password=hashed_pw
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User Info Saved", "user_id": user.user_id}

@app.post("/login")
def login(request: S.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User_Info).filter(models.User_Info.userName == request.userName).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User does not exist. Please sign up first."
        )

    if not bcrypt.checkpw(request.password.encode("utf-8"), user.password.encode("utf-8")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password."
        )

    login_log = Login_Info(user_id=user.user_id)
    db.add(login_log)
    db.commit()

    return {
        "message": "Login successful",
        "user_id": user.user_id,
        "login_time": login_log.login_time
    }
    
@app.post("/forgot-password")
def forgot_password(request: S.ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User_Info).filter(models.User_Info.userName == request.userName).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return {"message": "User exists. Proceed to reset password."}


@app.post("/reset-password")
def reset_password(request: S.ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User_Info).filter(models.User_Info.userName == request.userName).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    hashed_pw = bcrypt.hashpw(request.newPassword.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    user.password = hashed_pw

    db.commit()
    return {"message": "Password updated successfully."}

@app.get("/api/videos")
def get_videos(query: str = Query(..., min_length=1), published_within: int = 180):
    published_after = (datetime.now() - timedelta(days=published_within)).isoformat("T") + "Z"

    search_url = (
        "https://www.googleapis.com/youtube/v3/search?"
        f"part=snippet&q={query}&type=video&maxResults=10"
        f"&publishedAfter={published_after}&key={YOUTUBE_API_KEY}"
    )

    search_response = requests.get(search_url)
    search_data = search_response.json()

    video_ids = [item['id']['videoId'] for item in search_data.get("items", [])]

    if not video_ids:
        return {"items": []}

    video_url = (
        "https://www.googleapis.com/youtube/v3/videos?"
        f"part=snippet,contentDetails,statistics"
        f"&id={','.join(video_ids)}"
        f"&key={YOUTUBE_API_KEY}"
    )

    video_response = requests.get(video_url)
    video_data = video_response.json()

    return {"items": video_data.get("items", [])}


