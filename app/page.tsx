'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { BMICalculator } from '@/components/dashboard/BMICalculator';
import { CalorieTracker } from '@/components/dashboard/CalorieTracker';
import { MediaUpload } from '@/components/dashboard/MediaUpload';
import { FitnessRecommendations } from '@/components/dashboard/FitnessRecommendations';
import { ProgressDashboard } from '@/components/dashboard/ProgressDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'bmi':
        return <BMICalculator />;
      case 'calories':
        return <CalorieTracker />;
      case 'upload':
        return <MediaUpload />;
      case 'recommendations':
        return <FitnessRecommendations />;
      case 'progress':
        return <ProgressDashboard />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 md:ml-72">
          <div className="container py-8 px-4 md:px-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

const OverviewTab = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          Welcome to Your Fitness Journey
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your progress, analyze your form, and get personalized recommendations to achieve your fitness goals.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-600">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">BMI Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Calculate your Body Mass Index and get health insights based on your measurements.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-600">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Calorie Tracking</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Monitor your daily calorie intake and track calories burned through exercise.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-600">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Form Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Upload workout videos and images for AI-powered form analysis and feedback.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-600">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Visualize your fitness journey with detailed charts and progress analytics.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
          <div className="text-sm text-muted-foreground">Workouts This Week</div>
        </Card>
        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-2">0</div>
          <div className="text-sm text-muted-foreground">Calories Tracked Today</div>
        </Card>
        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
          <div className="text-sm text-muted-foreground">Days Active This Month</div>
        </Card>
      </div>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Start your fitness journey with these simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">1. Calculate Your BMI</h3>
              <p className="text-sm text-muted-foreground">
                Begin by understanding your current health status with our BMI calculator.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">2. Set Your Goals</h3>
              <p className="text-sm text-muted-foreground">
                Use the calorie tracker to set daily intake and exercise goals.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">3. Upload Form Videos</h3>
              <p className="text-sm text-muted-foreground">
                Get AI-powered feedback on your workout form and technique.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">4. Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your improvements with detailed charts and analytics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};