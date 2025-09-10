import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StoryWriter from "./components/StoryWriter";
import StoryGallery from "./components/StoryGallery";
import Navigation from "./components/Navigation";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [stories, setStories] = useState([]);
  
  const addStory = (story) => {
    setStories(prev => [...prev, { ...story, id: Date.now() }]);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<StoryWriter onSaveStory={addStory} />} />
          <Route path="/gallery" element={<StoryGallery stories={stories} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;