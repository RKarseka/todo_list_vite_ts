import { IMain, ITask } from '../../../data/interfaces';
import { InputPlus } from '../InputPlus';
import { MapTasks } from './map-tasks';

import styles from './main.module.scss';

export const Main: React.FC<IMain> = ({ tasks, createTask, ...props }) => {
  const complitedTasks: ITask[] = tasks.filter(
    (task) => task.completed === true
  );

  return (
    <main>
      <InputPlus
        onAdd={(title: string): void => {
          title && createTask(title);
        }}
      />
      {!tasks.length ? (
        <p className={styles.articleText}>There is no one task.</p>
      ) : (
        <>
          <section className={styles.Section}>
            <MapTasks
              tasks={tasks} //
              completed={false}
              {...props}
            />
          </section>
          <section className={styles.Section}>
            {complitedTasks.length > 0 && (
              <>
                <p
                  className={styles.articleText}
                >{`Completed: ${complitedTasks.length}`}</p>
                <MapTasks tasks={complitedTasks} completed {...props} />
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
};
