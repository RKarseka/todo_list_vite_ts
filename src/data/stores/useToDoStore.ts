import create, { State, StateCreator } from 'zustand';
import { ITask, IToDoStore } from '../interfaces';

function isToDoStorageUpdate(object: any): object is IToDoStore {
  return 'tasks' in object;
}

const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isToDoStorageUpdate(nextState)) {
          window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
        }
        set(nextState, ...args);
      },
      get,
      api
    );

export const useToDoStore = create<IToDoStore>(
  localStorageUpdate((set, get) => ({
    tasks: [],

    createTask: (title: string) => {
      const { tasks } = get();
      const maxId: number = tasks.reduce(
        (prev, item) => (prev > item.id ? prev : item.id) + 1,
        0
      );
      const newTask: ITask = {
        id: maxId,
        title,
        createdAt: Date.now(),
        completed: false,
      };

      set({ tasks: [newTask, ...tasks] });
    },

    updateTask: (id, title, completed) => {
      const { tasks } = get();

      set({
        tasks: tasks.map((task) => ({
          ...task,
          ...(id === undefined && {
            isEditing: false,
          }),
          ...(id === task.id && {
            title: title ? title : task.title,
            completed: completed !== undefined ? completed : task.completed,
          }),
        })),
      });
    },
    removeTask: (id: number) => {
      const { tasks } = get();
      set({
        tasks: [...tasks.filter((task) => task.id !== id)],
      });
    },
    loadTasks: (loadedTasks: ITask[]) => {
      set({ tasks: [...loadedTasks] });
    },
  }))
);
