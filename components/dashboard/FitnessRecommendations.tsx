'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Target, Calendar, Clock, Star, CheckCircle2 } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'recovery';
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const FitnessRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Mock recommendations - in a real app, this would come from AI analysis
    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        type: 'workout',
        title: 'Upper Body Strength Training',
        description: 'Based on your recent form analysis, focus on compound movements like pull-ups and push-ups to build overall upper body strength.',
        difficulty: 'Intermediate',
        duration: '45 minutes',
        completed: false,
        priority: 'high',
      },
      {
        id: '2',
        type: 'nutrition',
        title: 'Increase Protein Intake',
        description: 'Your calorie tracking shows you\'re 20g short of your daily protein goal. Consider adding a protein shake post-workout.',
        difficulty: 'Beginner',
        duration: '5 minutes',
        completed: false,
        priority: 'high',
      },
      {
        id: '3',
        type: 'recovery',
        title: 'Active Recovery Session',
        description: 'Schedule a light yoga or stretching session to help with muscle recovery and flexibility.',
        difficulty: 'Beginner',
        duration: '30 minutes',
        completed: true,
        priority: 'medium',
      },
      {
        id: '4',
        type: 'workout',
        title: 'Core Strengthening Routine',
        description: 'Your BMI is in the healthy range, but adding core work will improve your overall stability and form.',
        difficulty: 'Intermediate',
        duration: '20 minutes',
        completed: false,
        priority: 'medium',
      },
      {
        id: '5',
        type: 'nutrition',
        title: 'Hydration Reminder',
        description: 'Increase your water intake to 8-10 glasses daily to support your fitness goals and recovery.',
        difficulty: 'Beginner',
        duration: 'All day',
        completed: false,
        priority: 'low',
      },
    ];

    setRecommendations(mockRecommendations);
  }, []);

  const toggleCompleted = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, completed: !rec.completed } : rec
      )
    );
  };

  const getFilteredRecommendations = () => {
    if (activeTab === 'all') return recommendations;
    return recommendations.filter(rec => rec.type === activeTab);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Target className="h-4 w-4" />;
      case 'nutrition': return <Star className="h-4 w-4" />;
      case 'recovery': return <Calendar className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const completedCount = recommendations.filter(rec => rec.completed).length;
  const completionPercentage = (completedCount / recommendations.length) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          AI Fitness Recommendations
        </CardTitle>
        <CardDescription>
          Personalized suggestions based on your fitness data and goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Weekly Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedCount} / {recommendations.length} completed
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="workout">Workout</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="recovery">Recovery</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {getFilteredRecommendations().map((recommendation) => (
              <div
                key={recommendation.id}
                className={`border rounded-lg p-4 space-y-3 transition-all ${
                  recommendation.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      recommendation.type === 'workout' ? 'bg-blue-100' :
                      recommendation.type === 'nutrition' ? 'bg-orange-100' :
                      'bg-purple-100'
                    }`}>
                      {getTypeIcon(recommendation.type)}
                    </div>
                    <div className="space-y-1">
                      <h3 className={`font-semibold ${
                        recommendation.completed ? 'line-through text-muted-foreground' : ''
                      }`}>
                        {recommendation.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {recommendation.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={recommendation.completed ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCompleted(recommendation.id)}
                    className={recommendation.completed ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {recommendation.completed ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      'Mark Complete'
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={getPriorityColor(recommendation.priority)}>
                    {recommendation.priority} priority
                  </Badge>
                  <Badge variant="outline" className={getDifficultyColor(recommendation.difficulty)}>
                    {recommendation.difficulty}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    <Clock className="h-3 w-3 mr-1" />
                    {recommendation.duration}
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {getFilteredRecommendations().length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recommendations found for this category.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};