import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { storyStructureLesson } from './mock';
import { PlayCircle, Zap, CheckCircle, ArrowRight, ArrowLeft, BookOpen, Lightbulb } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const iconMap = {
  'play-circle': PlayCircle,
  'zap': Zap,
  'check-circle': CheckCircle
};

const StoryLesson = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const { toast } = useToast();

  const lesson = storyStructureLesson;
  const isOnIntro = currentStep === 0;
  const isOnConclusion = currentStep === lesson.parts.length + 1;
  const currentPart = !isOnIntro && !isOnConclusion ? lesson.parts[currentStep - 1] : null;

  const handleNext = () => {
    if (currentStep < lesson.parts.length + 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    onComplete();
    toast({
      title: "🎉 Lesson Complete!",
      description: "You're ready to start writing amazing stories! Click 'Start Writing' to begin.",
    });
  };

  const renderIntroduction = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <BookOpen className="h-16 w-16 text-indigo-600" />
        </div>
        <CardTitle className="text-3xl text-indigo-900">{lesson.title}</CardTitle>
        <CardDescription className="text-lg mt-4">{lesson.introduction}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-indigo-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-indigo-900 mb-4">
            🥪 Think of a Story Like a Sandwich:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lesson.parts.map((part, index) => {
              const Icon = iconMap[part.icon];
              return (
                <div key={part.id} className={`${part.color} p-4 rounded-lg border-2 ${part.borderColor}`}>
                  <Icon className="h-8 w-8 mb-2 text-gray-700" />
                  <h4 className="font-semibold text-gray-800">{part.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{part.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-600 mb-4">Ready to learn about each part? Let's start!</p>
          <Button onClick={handleNext} size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            Let's Learn! <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStoryPart = (part) => {
    const Icon = iconMap[part.icon];
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className={`${part.color} p-3 rounded-full border-2 ${part.borderColor}`}>
              <Icon className="h-8 w-8 text-gray-700" />
            </div>
            <div>
              <CardTitle className="text-2xl text-gray-900">{part.name}</CardTitle>
              <CardDescription className="text-lg">{part.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`${part.color} p-6 rounded-lg border-2 ${part.borderColor}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{part.details}</h3>
            <ul className="space-y-2">
              {part.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📖 Example {part.name}s:</h3>
            <div className="space-y-3">
              {part.examples.map((example, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-gray-700 italic">"{example}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button onClick={handlePrevious} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Badge variant="outline" className="px-4 py-2">
              {currentStep} of {lesson.parts.length + 1}
            </Badge>
            <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
              Next Part <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderConclusion = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <CardTitle className="text-3xl text-green-900">🎉 You're Ready to Write!</CardTitle>
        <CardDescription className="text-lg mt-4">
          You now know the secret to writing great stories!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-green-50 p-6 rounded-lg mb-6 border-2 border-green-200">
          <h3 className="text-xl font-semibold text-green-900 mb-4">Remember the 3 Parts:</h3>
          <div className="space-y-3">
            {lesson.parts.map((part, index) => {
              const Icon = iconMap[part.icon];
              return (
                <div key={part.id} className="flex items-center space-x-3">
                  <Icon className="h-6 w-6 text-green-600" />
                  <span className="font-medium text-green-800">{part.name}:</span>
                  <span className="text-green-700">{part.description}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Now let's put what you learned into practice! I'll guide you step-by-step 
            through writing your first structured story.
          </p>
          <div className="flex justify-between items-center">
            <Button onClick={handlePrevious} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Review Last Part
            </Button>
            <Button onClick={handleComplete} size="lg" className="bg-green-600 hover:bg-green-700">
              Start Writing Stories! ✨
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Story Structure Lesson</h1>
        <p className="text-gray-600">Learn the building blocks of great storytelling</p>
      </div>

      {isOnIntro && renderIntroduction()}
      {currentPart && renderStoryPart(currentPart)}
      {isOnConclusion && renderConclusion()}
    </div>
  );
};

export default StoryLesson;