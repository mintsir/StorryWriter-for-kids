import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StoryLesson from "./components/StoryLesson";
import GuidedWriter from "./components/GuidedWriter";
import StoryGallery from "./components/StoryGallery";
import Navigation from "./components/Navigation";
import { Toaster } from "./components/ui/toaster";
import ApiService from "./services/api";
import { useToast } from "./hooks/use-toast";

function App() {
  const [userProgress, setUserProgress] = useState({
    lesson_completed: false,
    stories_count: 0,
    total_words: 0,
    current_streak: 0
  });
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Load user progress
        const progress = await ApiService.getProgress();
        setUserProgress(progress);
        
        // Load stories
        const storiesData = await ApiService.getStories();
        setStories(storiesData);
        
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast({
          title: "Connection Error",
          description: "Failed to load your data. Please refresh the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [toast]);
  
  const updateProgress = async (progressUpdate) => {
    try {
      const updatedProgress = await ApiService.updateProgress(progressUpdate);
      setUserProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Update Error",
        description: "Failed to save your progress.",
        variant: "destructive"
      });
    }
  };

  const addStory = async (storyData) => {
    try {
      const newStory = await ApiService.createStory(storyData);
      setStories(prev => [newStory, ...prev]);
      
      // Refresh progress to get updated stats
      const updatedProgress = await ApiService.getProgress();
      setUserProgress(updatedProgress);
      
      return newStory;
    } catch (error) {
      console.error('Error adding story:', error);
      toast({
        title: "Save Error",
        description: "Failed to save your story. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Story Master...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home progress={userProgress} />} />
          <Route path="/lesson" element={<StoryLesson onComplete={updateProgress} />} />
          <Route path="/write" element={<GuidedWriter progress={userProgress} onStoryCreate={addStory} />} />
          <Route path="/gallery" element={<StoryGallery stories={stories} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;