import React from 'react';
import { TodoType } from '../../App.type';

type TodoListType = {
  todos: TodoType[];
  dragStart: (param: number) => void;
  dragEnter: (param: number) => void;
  handleChangeChecked: (param: TodoType) => void;
  handleDelete: (param: number) => void;
  dropItem: () => void;
};

const TodoList = (props: TodoListType) => {
  const {
    todos,
    dragStart,
    dragEnter,
    dropItem,
    handleChangeChecked,
    handleDelete,
  } = props;
  return (
    <ul className="list">
      {todos.length ? (
        todos.map((todo, index) => (
          <div
            className="todo-list"
            key={index}
            onDragStart={() => dragStart(index)}
            onDragEnter={() => dragEnter(index)}
            onDragEnd={dropItem}
            onDragOver={(e) => e.preventDefault()}
            draggable
          >
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleChangeChecked(todo)}
            />
            <div
              className={
                todo.isCompleted
                  ? `todo-wrapper completed_todo`
                  : `todo-wrapper`
              }
            >
              <span>{todo.task}</span>
              <i
                className="fas fa-trash"
                onClick={() => handleDelete(todo.id)}
              ></i>
            </div>
          </div>
        ))
      ) : (
        <small className="empty-list">Todo list is empty </small>
      )}
    </ul>
  );
};

export default TodoList;
