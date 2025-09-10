import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { storyCategories } from './mock';
import { Save, RefreshCw, BookOpen, Lightbulb } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const StoryWriter = ({ onSaveStory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const selectCategory = (category) => {
    setSelectedCategory(category);
    const randomPrompt = category.prompts[Math.floor(Math.random() * category.prompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  const getNewPrompt = () => {
    if (selectedCategory) {
      const randomPrompt = selectedCategory.prompts[Math.floor(Math.random() * selectedCategory.prompts.length)];
      setCurrentPrompt(randomPrompt);
    }
  };

  const saveStory = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Oops!",
        description: "Please add a title and write your story first.",
        variant: "destructive"
      });
      return;
    }

    const story = {
      title: title.trim(),
      content: content.trim(),
      category: selectedCategory?.name || 'Other',
      dateCreated: new Date().toISOString().split('T')[0],
      wordCount: content.trim().split(/\s+/).length
    };

    onSaveStory(story);
    
    toast({
      title: "Story Saved! 🎉",
      description: `"${title}" has been added to your story collection.`,
    });

    // Reset form
    setTitle('');
    setContent('');
    setCurrentPrompt('');
    setSelectedCategory(null);
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Story</h1>
        <p className="text-gray-600">Choose a theme, get inspired, and let your creativity flow!</p>
      </div>

      {/* Category Selection */}
      {!selectedCategory && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">First, choose your story type:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {storyCategories.map((category) => (
              <Card 
                key={category.id} 
                className={`${category.color} cursor-pointer hover:scale-105 transition-transform duration-200 border-2 hover:border-indigo-400`}
                onClick={() => selectCategory(category)}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Writing Interface */}
      {selectedCategory && (
        <div className="space-y-6">
          {/* Selected Category & Prompt */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">{selectedCategory.name}</Badge>
                  <CardTitle className="text-lg">Your Story Prompt</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={getNewPrompt}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Prompt
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700 italic font-medium">"{currentPrompt}"</p>
              </div>
            </CardContent>
          </Card>

          {/* Story Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Write Your Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Story Title</Label>
                <Input
                  id="title"
                  placeholder="What's your story called?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="content">Your Story</Label>
                <Textarea
                  id="content"
                  placeholder="Once upon a time..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 min-h-[300px] resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    Word count: {wordCount}
                  </p>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedCategory(null);
                        setCurrentPrompt('');
                      }}
                    >
                      Change Theme
                    </Button>
                    <Button onClick={saveStory} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Story
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StoryWriter;