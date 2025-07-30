import { useState } from "react";
import "../styles/TodoApp.css";

const TodoApp = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  // ******** add an item ********

  const addTodo = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") {
      alert("You didn't type anything!");
      return;
    }

    const todo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
    };

    setTodos([...todos, todo]);
    setInputText("");
  };

  // ******** toggle check and uncheck ********

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ******** Progress Bar and details updates ********

  const completedNum = todos.filter((todo) => todo.completed).length;
  const total = todos.length;
  const progressPercentage = total > 0 ? (completedNum / total) * 100 : 0;

  // ******** delete an item ********

  const deleteItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ******** edit an item ********

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <main>
      <div className="details">
        <h1>Keep the Progress!</h1>
        <p>Get things done.</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="num-state">
        {completedNum} / {total}
      </div>

      <form>
        <input
          type="text"
          id="task-input"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          placeholder="Enter Your Task..."
        />
        <button onClick={addTodo}>Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* Edit mode */}
            {editingId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && saveEdit(todo.id)}
                />
                <div>
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              // Normal mode
              <>
                <div>
                  <button onClick={() => toggleTodo(todo.id)}>
                    <i
                      className={
                        todo.completed
                          ? "fa-solid fa-circle-check"
                          : "fa-regular fa-circle-check"
                      }
                    ></i>
                  </button>
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                </div>

                <div className="item-actions">
                  <button onClick={() => startEdit(todo)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => deleteItem(todo.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TodoApp;
