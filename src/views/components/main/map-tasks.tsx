import { IMapTasks } from '../../../data/interfaces';
import { InputTask } from '../InputTask';

export const MapTasks: React.FC<IMapTasks> = ({
  tasks,
  completed,
  ...props
}) => {
  return (
    <>
      {tasks.map(
        (task) =>
          completed === task.completed && (
            <InputTask key={task.id} task={task} {...props} />
          )
      )}
    </>
  );
};
