import React, { useState } from 'react';
import Todoform from './Todoform';
import Todo from './Todo';
import Edittodoform from './Edittodoform';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

function Todowrapper() {
    const [todos, setTodos] = useState([]);
    // const [edit, setEdit]=useState(null);

    const addTodo = (todo) => {
        setTodos([
            ...todos,
            { id: uuidv4(), task: todo, completed: false, isEditing: false },
        ]);
    }
    const toggleComplete=(id)=>{
        setTodos(todos.map(todo => todo.id===id ? { ...todo, completed: !todo.completed } : todo))

    }
    const deleteTodo =id=>{
        setTodos(todos.filter(todo => todo.id !==id))
    }
    const editTodo =id=>{
        setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
          );
        // const taskToEdit = todos.find((todo) => todo.id === id);
        // setEdit(taskToEdit);
    }
    const editTask =(task,id)=>{
        setTodos(todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      ));
    //   setEdit(null);
    }

    console.log(todos, 'TODOS');
    return (
        <div>
            <h1>Get Things Done!</h1>
            <Todoform addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing? (<Edittodoform editTodo={editTask} task={todo} />):(<Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>)
                
            ))}
            {/* {todos.map((todo,index)=>(<Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>)
                )} */}

        </div>
    )
}
export default Todowrapper;
