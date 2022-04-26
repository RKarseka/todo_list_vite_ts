import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

import checkIcon from './images/check.svg';
import { IInputTask } from '../../../data/interfaces';

export const InputTask: React.FC<IInputTask> = ({
  task,
  updateTask,
  removeTask,
}) => {
  const { id, title, completed } = task;

  const [value, setValue] = useState<string | undefined>(title);
  const [isEditing, setIsEditing] = useState(false);

  const onToggleEditMode = (withoutChanges?: boolean) => {
    if (withoutChanges) {
      setValue(title);
    } else {
      isEditing && title !== value && updateTask(id, value);
    }

    setIsEditing(!isEditing);
  };
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (isEditing && ref.current && !ref.current.contains(e.target)) {
        onToggleEditMode();
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [value]);

  return (
    <div className={styles.task} ref={ref}>
      <label className={styles.label} htmlFor={`Edit${id}`}>
        <input
          className={styles.checkbox}
          type="checkbox"
          disabled={isEditing}
          checked={completed}
          onChange={(evt) => updateTask(id, undefined, evt.target.checked)}
        />
        {isEditing ? (
          <input
            type="text"
            className={styles.input}
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
            onKeyDown={(evt) => {
              switch (evt.key) {
                case 'Enter':
                  onToggleEditMode();

                  break;
                case 'Escape':
                  onToggleEditMode(true);

                  break;

                default:
                  break;
              }
            }}
            autoFocus
          />
        ) : (
          <h3
            className={classNames(
              styles.title,
              completed && styles.titleCompleted
            )}
          >
            {title}
          </h3>
        )}
      </label>

      <button
        id={`Edit${id}`}
        aria-label="Edit"
        className={classNames(styles.btn, styles.btnEdit)}
        style={{
          backgroundImage: isEditing ? ` url(${checkIcon})` : ' ',
        }}
        onClick={() => {
          onToggleEditMode();
        }}
      />

      <button
        aria-label="Remove"
        className={classNames(styles.btn, styles.btnRemove)}
        onClick={() => {
          confirm('Are you sure?') && removeTask(id);
        }}
      />
    </div>
  );
};
