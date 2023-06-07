import React, { useRef, useState } from 'react';
import './App.css';

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

type daysKey = {
  [key: string]: string | number;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');

  const date: Date = new Date();

  function ending(date: number | boolean): string {
    switch (date) {
      case date === 1 || date === 21 || date === 31:
        return 'st';
      case date === 2 || date === 22:
        return 'nd';
      case date === 3 || date === 23:
        return 'rd';
      default:
        return 'th';
    }
  }

  const getEnding = ending(date.getDate());

  const days: daysKey = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = `${
    days[date.getDay()]
  }, ${date.getDate()}${getEnding}`.toString();
  const month = monthNames[date.getMonth()];

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // check if the value is empty
    if (task.trim().length === 0) {
      alert('Please enter a value!');
      return;
    }

    // create a new todo
    const todo: Todo = {
      id: Date.now(),
      task: task,
      isCompleted: false,
    };

    // add todo to the state
    setTodos([todo, ...todos]);

    // clear the value of task
    setTask('');
  };

  const handleChangeChecked = (todo: Todo) => {
    // index of the todo
    const index = todos.indexOf(todo);

    // change todo completed status
    todo.isCompleted = !todo.isCompleted;

    // then we need to replace it with one in todos
    todos.splice(index, 1, todo);

    // update the state
    setTodos([...todos]);
  };

  const handleDelete = (id: number) => {
    // find index of todo from id
    const index = todos.findIndex((todo) => todo.id === id);

    // remove todo
    todos.splice(index, 1);

    // update the state
    setTodos([...todos]);
  };

  const dragItem = useRef(0);
  const dragOverItem = useRef(0);

  const dragStart = (position: number) => {
    // set current value in dragItem
    dragItem.current = position;
  };

  const dragEnter = (position: number) => {
    // set current value in dragOverItem
    dragOverItem.current = position;
  };

  const drop = () => {
    const copyListItems = [...todos];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = -1;
    dragOverItem.current = -1;
    setTodos(copyListItems);
  };

  return (
    <div className="container">
      <div className="box">
        <h1>
          Today's schedule{' '}
          <small className="date_style">
            {day} {month}
          </small>
        </h1>
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
        <ul className="list">
          {todos.length ? (
            todos.map((todo, index) => (
              <div
                className="todo-list"
                key={index}
                onDragStart={() => dragStart(index)}
                onDragEnter={() => dragEnter(index)}
                onDragEnd={drop}
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
        <div className="footer">
          <div>Total Todos : {todos.length}</div>
          <div>
            Completed : {todos.filter((item) => item?.isCompleted).length}
          </div>
          <div>
            Pending : {todos.filter((item) => !item?.isCompleted).length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
