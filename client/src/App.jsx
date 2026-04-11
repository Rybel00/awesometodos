import { useEffect, useState } from "react";
import Todo from "./todo";

export default function App() {
  // State to store the list of todos
  const [todoList, setTodoList] = useState([]);

  // State to store the current input value
  const [newTodoContent, setNewTodoContent] = useState("");

  /**
   * Fetch all todos from the server when the component mounts
   */
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const result = await response.json();

        // Ensure the response contains a todos array
        if (result.todos) {
          setTodoList(result.todos);
        } else {
          console.error("Failed to fetch todos:", result);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  /**
   * Handle form submission to create a new todo
   */
  const handleCreateTodo = async (event) => {
    event.preventDefault();

    // Only allow todos with more than 3 characters
    if (newTodoContent.length > 3) {
      try {
        const response = await fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify({ todo: newTodoContent }),
          headers: {
            "content-type": "application/json",
          },
        });

        const createdTodo = await response.json();
        console.log("New todo added:", createdTodo);

        // Clear input field after submission
        setNewTodoContent("");

        // Add the newly created todo to the existing list
        setTodoList([...todoList, createdTodo]);
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>

      {/* Form to create a new todo */}
      <form className="form" onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newTodoContent}
          onChange={(event) => setNewTodoContent(event.target.value)}
          placeholder="Enter a new todo..."
          className="form__input"
          required
        />
        <button type="submit" className="form__button">
          Create todos
        </button>
      </form>

      {/* Display list of todos */}
      <div className="todos">
        {todoList.length > 0 &&
          todoList.map((todoItem) => (
            <Todo
              key={todoItem._id}
              todo={todoItem}
              setTodos={setTodoList}
            />
          ))}
      </div>
    </main>
  );
}
