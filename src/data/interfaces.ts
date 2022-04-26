export interface ITask {
  id: number;
  createdAt?: number;
  completed?: boolean;
  title?: string;
  userId?: number;
  isEditing?: boolean;
}

interface IToDoStoreMethods {
  updateTask: (id?: number, title?: string, completed?: boolean) => void;
  removeTask: (id: number) => void;
}

interface ICreateTask {
  createTask: (title: string) => void;
}

export interface IMain extends IToDoStoreMethods, ICreateTask {
  tasks: ITask[];
}

export interface IMapTasks extends IToDoStoreMethods {
  tasks: ITask[];
  completed: boolean;
}

export interface IInputTask extends IToDoStoreMethods {
  task: ITask;
}

interface ILoadTasks {
  loadTasks: (loadedTasks: ITask[]) => void;
}

export interface IToDoStore extends IMain, ILoadTasks {}
