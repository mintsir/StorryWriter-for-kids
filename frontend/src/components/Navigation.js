import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { GraduationCap, Home, BookOpen, Sparkles } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Story Master</h1>
            <span className="text-sm text-gray-500 hidden sm:block">Learn • Practice • Create</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            
            <Link to="/lesson">
              <Button 
                variant={isActive('/lesson') ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Learn</span>
              </Button>
            </Link>
            
            <Link to="/write">
              <Button 
                variant={isActive('/write') ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Write</span>
              </Button>
            </Link>
            
            <Link to="/gallery">
              <Button 
                variant={isActive('/gallery') ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>My Stories</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;