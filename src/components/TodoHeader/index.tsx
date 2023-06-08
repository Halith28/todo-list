import React from 'react';

type TodoHeaderType = {
  day: string;
  month: string;
};

const TodoHeader = (props: TodoHeaderType) => {
  const { day, month } = props;
  return (
    <h1>
      Today's schedule{' '}
      <small className="date_style">
        {day} {month}
      </small>
    </h1>
  );
};

export default TodoHeader;
