'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Calculator, 
  Flame, 
  Upload, 
  Lightbulb, 
  TrendingUp, 
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'overview', name: 'Overview', icon: Home },
  { id: 'bmi', name: 'BMI Calculator', icon: Calculator },
  { id: 'calories', name: 'Calorie Tracker', icon: Flame },
  { id: 'upload', name: 'Form Analysis', icon: Upload },
  { id: 'recommendations', name: 'Recommendations', icon: Lightbulb },
  { id: 'progress', name: 'Progress', icon: TrendingUp },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
      </div>
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 h-11',
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700'
                    : 'hover:bg-muted'
                )}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileOpen(false);
                }}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 bg-background border-r">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-16 bg-background border-r overflow-y-auto">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};