export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'personal' | 'work' | 'shopping' | 'health';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'personal' | 'work' | 'shopping' | 'health';
  dueDate: string;
}