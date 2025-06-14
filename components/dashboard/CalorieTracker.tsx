'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Flame, Target, TrendingUp, Trash2 } from 'lucide-react';

interface CalorieEntry {
  id: string;
  type: 'intake' | 'burned';
  description: string;
  calories: number;
  timestamp: Date;
}

export const CalorieTracker = () => {
  const [entries, setEntries] = useState<CalorieEntry[]>([]);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [dailyGoal, setDailyGoal] = useState(2000);

  const addEntry = (type: 'intake' | 'burned') => {
    if (!description || !calories) return;

    const newEntry: CalorieEntry = {
      id: Date.now().toString(),
      type,
      description,
      calories: parseInt(calories),
      timestamp: new Date(),
    };

    setEntries([...entries, newEntry]);
    setDescription('');
    setCalories('');
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const totalIntake = entries
    .filter(entry => entry.type === 'intake')
    .reduce((sum, entry) => sum + entry.calories, 0);

  const totalBurned = entries
    .filter(entry => entry.type === 'burned')
    .reduce((sum, entry) => sum + entry.calories, 0);

  const netCalories = totalIntake - totalBurned;
  const progressPercentage = Math.max(0, Math.min(100, (netCalories / dailyGoal) * 100));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-600" />
          Calorie Tracker
        </CardTitle>
        <CardDescription>
          Track your daily calorie intake and burned calories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Daily Goal Setting */}
        <div className="space-y-2">
          <Label htmlFor="dailyGoal">Daily Calorie Goal</Label>
          <Input
            id="dailyGoal"
            type="number"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(parseInt(e.target.value) || 2000)}
            className="w-32"
          />
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">{totalIntake}</div>
            <div className="text-sm text-muted-foreground">Calories Consumed</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">{totalBurned}</div>
            <div className="text-sm text-muted-foreground">Calories Burned</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">{netCalories}</div>
            <div className="text-sm text-muted-foreground">Net Calories</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Daily Progress</span>
            <span className="text-sm text-muted-foreground">
              {netCalories} / {dailyGoal} calories
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{dailyGoal}</span>
          </div>
        </div>

        {/* Add Entry Form */}
        <Tabs defaultValue="intake" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="intake">Add Intake</TabsTrigger>
            <TabsTrigger value="burned">Add Burned</TabsTrigger>
          </TabsList>
          
          <TabsContent value="intake" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="intake-description">Food/Meal</Label>
                <Input
                  id="intake-description"
                  placeholder="e.g., Chicken Salad"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intake-calories">Calories</Label>
                <Input
                  id="intake-calories"
                  type="number"
                  placeholder="e.g., 450"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
            </div>
            <Button 
              onClick={() => addEntry('intake')} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!description || !calories}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Food Intake
            </Button>
          </TabsContent>
          
          <TabsContent value="burned" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="burned-description">Exercise/Activity</Label>
                <Input
                  id="burned-description"
                  placeholder="e.g., 30min Running"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="burned-calories">Calories Burned</Label>
                <Input
                  id="burned-calories"
                  type="number"
                  placeholder="e.g., 300"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
            </div>
            <Button 
              onClick={() => addEntry('burned')} 
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={!description || !calories}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </TabsContent>
        </Tabs>

        {/* Entries List */}
        {entries.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Today's Entries</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {entries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={entry.type === 'intake' ? 'default' : 'destructive'}>
                      {entry.type === 'intake' ? '+' : '-'}{entry.calories}
                    </Badge>
                    <span className="font-medium">{entry.description}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry(entry.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};