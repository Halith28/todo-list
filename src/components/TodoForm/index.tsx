import React from 'react';

type TodoFormType = {
  task: string;
  handleFormSubmit: (event: React.FormEvent) => void;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoForm = (props: TodoFormType) => {
  const { task, handleFormSubmit, handleInput } = props;
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="task"
        value={task}
        onChange={handleInput}
        className="form-input"
      />
      <button type="submit" className="form-button">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
