import { useCallback, useState } from 'react';
import styles from './index.module.scss';

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    setInputValue(evt.target.value);
  };

  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue('');
  }, [inputValue]);

  return (
    <div className={styles.InputPlus}>
      <input
        type="text"
        className={styles.InputPlusInput}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            addTask();
          }
        }}
      />
      <button
        onClick={addTask}
        aria-label="Add"
        className={styles.InputPlusBtn}
      />
    </div>
  );
};
