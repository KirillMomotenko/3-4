import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-item">
     <button className="delete" onClick={() => deleteTodo(todo.id)}>
        Удалить
      </button>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.title}</span>
    </div>
  );
}

export default TodoItem;
