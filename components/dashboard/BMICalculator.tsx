'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calculator, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);

  const calculateBMI = () => {
    const heightInM = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInM > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInM * heightInM);
      setBMI(parseFloat(bmiValue.toFixed(1)));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', icon: AlertCircle };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600', icon: CheckCircle };
    if (bmi < 30) return { category: 'Overweight', color: 'text-orange-600', icon: AlertCircle };
    return { category: 'Obese', color: 'text-red-600', icon: AlertCircle };
  };

  const getBMIProgress = (bmi: number) => {
    return Math.min((bmi / 40) * 100, 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          BMI Calculator
        </CardTitle>
        <CardDescription>
          Calculate your Body Mass Index and get health insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g., 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          onClick={calculateBMI} 
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
          disabled={!height || !weight}
        >
          <Activity className="mr-2 h-4 w-4" />
          Calculate BMI
        </Button>
        
        {bmi && (
          <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{bmi}</div>
              <div className="flex items-center justify-center gap-2">
                {(() => {
                  const { category, color, icon: Icon } = getBMICategory(bmi);
                  return (
                    <>
                      <Icon className={`h-5 w-5 ${color}`} />
                      <span className={`font-semibold ${color}`}>{category}</span>
                    </>
                  );
                })()}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>BMI Scale</span>
                <span>{bmi}/40</span>
              </div>
              <Progress value={getBMIProgress(bmi)} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground text-center">
              <p>BMI is a useful measure of overweight and obesity, but consult your healthcare provider for personalized advice.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};