export default function Todo(props) {
    const { awesometodos, setTodos } = props;

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/awesometodos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        };
    };
    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/awesometodos/${todoId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
            });
        };
    };
    return (
        <div className="awesometodos">
            <p className={awesometodos.status ? "awesometodos--completed" : ""}>{awesometodos.todo}</p>
            <div className="mutations">
                <button className="awesometodos__status"
                    onClick={() => updateTodo(awesometodos._id, awesometodos.status)}>
                    {(awesometodos.status) ? "☑" : "☐"}
                </button>
                <button className="awesometodos__delete"
                    onClick={() => deleteTodo(awesometodos._id)}>
                    🗑
                </button>
            </div>
        </div>
    );
}
