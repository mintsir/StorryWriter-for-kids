import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { storyCategories, writingHints } from './mock';
import { PlayCircle, Zap, CheckCircle, Lightbulb, ArrowRight, ArrowLeft, Save, RotateCcw, HelpCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const stepIcons = {
  0: PlayCircle,
  1: Zap, 
  2: CheckCircle
};

const stepColors = {
  0: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
  1: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
  2: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800' }
};

const stepNames = ['Introduction', 'Main Story', 'Conclusion'];

const GuidedWriter = ({ progress, onStoryCreate }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyParts, setStoryParts] = useState(['', '', '']);
  const [showHints, setShowHints] = useState({});
  const [currentHint, setCurrentHint] = useState(0);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Redirect if lesson not completed
  useEffect(() => {
    if (!progress.lesson_completed) {
      toast({
        title: "Complete the lesson first!",
        description: "Learn about story structure before you start writing.",
        variant: "destructive"
      });
    }
  }, [progress.lesson_completed, toast]);

  const currentStepIcon = stepIcons[currentStep];
  const currentStepColor = stepColors[currentStep];
  const currentHints = writingHints[currentStep === 0 ? 'introduction' : currentStep === 1 ? 'middle' : 'conclusion'];

  const handleStepComplete = () => {
    if (!storyParts[currentStep].trim()) {
      toast({
        title: "Write something first!",
        description: `Please write your ${stepNames[currentStep].toLowerCase()} before moving to the next step.`,
        variant: "destructive"
      });
      return;
    }

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      toast({
        title: `Great ${stepNames[currentStep]}!`,
        description: `Now let's work on the ${stepNames[currentStep + 1].toLowerCase()}.`,
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStoryPartChange = (value) => {
    const newParts = [...storyParts];
    newParts[currentStep] = value;
    setStoryParts(newParts);
  };

  const getStoryStarter = () => {
    if (!selectedCategory) return '';
    const starters = selectedCategory.storyStarters;
    if (currentStep === 0) return starters.introduction[0];
    if (currentStep === 1) return starters.middle[0];
    return starters.conclusion[0];
  };

  const saveCompleteStory = async () => {
    if (!storyTitle.trim()) {
      toast({
        title: "Add a title!",
        description: "Your amazing story needs a title.",
        variant: "destructive"
      });
      return;
    }

    if (storyParts.some(part => !part.trim())) {
      toast({
        title: "Complete all parts!",
        description: "Make sure you've written the introduction, main story, and conclusion.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSaving(true);
      
      const storyData = {
        title: storyTitle.trim(),
        category: selectedCategory.name,
        introduction: storyParts[0].trim(),
        middle: storyParts[1].trim(),
        conclusion: storyParts[2].trim(),
        date_completed: new Date().toISOString().split('T')[0],
        word_count: storyParts.join(' ').trim().split(/\s+/).length
      };

      await onStoryCreate(storyData);

      toast({
        title: "🎉 Story Complete!",
        description: `"${storyTitle}" has been saved to your collection!`,
      });

      // Reset for new story
      setStoryTitle('');
      setStoryParts(['', '', '']);
      setCurrentStep(0);
      setSelectedCategory(null);
      
    } catch (error) {
      // Error handling is done in App.js
    } finally {
      setSaving(false);
    }
  };

  const toggleHint = (step) => {
    setShowHints(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  const getNextHint = () => {
    setCurrentHint((currentHint + 1) % currentHints.length);
  };

  const renderCategorySelection = () => (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900">Choose Your Story Theme</CardTitle>
          <CardDescription>Pick a theme that excites you - this will help guide your story!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storyCategories.map((category) => (
              <Card 
                key={category.id}
                className={`${category.color} cursor-pointer hover:scale-105 transition-transform duration-200 border-2 hover:border-indigo-400`}
                onClick={() => setSelectedCategory(category)}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStoryWriter = () => {
    const Icon = currentStepIcon;
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="px-4 py-2">
                {selectedCategory.name} Story
              </Badge>
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of 3
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {stepNames.map((name, index) => {
                const StepIcon = stepIcons[index];
                const isActive = index === currentStep;
                const isCompleted = storyParts[index].trim().length > 0;
                
                return (
                  <div key={index} className="flex items-center">
                    <div className={`p-2 rounded-full border-2 ${
                      isActive ? stepColors[index].border + ' ' + stepColors[index].bg : 
                      isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <StepIcon className={`h-5 w-5 ${
                        isActive ? stepColors[index].text :
                        isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className={`ml-2 text-sm ${
                      isActive ? 'font-semibold text-gray-900' : 'text-gray-500'
                    }`}>
                      {name}
                    </span>
                    {index < stepNames.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-300 mx-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Title Input */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">First, what's your story called?</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="My Amazing Adventure..."
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                className="text-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Current Step Writing Area */}
        <Card className={`border-2 ${currentStepColor.border} ${currentStepColor.bg}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className={`h-8 w-8 ${currentStepColor.text}`} />
                <div>
                  <CardTitle className="text-xl">Write Your {stepNames[currentStep]}</CardTitle>
                  <CardDescription>
                    {currentStep === 0 && "Introduce your character and setting"}
                    {currentStep === 1 && "What exciting adventure happens?"}
                    {currentStep === 2 && "How does it end and what did they learn?"}
                  </CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toggleHint(currentStep)}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                {showHints[currentStep] ? 'Hide' : 'Show'} Hints
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Story Starter */}
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <strong>Story Starter:</strong> {getStoryStarter()}
              </AlertDescription>
            </Alert>

            {/* Hints */}
            {showHints[currentStep] && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm text-yellow-800">💡 Writing Hint</CardTitle>
                    <Button variant="ghost" size="sm" onClick={getNextHint}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-700">{currentHints[currentHint]}</p>
                </CardContent>
              </Card>
            )}

            {/* Writing Area */}
            <div>
              <Label htmlFor={`step-${currentStep}`} className="text-base font-medium">
                Write your {stepNames[currentStep].toLowerCase()} here:
              </Label>
              <Textarea
                id={`step-${currentStep}`}
                placeholder={`Start writing your ${stepNames[currentStep].toLowerCase()}...`}
                value={storyParts[currentStep]}
                onChange={(e) => handleStoryPartChange(e.target.value)}
                className="mt-2 min-h-[200px] text-base leading-relaxed"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Words: {storyParts[currentStep].trim().split(/\s+/).filter(word => word.length > 0).length}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <div className="flex space-x-2">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handlePreviousStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setCurrentStep(0);
                    setStoryParts(['', '', '']);
                    setStoryTitle('');
                  }}
                >
                  Change Theme
                </Button>
              </div>

              {currentStep < 2 ? (
                <Button onClick={handleStepComplete} className="bg-indigo-600 hover:bg-indigo-700">
                  Next: {stepNames[currentStep + 1]} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={saveCompleteStory} className="bg-green-600 hover:bg-green-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Complete Story
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Completed Parts Preview */}
        {storyParts.some(part => part.trim()) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Story So Far</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {storyTitle && (
                <div>
                  <h3 className="font-bold text-lg text-center text-gray-900 mb-4">"{storyTitle}"</h3>
                </div>
              )}
              {storyParts.map((part, index) => {
                if (!part.trim()) return null;
                const StepIcon = stepIcons[index];
                return (
                  <div key={index} className="flex space-x-3">
                    <StepIcon className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-700 text-sm">{stepNames[index]}</h4>
                      <p className="text-gray-600 text-sm mt-1">{part}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  if (!progress.lessonCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Alert className="border-yellow-200 bg-yellow-50">
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            Please complete the story structure lesson first before starting to write!
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Guided Story Writing</h1>
        <p className="text-gray-600">Let's write an amazing story together, step by step!</p>
      </div>

      {!selectedCategory ? renderCategorySelection() : renderStoryWriter()}
    </div>
  );
};

export default GuidedWriter;