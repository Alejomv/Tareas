import { useState } from "react";
import Todo from "./todo";  // Asumo que este componente ya existe y funciona como se espera
import "./todoApp.css";

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Debes ingresar el nombre de la tarea.");
      return;
    }

    const existingTodo = todos.find(
      (item) => item.title.toLowerCase() === title.toLowerCase()
    );

    if (existingTodo) {
      alert("Una tarea con este nombre ya existe.");
      setTitle("");
    } else {
      const newTodo = {
        id: Date.now(),
        title: title,
        completed: false,
      };
      
      setTodos([newTodo, ...todos]);
      setTitle("");
    }
  }

  function handleDelete(id) {
    const tempTodos = todos.filter((item) => item.id !== id);
    setTodos([...tempTodos]);
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos([...temp]);
  }

  function handleCheckboxChange(id, status) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.completed = status;
    setTodos([...temp]);
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value);

    const filtered = todos.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTodos(filtered);
  }

  return (
    <div className="todoContainer">
      {/* Formulario para crear una nueva tarea */}
      <form onSubmit={handleSubmit} className="todoCreateForm">
        <div className="form-group">
          <input
            onChange={handleTitleChange}
            value={title}
            className="todoInput"
            placeholder="Crear tarea..."
          />
          <button type="submit" className="buttonCreate">
            Crear
          </button>
        </div>
      </form>

      {/* Caja de texto para la búsqueda */}
      <div className="searchBox">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          className="searchInput"
        />
      </div>

      <div className="todosContainer">
        {(searchTerm ? filteredTodos : todos).map((item) => (
          <Todo
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onComplete={handleCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
}
