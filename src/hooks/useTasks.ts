import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/types/task';

const STORAGE_KEY = 'taskify-tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
      setTasks(parsedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (taskData: TaskFormData): Task => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      priority: taskData.priority,
      category: taskData.category,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
    };

    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const updateTaskFromForm = (id: string, formData: TaskFormData) => {
    const updates: Partial<Task> = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      category: formData.category,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      updatedAt: new Date(),
    };
    
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  const getTasksByCategory = (category: string) => {
    return tasks.filter(task => task.category === category);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length;

    return { total, completed, pending, highPriority };
  };

  return {
    tasks,
    createTask,
    updateTask,
    updateTaskFromForm,
    deleteTask,
    toggleTask,
    getTasksByCategory,
    getTaskStats,
  };
};