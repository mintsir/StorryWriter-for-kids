import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GraduationCap, Sparkles, BookOpen, Trophy, PlayCircle, Zap, CheckCircle } from 'lucide-react';

const Home = ({ progress }) => {
  const storyParts = [
    {
      name: "Introduction",
      icon: PlayCircle,
      description: "Meet your character and set the scene",
      color: "text-green-600"
    },
    {
      name: "Main Story",
      icon: Zap,
      description: "The exciting adventure happens",
      color: "text-blue-600"
    },
    {
      name: "Conclusion",
      icon: CheckCircle,
      description: "Wrap up and share what you learned",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-100 p-4 rounded-full">
            <GraduationCap className="h-16 w-16 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Story Master! 📚
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Learn the secret to writing amazing stories! We'll teach you step-by-step 
          how to create stories with a strong beginning, exciting middle, and satisfying ending.
        </p>
        
        {!progress.lesson_completed ? (
          <Link to="/lesson">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg">
              Start Learning <GraduationCap className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        ) : (
          <Link to="/write">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Start Writing <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>

      {/* Learning Path */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Your Story Learning Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={`border-2 ${progress.lessonCompleted ? 'border-green-300 bg-green-50' : 'border-indigo-300'}`}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <GraduationCap className={`h-12 w-12 ${progress.lessonCompleted ? 'text-green-600' : 'text-indigo-600'}`} />
              </div>
              <CardTitle className="text-xl">
                1. Learn Story Structure
                {progress.lessonCompleted && <Badge className="ml-2 bg-green-100 text-green-800">✓ Complete</Badge>}
              </CardTitle>
              <CardDescription>
                Discover the 3 parts every great story needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/lesson">
                <Button 
                  className={`w-full ${progress.lessonCompleted ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  variant={progress.lessonCompleted ? 'default' : 'outline'}
                >
                  {progress.lessonCompleted ? 'Review Lesson' : 'Start Lesson'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className={`border-2 ${progress.lessonCompleted ? 'border-indigo-300' : 'border-gray-200 opacity-75'}`}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Sparkles className={`h-12 w-12 ${progress.lessonCompleted ? 'text-indigo-600' : 'text-gray-400'}`} />
              </div>
              <CardTitle className="text-xl">2. Practice Writing</CardTitle>
              <CardDescription>
                Write your own stories with guided help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/write">
                <Button 
                  className="w-full" 
                  disabled={!progress.lessonCompleted}
                  variant={progress.lessonCompleted ? 'default' : 'outline'}
                >
                  {progress.lessonCompleted ? 'Start Writing' : 'Complete Lesson First'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Trophy className="h-12 w-12 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">3. Celebrate Success</CardTitle>
              <CardDescription>
                See all your amazing stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/gallery">
                <Button className="w-full" variant="outline">
                  View Gallery
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Story Structure Preview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          The 3 Parts of Every Great Story
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {storyParts.map((part, index) => {
            const Icon = part.icon;
            return (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
                <Icon className={`h-10 w-10 mx-auto mb-2 ${part.color}`} />
                <h3 className="font-semibold text-gray-900 mb-1">{part.name}</h3>
                <p className="text-sm text-gray-600">{part.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;