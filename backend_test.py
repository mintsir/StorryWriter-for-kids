#!/usr/bin/env python3
"""
Story Master API Backend Testing Suite
Tests all API endpoints for the Story Master application
"""

import requests
import json
import sys
from datetime import datetime

# Get the backend URL from frontend .env
BACKEND_URL = "https://kidstorylab.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test the root endpoint GET /api/"""
    print("\n=== Testing Root Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "Story Master API" in data["message"]:
                print("✅ Root endpoint working correctly")
                return True
            else:
                print("❌ Root endpoint response format incorrect")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
        return False

def test_get_progress():
    """Test GET /api/progress - should create and return default progress if none exists"""
    print("\n=== Testing GET Progress Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/progress")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["lesson_completed", "current_streak", "stories_count", "total_words", "created_at", "updated_at"]
            if all(field in data for field in required_fields):
                print("✅ GET progress endpoint working correctly")
                return True, data
            else:
                print("❌ GET progress response missing required fields")
                return False, None
        else:
            print(f"❌ GET progress failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ GET progress error: {e}")
        return False, None

def test_update_progress():
    """Test PUT /api/progress - should update progress with lesson_completed: true"""
    print("\n=== Testing PUT Progress Endpoint ===")
    try:
        update_data = {
            "lesson_completed": True,
            "current_streak": 5
        }
        
        response = requests.put(f"{BACKEND_URL}/progress", json=update_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("lesson_completed") == True and data.get("current_streak") == 5:
                print("✅ PUT progress endpoint working correctly")
                return True, data
            else:
                print("❌ PUT progress did not update fields correctly")
                return False, None
        else:
            print(f"❌ PUT progress failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ PUT progress error: {e}")
        return False, None

def test_create_story():
    """Test POST /api/stories - create a sample story with all required fields"""
    print("\n=== Testing POST Story Endpoint ===")
    try:
        story_data = {
            "title": "The Magical Forest Adventure",
            "category": "Fantasy",
            "introduction": "Once upon a time, there was a young explorer named Emma who discovered a hidden path in her backyard that led to a magical forest filled with talking animals and glowing flowers.",
            "middle": "Emma met a wise old owl who told her about a lost treasure that could save the forest from an evil wizard. She embarked on a quest with her new animal friends, facing challenges and solving riddles along the way.",
            "conclusion": "After finding the treasure and defeating the wizard, Emma learned that the real magic was the friendship she made with the forest creatures. She promised to visit them every day and protect their magical home.",
            "word_count": 156,
            "date_completed": "2024-12-19",
            "student_name": "Emma Johnson"
        }
        
        response = requests.post(f"{BACKEND_URL}/stories", json=story_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("title") == story_data["title"] and "_id" in data:
                print("✅ POST story endpoint working correctly")
                return True, data
            else:
                print("❌ POST story response format incorrect")
                return False, None
        else:
            print(f"❌ POST story failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ POST story error: {e}")
        return False, None

def test_get_stories():
    """Test GET /api/stories - should return all stories"""
    print("\n=== Testing GET Stories Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/stories")
        print(f"Status Code: {response.status_code}")
        print(f"Response length: {len(response.json()) if response.status_code == 200 else 'N/A'}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ GET stories endpoint working correctly - returned {len(data)} stories")
                return True, data
            else:
                print("❌ GET stories should return a list")
                return False, None
        else:
            print(f"❌ GET stories failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ GET stories error: {e}")
        return False, None

def test_get_story_by_id(story_id):
    """Test GET /api/stories/{story_id} - should return specific story"""
    print(f"\n=== Testing GET Story by ID Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/stories/{story_id}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("_id") == story_id:
                print("✅ GET story by ID endpoint working correctly")
                return True, data
            else:
                print("❌ GET story by ID returned wrong story")
                return False, None
        else:
            print(f"❌ GET story by ID failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ GET story by ID error: {e}")
        return False, None

def test_progress_auto_update():
    """Test that progress is updated automatically when a story is created"""
    print("\n=== Testing Progress Auto-Update ===")
    try:
        # Get initial progress
        initial_response = requests.get(f"{BACKEND_URL}/progress")
        if initial_response.status_code != 200:
            print("❌ Could not get initial progress")
            return False
        
        initial_progress = initial_response.json()
        initial_stories_count = initial_progress.get("stories_count", 0)
        initial_total_words = initial_progress.get("total_words", 0)
        
        print(f"Initial stories count: {initial_stories_count}")
        print(f"Initial total words: {initial_total_words}")
        
        # Create a new story
        story_data = {
            "title": "The Space Adventure",
            "category": "Science Fiction",
            "introduction": "Captain Alex piloted her spaceship through the asteroid field.",
            "middle": "She discovered a new planet with friendly aliens who needed help.",
            "conclusion": "Alex helped the aliens and made new friends across the galaxy.",
            "word_count": 89,
            "date_completed": "2024-12-19",
            "student_name": "Alex Smith"
        }
        
        story_response = requests.post(f"{BACKEND_URL}/stories", json=story_data)
        if story_response.status_code != 200:
            print("❌ Could not create test story")
            return False
        
        # Get updated progress
        updated_response = requests.get(f"{BACKEND_URL}/progress")
        if updated_response.status_code != 200:
            print("❌ Could not get updated progress")
            return False
        
        updated_progress = updated_response.json()
        updated_stories_count = updated_progress.get("stories_count", 0)
        updated_total_words = updated_progress.get("total_words", 0)
        
        print(f"Updated stories count: {updated_stories_count}")
        print(f"Updated total words: {updated_total_words}")
        
        if updated_stories_count > initial_stories_count and updated_total_words > initial_total_words:
            print("✅ Progress auto-update working correctly")
            return True
        else:
            print("❌ Progress was not updated automatically")
            return False
            
    except Exception as e:
        print(f"❌ Progress auto-update test error: {e}")
        return False

def test_error_handling():
    """Test error handling - try creating story with missing required fields"""
    print("\n=== Testing Error Handling ===")
    try:
        # Test with missing title
        invalid_story = {
            "category": "Adventure",
            "introduction": "Some intro",
            "middle": "Some middle",
            "conclusion": "Some conclusion",
            "word_count": 50,
            "date_completed": "2024-12-19"
        }
        
        response = requests.post(f"{BACKEND_URL}/stories", json=invalid_story)
        print(f"Missing title - Status Code: {response.status_code}")
        
        if response.status_code == 422:  # Validation error
            print("✅ Validation error handling working correctly")
            validation_passed = True
        else:
            print("❌ Should return validation error for missing title")
            validation_passed = False
        
        # Test with empty required fields
        empty_story = {
            "title": "",
            "category": "Adventure",
            "introduction": "",
            "middle": "Some middle",
            "conclusion": "Some conclusion",
            "word_count": 50,
            "date_completed": "2024-12-19"
        }
        
        response = requests.post(f"{BACKEND_URL}/stories", json=empty_story)
        print(f"Empty fields - Status Code: {response.status_code}")
        
        if response.status_code == 400:  # Bad request
            print("✅ Empty field validation working correctly")
            empty_field_passed = True
        else:
            print("❌ Should return bad request for empty required fields")
            empty_field_passed = False
        
        # Test invalid story ID
        response = requests.get(f"{BACKEND_URL}/stories/invalid_id")
        print(f"Invalid ID - Status Code: {response.status_code}")
        
        if response.status_code == 400:  # Bad request
            print("✅ Invalid ID handling working correctly")
            invalid_id_passed = True
        else:
            print("❌ Should return bad request for invalid story ID")
            invalid_id_passed = False
        
        return validation_passed and empty_field_passed and invalid_id_passed
        
    except Exception as e:
        print(f"❌ Error handling test error: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting Story Master API Backend Tests")
    print(f"Testing against: {BACKEND_URL}")
    
    results = {}
    
    # Test 1: Root endpoint
    results['root'] = test_root_endpoint()
    
    # Test 2: Progress endpoints
    results['get_progress'], initial_progress = test_get_progress()
    results['update_progress'], updated_progress = test_update_progress()
    
    # Test 3: Story creation
    results['create_story'], created_story = test_create_story()
    story_id = created_story.get('_id') if created_story else None
    
    # Test 4: Story retrieval
    results['get_stories'], all_stories = test_get_stories()
    if story_id:
        results['get_story_by_id'], specific_story = test_get_story_by_id(story_id)
    else:
        results['get_story_by_id'] = False
    
    # Test 5: Progress auto-update
    results['progress_auto_update'] = test_progress_auto_update()
    
    # Test 6: Error handling
    results['error_handling'] = test_error_handling()
    
    # Summary
    print("\n" + "="*50)
    print("📊 TEST RESULTS SUMMARY")
    print("="*50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Story Master API is working correctly.")
        return True
    else:
        print("⚠️  Some tests failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)