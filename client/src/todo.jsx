export default function Todo(props) {
  // Pull out the todo item and the function to update the list
  const { todo: todoItem, setTodos: updateTodoList } = props;

  /**
   * Toggle the status of a todo (completed ↔ not completed)
   */
  const handleToggleTodoStatus = async (todoId, currentStatus) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ status: currentStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // If the update worked on the backend, reflect the change in the UI
    if (result.acknowledged) {
      updateTodoList((currentTodos) => {
        return currentTodos.map((existingTodo) => {
          // Flip the status of the matching todo
          if (existingTodo._id === todoId) {
            return {
              ...existingTodo,
              status: !existingTodo.status,
            };
          }
          return existingTodo;
        });
      });
    }
  };

  /**
   * Remove a todo from both the backend and the UI
   */
  const handleDeleteTodo = async (todoId) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // If deletion was successful, remove it from the list in the UI
    if (result.acknowledged) {
      updateTodoList((currentTodos) => {
        return currentTodos.filter(
          (existingTodo) => existingTodo._id !== todoId
        );
      });
    }
  };

  return (
    <div className="todo">
      {/* Show the todo text, and style it differently if it's completed */}
      <p className={todoItem.status ? "todo--completed" : ""}>
        {todoItem.todo}
      </p>

      {/* Action buttons for updating or deleting the todo */}
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() =>
            handleToggleTodoStatus(todoItem._id, todoItem.status)
          }
        >
          {todoItem.status ? "☑" : "☐"}
        </button>

        <button
          className="todo__delete"
          onClick={() => handleDeleteTodo(todoItem._id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}
