import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Trash2, Edit3 } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-muted text-muted-foreground border-muted',
  medium: 'bg-gradient-warning text-warning-foreground border-warning shadow-glow',
  high: 'bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground border-destructive shadow-glow',
};

const categoryColors = {
  personal: 'bg-gradient-personal text-personal-foreground border-personal shadow-personal-glow',
  work: 'bg-gradient-work text-work-foreground border-work shadow-work-glow',
  shopping: 'bg-gradient-shopping text-shopping-foreground border-shopping shadow-shopping-glow',
  health: 'bg-gradient-health text-health-foreground border-health shadow-health-glow',
};

export const TaskCard = ({ task, onToggle, onDelete, onEdit }: TaskCardProps) => {
  return (
    <div className={`glass-card transition-smooth hover:shadow-glow ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1"
        />
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge className={priorityColors[task.priority]} variant="secondary">
                {task.priority}
              </Badge>
              <Badge className={categoryColors[task.category]} variant="secondary">
                {task.category}
              </Badge>
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Created {format(task.createdAt, 'MMM dd')}</span>
            </div>
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Due {format(task.dueDate, 'MMM dd')}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};