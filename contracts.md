# Story Master - Backend API Contracts

## Overview
Educational story writing app that teaches proper story structure (Introduction, Main Story, Conclusion) to children ages 7-9.

## Data Models

### User Progress
```json
{
  "_id": "ObjectId",
  "lessonCompleted": "boolean",
  "currentStreak": "number",
  "storiesCount": "number",
  "totalWords": "number",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Story
```json
{
  "_id": "ObjectId", 
  "title": "string",
  "category": "string", // Adventure, Friendship, Family
  "introduction": "string", // Beginning part
  "middle": "string", // Main story part  
  "conclusion": "string", // Ending part
  "wordCount": "number",
  "dateCompleted": "string", // ISO date
  "studentName": "string", // Optional
  "teacherFeedback": "string", // Optional
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## API Endpoints

### User Progress
- `GET /api/progress` - Get user progress data
- `PUT /api/progress` - Update progress (lesson completion, stats)

### Stories
- `GET /api/stories` - Get all user stories
- `POST /api/stories` - Create new story
- `GET /api/stories/:id` - Get specific story
- `PUT /api/stories/:id` - Update story (optional)
- `DELETE /api/stories/:id` - Delete story (optional)

## Frontend Integration Changes

### Mock Data to Replace
**File: `/app/frontend/src/components/mock.js`**
- `completedStories` array → API call to `/api/stories`
- `progressData` object → API call to `/api/progress`

### Components to Update
**1. App.js:**
- Replace local state with API calls
- Load user progress on app start
- Pass real data to components

**2. Home.js:**
- Check real progress.lessonCompleted from API
- Show actual statistics

**3. StoryLesson.js:**
- Call `/api/progress` to mark lesson as completed

**4. GuidedWriter.js:**
- Save completed stories to `/api/stories`
- Update progress stats via `/api/progress`

**5. StoryGallery.js:**
- Load stories from `/api/stories`
- Show real user statistics

## Implementation Priority
1. ✅ Create MongoDB models (User Progress & Story)
2. ✅ Implement CRUD endpoints
3. ✅ Update frontend components to use real API
4. ✅ Replace mock data with API calls
5. ✅ Test full story creation flow
6. ✅ Test lesson completion and progress tracking

## Business Logic
- User must complete lesson before writing stories
- Each story must have all 3 parts (introduction, middle, conclusion)
- Progress tracking includes: stories completed, total words, current streak
- Stories are displayed with proper structure visualization

## Error Handling
- Validate story structure (all parts required)
- Handle API connection errors gracefully
- Show user-friendly error messages
- Prevent data loss during story creation