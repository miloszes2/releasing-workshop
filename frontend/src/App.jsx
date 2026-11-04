import { useState, useEffect } from "react";
import "./TodoApp.css";

const API_URL = "https://releasing-workshop-u1hx.onrender.com"; // zmień na swój adres API

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTodos() {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo(newTitle) {
    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    await loadTodos();
  }

  async function toggleTodo(id) {
    await fetch(`${API_URL}/todos/${id}`, { method: "PATCH" });
    await loadTodos();
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
    await loadTodos();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setTitle("");
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="todo-app">
      <h1>Lista zadań</h1>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nowe zadanie"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="todo-empty">Brak zadań</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.done ? "done" : ""}>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
