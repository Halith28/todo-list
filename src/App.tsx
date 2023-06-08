import React, { useRef, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoFooter from './components/Footer';
import TodoList from './components/TodoList';
import { TodoType } from './App.type';
import TodoHeader from './components/TodoHeader';
import { days, monthNames } from './App.constants';

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [task, setTask] = useState<string>('');

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
    const todo: TodoType = {
      id: Date.now(),
      task: task,
      isCompleted: false,
    };

    // add todo to the state
    setTodos([todo, ...todos]);

    // clear the value of task
    setTask('');
  };

  const handleChangeChecked = (todo: TodoType) => {
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

  const dropItem = () => {
    const copyListItems = [...todos];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = -1;
    dragOverItem.current = -1;
    setTodos(copyListItems);
  };

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

  const day = `${
    days[date.getDay()]
  }, ${date.getDate()}${getEnding}`.toString();
  const month = monthNames[date.getMonth()];

  return (
    <div className="container">
      <div className="box">
        <TodoHeader day={day} month={month} />
        <TodoForm
          task={task}
          handleInput={handleInput}
          handleFormSubmit={handleFormSubmit}
        />
        <TodoList
          todos={todos}
          dragStart={dragStart}
          dragEnter={dragEnter}
          dropItem={dropItem}
          handleChangeChecked={handleChangeChecked}
          handleDelete={handleDelete}
        />
        <TodoFooter todos={todos} />
      </div>
    </div>
  );
}

export default App;
