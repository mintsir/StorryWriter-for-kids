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

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Story Master API - Ready to help kids learn storytelling!"}

# User Progress Routes
@api_router.get("/progress")
async def get_progress():
    """Get user progress data"""
    try:
        progress = await db.user_progress.find_one()
        if not progress:
            # Create default progress if none exists
            default_progress = UserProgress()
            await db.user_progress.insert_one(default_progress.dict())
            return default_progress.dict()
        
        return serialize_doc(progress)
    except Exception as e:
        logging.error(f"Error getting progress: {e}")
        raise HTTPException(status_code=500, detail="Failed to get progress")

@api_router.put("/progress")
async def update_progress(progress_update: UserProgressUpdate):
    """Update user progress"""
    try:
        update_data = {k: v for k, v in progress_update.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.user_progress.update_one(
            {},
            {"$set": update_data},
            upsert=True
        )
        
        # Get updated progress
        updated_progress = await db.user_progress.find_one()
        return serialize_doc(updated_progress)
    except Exception as e:
        logging.error(f"Error updating progress: {e}")
        raise HTTPException(status_code=500, detail="Failed to update progress")

# Story Routes
@api_router.get("/stories")
async def get_stories():
    """Get all user stories"""
    try:
        stories = await db.stories.find().sort("created_at", -1).to_list(1000)
        return [serialize_doc(story) for story in stories]
    except Exception as e:
        logging.error(f"Error getting stories: {e}")
        raise HTTPException(status_code=500, detail="Failed to get stories")

@api_router.post("/stories")
async def create_story(story: StoryCreate):
    """Create a new story"""
    try:
        # Validate story has all required parts
        if not story.title.strip():
            raise HTTPException(status_code=400, detail="Story title is required")
        if not story.introduction.strip():
            raise HTTPException(status_code=400, detail="Story introduction is required")
        if not story.middle.strip():
            raise HTTPException(status_code=400, detail="Story main part is required")
        if not story.conclusion.strip():
            raise HTTPException(status_code=400, detail="Story conclusion is required")
        
        # Create story document
        story_doc = Story(**story.dict())
        result = await db.stories.insert_one(story_doc.dict())
        
        # Update user progress
        stories_count = await db.stories.count_documents({})
        total_words = 0
        async for story_doc in db.stories.find():
            total_words += story_doc.get("word_count", 0)
        
        await db.user_progress.update_one(
            {},
            {
                "$set": {
                    "stories_count": stories_count,
                    "total_words": total_words,
                    "updated_at": datetime.utcnow()
                }
            },
            upsert=True
        )
        
        # Return created story
        created_story = await db.stories.find_one({"_id": result.inserted_id})
        return serialize_doc(created_story)
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error creating story: {e}")
        raise HTTPException(status_code=500, detail="Failed to create story")

@api_router.get("/stories/{story_id}")
async def get_story(story_id: str):
    """Get a specific story"""
    try:
        if not ObjectId.is_valid(story_id):
            raise HTTPException(status_code=400, detail="Invalid story ID")
        
        story = await db.stories.find_one({"_id": ObjectId(story_id)})
        if not story:
            raise HTTPException(status_code=404, detail="Story not found")
        
        return serialize_doc(story)
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting story: {e}")
        raise HTTPException(status_code=500, detail="Failed to get story")

@api_router.delete("/stories/{story_id}")
async def delete_story(story_id: str):
    """Delete a story"""
    try:
        if not ObjectId.is_valid(story_id):
            raise HTTPException(status_code=400, detail="Invalid story ID")
        
        result = await db.stories.delete_one({"_id": ObjectId(story_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Story not found")
        
        # Update user progress
        stories_count = await db.stories.count_documents({})
        total_words = 0
        async for story_doc in db.stories.find():
            total_words += story_doc.get("word_count", 0)
        
        await db.user_progress.update_one(
            {},
            {
                "$set": {
                    "stories_count": stories_count,
                    "total_words": total_words,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return {"message": "Story deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error deleting story: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete story")
