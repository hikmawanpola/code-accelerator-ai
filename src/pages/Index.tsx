import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Filter, CheckSquare, Sparkles } from 'lucide-react';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { TaskStats } from '@/components/TaskStats';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskFormData } from '@/types/task';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { tasks, createTask, updateTaskFromForm, deleteTask, toggleTask, getTasksByCategory, getTaskStats } = useTasks();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCreateTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTaskFromForm(editingTask.id, taskData);
      toast({
        title: "Task Updated",
        description: "Your task has been updated successfully.",
      });
      setEditingTask(null);
    } else {
      createTask(taskData);
      toast({
        title: "Task Created",
        description: "Your new task has been added successfully.",
      });
    }
    setIsFormOpen(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: "Task Deleted",
      description: "The task has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleToggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    toggleTask(id);
    toast({
      title: task?.completed ? "Task Reopened" : "Task Completed",
      description: task?.completed ? "Task marked as pending." : "Great job completing this task!",
    });
  };

  const filteredTasks = tasks
    .filter(task => {
      if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;
      if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (a.priority !== b.priority) {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const stats = getTaskStats();

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-float">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
              <CheckSquare className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Taskify
            </h1>
            <Sparkles className="w-8 h-8 text-primary animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground">
            Beautiful task management made simple
          </p>
        </div>

        {/* Stats */}
        <TaskStats stats={stats} />

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 glass rounded-md border border-input text-sm"
            >
              <option value="all">All Categories</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-6">
          {filteredTasks.length === 0 ? (
            <Card className="glass-card text-center py-12">
              <CardContent>
                <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filter.'
                    : 'Create your first task to get started!'
                  }
                </p>
                {!searchTerm && selectedCategory === 'all' && (
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-gradient-primary hover:opacity-90 transition-smooth"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          editingTask={editingTask}
          onSubmit={handleCreateTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
      </div>
    </div>
  );
};

export default Index;
