'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Activity, Target } from 'lucide-react';

const weightData = [
  { date: '2024-01-01', weight: 75, bmi: 24.2 },
  { date: '2024-01-08', weight: 74.5, bmi: 24.0 },
  { date: '2024-01-15', weight: 74.2, bmi: 23.9 },
  { date: '2024-01-22', weight: 73.8, bmi: 23.8 },
  { date: '2024-01-29', weight: 73.5, bmi: 23.7 },
];

const calorieData = [
  { day: 'Mon', intake: 2100, burned: 400, net: 1700 },
  { day: 'Tue', intake: 1950, burned: 500, net: 1450 },
  { day: 'Wed', intake: 2200, burned: 350, net: 1850 },
  { day: 'Thu', intake: 2000, burned: 450, net: 1550 },
  { day: 'Fri', intake: 2150, burned: 600, net: 1550 },
  { day: 'Sat', intake: 2300, burned: 300, net: 2000 },
  { day: 'Sun', intake: 1900, burned: 550, net: 1350 },
];

const workoutData = [
  { name: 'Strength Training', value: 40, color: '#3B82F6' },
  { name: 'Cardio', value: 30, color: '#10B981' },
  { name: 'Flexibility', value: 20, color: '#F97316' },
  { name: 'Sports', value: 10, color: '#8B5CF6' },
];

export const ProgressDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Progress Dashboard
        </CardTitle>
        <CardDescription>
          Track your fitness journey with detailed analytics and insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="weight">Weight & BMI</TabsTrigger>
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-muted-foreground">Workouts This Month</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">-2.5kg</div>
                <div className="text-sm text-muted-foreground">Weight Progress</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">85%</div>
                <div className="text-sm text-muted-foreground">Goal Achievement</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">23.7</div>
                <div className="text-sm text-muted-foreground">Current BMI</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Calorie Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={calorieData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="intake" fill="#3B82F6" name="Intake" />
                      <Bar dataKey="burned" fill="#10B981" name="Burned" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Workout Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={workoutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {workoutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {workoutData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weight" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weight & BMI Progress</CardTitle>
                <CardDescription>
                  Track your weight loss journey and BMI changes over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="weight" orientation="left" />
                    <YAxis yAxisId="bmi" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="weight"
                      type="monotone"
                      dataKey="weight"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      name="Weight (kg)"
                    />
                    <Line
                      yAxisId="bmi"
                      type="monotone"
                      dataKey="bmi"
                      stroke="#10B981"
                      strokeWidth={3}
                      name="BMI"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calories" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Calorie Tracking</CardTitle>
                <CardDescription>
                  Monitor your calorie intake vs. calories burned throughout the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={calorieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="intake" fill="#3B82F6" name="Calories Intake" />
                    <Bar dataKey="burned" fill="#EF4444" name="Calories Burned" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">14,700</div>
                <div className="text-sm text-muted-foreground">Weekly Intake</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border">
                <div className="text-2xl font-bold text-red-600">3,150</div>
                <div className="text-sm text-muted-foreground">Weekly Burned</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">11,550</div>
                <div className="text-sm text-muted-foreground">Net Calories</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Workout Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={workoutData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {workoutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Workout Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Workouts</span>
                    <span className="font-semibold">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Duration</span>
                    <span className="font-semibold">45 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Longest Streak</span>
                    <span className="font-semibold">7 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Streak</span>
                    <span className="font-semibold">3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Favorite Time</span>
                    <span className="font-semibold">6:00 AM</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};