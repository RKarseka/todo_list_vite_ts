import styles from './index.module.scss';

import { useEffect } from 'react';

import { useToDoStore } from '../../data/stores/useToDoStore';
import { Main } from '../components/main';
import { axiosGet } from '../../data/helpers';

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask, loadTasks] = useToDoStore(
    (state) => [
      state.tasks,
      state.createTask,
      state.updateTask,
      state.removeTask,
      state.loadTasks,
    ]
  );

  const getCurrentState = () => {
    try {
      const currentState = JSON.parse(
        window.localStorage.getItem('tasks') || ''
      );
      return currentState;
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        loadTasks(await (getCurrentState() || axiosGet()));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log('render');

  return (
    <div
      className={styles.wrapper}
      // onClick={onClickOutOfForm}
    >
      <article className={styles.article}>
        <h1 className={styles.articleTitle}>To Do App</h1>

        <Main
          tasks={tasks}
          createTask={createTask}
          updateTask={updateTask}
          removeTask={removeTask}
        />
      </article>
    </div>
  );
};
