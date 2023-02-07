import React from "react";
import "./App.css";
const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");

    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    // Add the handlesubmit code here
    function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false,
        };
        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
            setTodo("");

        } else {

            alert("Enter Valid Task");
            setTodo("");
        }
    }

    // Add the deleteToDo code here

    function deleteToDo(id) {
        let up = [...todos].filter((todo) => todo.id !== id);

        setTodos(up)


    }

    // Add the toggleComplete code here

    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }


    // Add the submitEdits code here

    function submitEdits(id) {
        const updated = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;

            
           
        })

        setTodos(updated);
        setTodoEditing(null);        
    }

    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
          setTodos(loadedTodos);
        }
      }, []);
      React.useEffect(() => {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
      }, [todos]);


    return (
        <div className="App">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Add a new task"
                    value={todo}
                />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) => <div>
                <div>
                    {todo.text}
                </div>

                <div><input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} /></div>
                <div><button onClick={() => deleteToDo(todo.id)}>Delete</button></div>


                <div>
                    {todo.id === todoEditing ? (
                        <input type="text" onChange={(e) => setEditingText(e.target.value)} />
                    ) : (
                            <div>{todo.text}</div>
                        )}
                </div>
                <div className="todo-actions">
                    {todo.id === todoEditing ? (
                        <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                    ) : (
                            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                        )}
                </div>

            </div>)}
        </div>
    );
};
export default App;
