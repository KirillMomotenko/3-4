import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TodoList from "/src/components/TodoList";
import "/src/App.css";
function TodoPage() {
  // Инициализация задач из LocalStorage или пустого массива
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  // Сохраняем задачи в LocalStorage при каждом изменении массива todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    return true;
  });

  return (
    <div>
      <h1>My To-Do List</h1>
      <Link to="/Lab3-4/dnd">Перейти на страницу DnD</Link>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
        />
        <button type="submit">Add</button>
      </form>

      {/* Кнопки фильтрации */}
      <div>
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("completed")}>Выполненные</button>
        <button onClick={() => setFilter("uncompleted")}>Невыполненные</button>
      </div>

      {/* Список задач с возможностью удаления */}
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
export default TodoPage;
