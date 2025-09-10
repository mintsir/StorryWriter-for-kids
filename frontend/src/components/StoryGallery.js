import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { completedStories } from './mock';
import { BookOpen, Calendar, FileText, Search, Heart, Sparkles, Eye, PlayCircle, Zap, CheckCircle } from 'lucide-react';

const StoryGallery = ({ stories }) => {
  const [allStories, setAllStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    // Combine completed mock stories with new stories from props
    setAllStories([...completedStories, ...(stories || [])]);
  }, [stories]);

  const categories = ['All', ...new Set(allStories.map(story => story.category))];

  const filteredStories = allStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Adventure': 'bg-orange-100 text-orange-800',
      'Fantasy': 'bg-purple-100 text-purple-800',
      'Friendship': 'bg-pink-100 text-pink-800',
      'Family': 'bg-green-100 text-green-800',
      'Mystery': 'bg-blue-100 text-blue-800',
      'Animals': 'bg-yellow-100 text-yellow-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Story Collection</h1>
        <p className="text-gray-600">All your wonderful stories in one place!</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search your stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          {allStories.length === 0 ? (
            <div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories yet!</h3>
              <p className="text-gray-500 mb-4">Start writing your first amazing story.</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Heart className="h-4 w-4 mr-2" />
                Write Your First Story
              </Button>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories found</h3>
              <p className="text-gray-500">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white border-2 hover:border-indigo-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 line-clamp-2">
                      {story.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getCategoryColor(story.category)}>
                        {story.category}
                      </Badge>
                    </div>
                  </div>
                  <Sparkles className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-4 mb-4">
                  {story.content}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(story.dateCreated)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>{story.wordCount} words</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats */}
      {allStories.length > 0 && (
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Your Writing Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-indigo-600">{allStories.length}</div>
              <div className="text-sm text-gray-600">Stories Written</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                {allStories.reduce((total, story) => total + story.wordCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Words</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-pink-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categories Explored</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryGallery;