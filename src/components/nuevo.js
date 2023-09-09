import { useState } from "react";
import Todo from "./todo";

import "./todoApp.css";

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredTodos, setFilteredTodos] = useState([]); // Estado para los elementos filtrados

  function handleInputChange(e) {
    setTitle(e.target.value);
  }

  // Resto del código...

  // Función para manejar la búsqueda
  function handleSearch(e) {
    setSearchTerm(e.target.value);

    // Filtra los elementos que coincidan con el término de búsqueda
    const filtered = todos.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredTodos(filtered);
  }

  return (
    <div className="todoContainer">
      <form onSubmit={handleSubmit} className="todoCreateForm">
        <input
          onChange={handleInputChange}
          value={title}
          className="todoInput"
        />
        <input value="Crear Actividad" type={"submit"} className="buttonCreate" />
      </form>

      {/* Agrega un campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={searchTerm}
        onChange={handleSearch}
        className="todoInput"
      />

      <div className="todosContainer">
        {/* Muestra la lista de tareas según los elementos filtrados si hay un término de búsqueda */}
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
