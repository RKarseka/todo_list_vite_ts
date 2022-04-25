import create from 'zustand';

export interface Task {
  id: number;
  createdAt?: number;
  completed?: boolean;
  title?: string;
  userId?: number;
}

export interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: number, title: string) => void;
  removeTask: (id: number) => void;
  loadTasks: (loadedTasks: Task[]) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
  tasks: [],
  createTask: (title: string) => {
    const { tasks } = get();
    const maxId = tasks.reduce(
      (prev, item) => (prev > item.id ? prev : item.id) + 1,
      0
    );
    const newTask = { id: maxId, title, createdAt: Date.now() };

    set({ tasks: [newTask, ...tasks] });
  },

  updateTask: (id: number, title: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      })),
    });
  },
  removeTask: (id: number) => {
    const { tasks } = get();
    set({
      tasks: [...tasks.filter((task) => task.id !== id)],
    });
  },
  loadTasks: (loadedTasks: Task[]) => {
    set({ tasks: [...loadedTasks] });
  },
}));
