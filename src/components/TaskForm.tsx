import { useState } from 'react';
import { TaskFormData, Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
  onCancel: () => void;
  editingTask?: Task | null;
  isOpen: boolean;
}

export const TaskForm = ({ onSubmit, onCancel, editingTask, isOpen }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: editingTask?.title || '',
    description: editingTask?.description || '',
    priority: editingTask?.priority || 'medium',
    category: editingTask?.category || 'personal',
    dueDate: editingTask?.dueDate ? editingTask.dueDate.toISOString().split('T')[0] : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: 'personal',
      dueDate: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass w-full max-w-md animate-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="bg-gradient-primary bg-clip-text text-transparent">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title..."
                className="glass"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter task description..."
                className="glass resize-none"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') =>
                    setFormData(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: 'personal' | 'work' | 'shopping' | 'health') =>
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date (Optional)</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="glass"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary hover:opacity-90 transition-smooth"
              >
                <Plus className="w-4 h-4 mr-2" />
                {editingTask ? 'Update Task' : 'Create Task'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                className="px-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};