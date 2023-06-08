import React from 'react';
import { TodoType } from '../../App.type';

type TodoFooterType = {
  todos: TodoType[];
};

const TodoFooter = ({ todos }: TodoFooterType) => {
  const completedCount = todos.filter((item) => item?.isCompleted).length;
  const pendingCount = todos.filter((item) => !item?.isCompleted).length;
  return (
    <div className="footer">
      <div>Total Todos : {todos.length}</div>
      <div>Completed : {completedCount}</div>
      <div>Pending : {pendingCount}</div>
    </div>
  );
};

export default TodoFooter;
