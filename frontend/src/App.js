import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StoryLesson from "./components/StoryLesson";
import GuidedWriter from "./components/GuidedWriter";
import StoryGallery from "./components/StoryGallery";
import Navigation from "./components/Navigation";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [userProgress, setUserProgress] = useState({
    lessonCompleted: false,
    currentStory: null,
    completedStories: []
  });
  
  const updateProgress = (progress) => {
    setUserProgress(prev => ({ ...prev, ...progress }));
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home progress={userProgress} />} />
          <Route path="/lesson" element={<StoryLesson onComplete={() => updateProgress({ lessonCompleted: true })} />} />
          <Route path="/write" element={<GuidedWriter progress={userProgress} onProgressUpdate={updateProgress} />} />
          <Route path="/gallery" element={<StoryGallery stories={userProgress.completedStories} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;