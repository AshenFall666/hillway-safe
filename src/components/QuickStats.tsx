import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const stats: StatCard[] = [
  {
    title: 'Active Reporters',
    value: '247',
    description: 'Drivers online now',
    icon: <Users className="w-4 h-4" />,
    trend: 'up'
  },
  {
    title: 'Hazards Today',
    value: '12',
    description: 'Reports in last 24h',
    icon: <AlertTriangle className="w-4 h-4" />,
    trend: 'down'
  },
  {
    title: 'Avg Response',
    value: '3.2min',
    description: 'Alert to community',
    icon: <Clock className="w-4 h-4" />,
    trend: 'up'
  },
  {
    title: 'Safety Score',
    value: '87%',
    description: 'Current route safety',
    icon: <TrendingUp className="w-4 h-4" />,
    trend: 'up'
  }
];

export function QuickStats() {
  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-accent';
      case 'down': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-soft">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">
                {stat.icon}
              </div>
              {stat.trend && (
                <div className={`text-xs font-medium ${getTrendColor(stat.trend)}`}>
                  {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
              <CardDescription className="text-xs">{stat.description}</CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}