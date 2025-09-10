import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { storyCategories, writingTips } from './mock';
import { ArrowRight, Lightbulb, Compass, Sparkles, Heart, Home as HomeIcon, Search, Cat } from 'lucide-react';

const iconMap = {
  compass: Compass,
  sparkles: Sparkles,
  heart: Heart,
  home: HomeIcon,
  search: Search,
  cat: Cat
};

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your Story Adventure! ✨
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Let your imagination soar! Choose a story theme, get inspired by fun prompts, 
          and create amazing stories that are uniquely yours.
        </p>
        <Link to="/write">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg">
            Start Writing <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Story Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Choose Your Story Type
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyCategories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <Card key={category.id} className={`${category.color} border-2 hover:border-indigo-300 transition-all duration-200 hover:scale-105 cursor-pointer`}>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="h-12 w-12 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{category.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.prompts.slice(0, 1).map((prompt, index) => (
                      <div key={index} className="text-sm text-gray-700 italic bg-white bg-opacity-50 p-2 rounded">
                        "{prompt}"
                      </div>
                    ))}
                    <Badge variant="secondary" className="w-full justify-center">
                      {category.prompts.length} story ideas
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Writing Tips */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Story Writing Tips</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {writingTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;