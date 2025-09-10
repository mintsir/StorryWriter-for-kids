from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class UserProgress(BaseModel):
    lesson_completed: bool = False
    current_streak: int = 0
    stories_count: int = 0
    total_words: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserProgressUpdate(BaseModel):
    lesson_completed: Optional[bool] = None
    current_streak: Optional[int] = None
    stories_count: Optional[int] = None
    total_words: Optional[int] = None

class Story(BaseModel):
    title: str
    category: str
    introduction: str
    middle: str
    conclusion: str
    word_count: int
    date_completed: str
    student_name: Optional[str] = None
    teacher_feedback: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class StoryCreate(BaseModel):
    title: str
    category: str
    introduction: str
    middle: str
    conclusion: str
    word_count: int
    date_completed: str
    student_name: Optional[str] = None

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
