import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, AlertTriangle, Target } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    highPriority: number;
  };
}

export const TaskStats = ({ stats }: TaskStatsProps) => {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: Target,
      color: 'text-primary',
      bg: 'bg-gradient-primary',
      shadow: 'shadow-glow',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-success',
      bg: 'bg-gradient-success',
      shadow: 'shadow-shopping-glow',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-warning',
      bg: 'bg-gradient-warning',
      shadow: 'shadow-glow',
    },
    {
      title: 'High Priority',
      value: stats.highPriority,
      icon: AlertTriangle,
      color: 'text-destructive',
      bg: 'bg-gradient-to-r from-destructive to-red-600',
      shadow: 'shadow-glow',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => {
        const IconComponent = stat.icon;
        
        return (
          <Card key={stat.title} className={`glass-card hover:${stat.shadow} transition-smooth animate-float`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.shadow}`}>
                  <IconComponent className={`w-5 h-5 text-white`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};