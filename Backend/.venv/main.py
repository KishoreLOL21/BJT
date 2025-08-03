import secrets
import string
from fastapi import FastAPI, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
import schemas as S
import models
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer   
import bcrypt
from models import Login_Info
import requests
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import httpx
from fastapi import UploadFile, File
import PyPDF2
from docx import Document
import re
import io

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
        "login_time": login_log.login_time,
        "userName": user.userName,
        "firstName": user.firstName,
        "lastName": user.lastName
    }
    
@app.get("/user-info/{user_id}")
def get_user_info(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.Login_Info).filter(models.Login_Info.user_id == user_id).first()
    user_name = db.query(models.User_Info).filter(models.User_Info.user_id == user)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "user_id": user_name.user_id,
        "userName": user_name.userName,
        "firstName": user_name.firstName,
        "lastName": user_name.lastName,
        "email": user_name.email
    }
    
reset_tokens = {}

@app.post("/forgot-password")
async def forgot_password(request: S.ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User_Info).filter(models.User_Info.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found.")

    token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(32))
    expires_at = datetime.utcnow() + timedelta(hours=1)
    reset_tokens[token] = {"user_id": user.user_id, "expires_at": expires_at}

    reset_link = f"http://localhost:3000/reset-password?token={token}"
    print(f"\n=== RESET LINK ===\n{reset_link}\nLink expires at {expires_at}.\n")

    return {"message": "Password reset link has been sent to your email."}

@app.post("/reset-password")
async def reset_password(request: S.ResetPasswordRequest, db: Session = Depends(get_db)):
    token_data = reset_tokens.get(request.token)

    if not token_data or token_data["expires_at"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user_id = token_data["user_id"]

    login_record = db.query(models.Login_Info).filter(models.Login_Info.user_id == user_id).first()
    if not login_record:
        raise HTTPException(status_code=404, detail="Login record not found")

    hashed_pw = bcrypt.hashpw(request.newPassword.encode(), bcrypt.gensalt()).decode()
    login_record.password = hashed_pw
    db.commit()

    del reset_tokens[request.token]

    return {"message": "Password updated successfully"}

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

@app.get("/search")
async def search_videos(q: str = Query(...)):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://www.googleapis.com/youtube/v3/search",
            params={
                "part": "snippet",
                "q": q,
                "type": "video",
                "key": YOUTUBE_API_KEY,
                "maxResults": 10
            }
        )
    return response.json()

def extract_modules_and_topics(text: str) -> str:
    module_pattern = r"(Module\s*[-:]?\s*\d+)"
    topic_pattern = r"(?:Topic\s*[-:]?\s*\d+|\•|\-|\d+\.)\s*(.*)"

    modules = re.split(module_pattern, text, flags=re.IGNORECASE)
    output = ""
    
    for i in range(1, len(modules), 2):  
        module_title = modules[i].strip()
        module_content = modules[i + 1].strip()

        output += f"\n{module_title}:\n"
        topics = re.findall(topic_pattern, module_content, flags=re.IGNORECASE)
        for idx, topic in enumerate(topics, start=1):
            if topic.strip():
                output += f"  Topic - {idx}: {topic.strip()}\n"
    return output

@app.post("/upload-syllabus")
async def upload_syllabus(file: UploadFile = File(...)):
    contents = await file.read()

    text = ""
    if file.filename.endswith(".pdf"):
        reader = PyPDF2.PdfReader(io.BytesIO(contents))
        text = "\n".join([page.extract_text() or "" for page in reader.pages])
    elif file.filename.endswith(".docx"):
        doc = Document(io.BytesIO(contents))
        text = "\n".join([para.text for para in doc.paragraphs])
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    module_structure = extract_modules_and_topics(text)

    return {"module_structure": module_structure}