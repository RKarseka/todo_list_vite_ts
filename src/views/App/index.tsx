import styles from './index.module.scss';

import axios from 'axios';
import { Task, useToDoStore } from '../../data/stores/useToDoStore';
import { useEffect } from 'react';
import { InputPlus } from '../components/InputPlus';

const PATH = 'https://jsonplaceholder.typicode.com/todos';

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

  useEffect(() => {
    (async () => {
      try {
        await axios.get(`${PATH}?_limit=6`).then(({ data }) => loadTasks(data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(tasks);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            title && createTask(title);
          }}
        />
      </section>
      <section className={styles.articleSection}></section>
      index
    </article>
  );
};
