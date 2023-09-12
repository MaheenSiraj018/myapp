import React, { useEffect, useState } from 'react';
import Todoform from './Todoform';
import Todo from './Todo';
import Edittodoform from './Edittodoform';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const Todowrapper = () => {
    // var items=localStorage.getItem('todos');
    // const [todos, setTodos] = useState( items ? JSON.parse(items) :[] );

    const getitem = () => {
        const storeditems = localStorage.getItem('todos');
        if (storeditems) {
            var parsetodos = JSON.parse(storeditems);
            console.log("Items retrieved");
            return parsetodos;
        }
        else {
            return [];
        }

    }
    const [todos, setTodos] = useState(getitem);

    // useEffect(() => {
    //     const storedTodos = localStorage.getItem('todos');
    //     if (storedTodos) {
    //       // Parse the JSON string back to a JavaScript object
    //       var parsetodos=JSON.parse(storedTodos);
    //       console.log(parsetodos, 'hello')
    //     //   setTodos(JSON.parse(storedTodos));
    //     setTodos(parsetodos);
    //     }
    //     console.log("I am inside use effect");
    //   }, []); 


    useEffect(() => {
        console.log("Todos before addng items ", todos);
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log("Item Added to local storage");
    }, [todos]);

    useEffect(() => {
        if (editingTask) {
          editingTask.isEditing = false;
        }
      }, []);

    console.log(todos, 'todos')

    const addTodo = (todo) => {
        setTodos([
            ...todos,
            { id: uuidv4(), task: todo, completed: false, isEditing: false },
        ]);
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = id => {
        console.log("Id of task to be edited",id);
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    }
    console.log("Todos after edit todo",todos)

    const editTask = (task, id) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        ));
        console.log("Edit Task is being executed");
    }

    const removealltasks = () => {
        console.log("Clear local storage and remove all tasks");
        localStorage.setItem('todos', JSON.stringify([]));
        setTodos([]);
    }
   
    function findEditingTask() {
        const editingTodo = todos.find((todo) => todo.isEditing === true);
        if (editingTodo) {
            // editingTodo.isEditing=false;
            return { id: editingTodo.id, name: editingTodo.task, isEditing:editingTodo.isEditing };
        }
        return null;
    }

    const editingTask = findEditingTask();
    console.log("Editing Task ",editingTask);

    return (
        <div>
            <h1>Get Things Done!</h1>
            {todos.length > 0 ? (
                editingTask === null ? (
                    <Todoform
                        placeholdertext="Enter task for today"
                        addTodo={addTodo}
                        removealltasks={removealltasks}
                        buttonname="Add Task"
                        task={editingTask}
                    />
                ) : (
                    <Todoform
                        addTodo={addTodo}
                        removealltasks={removealltasks}
                        editTask={editTask}
                        task={editingTask}
                        buttonname="Update"
                    />
                )
            ) : (
                <Todoform
                    placeholdertext="Enter task for today"
                    addTodo={addTodo}
                    removealltasks={removealltasks}
                    buttonname="Add Task"
                    task={editingTask}
                />
            )}
            
            {/* <Todoform addTodo={addTodo} removealltasks={removealltasks}/> 
            if()
             { todos && todos?.length > 0 && todos.map((todo, index) => (
                todo.isEditing? (<Edittodoform editTodo={editTask} task={todo} />):(<Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>)
                
            ))} */}
            
            {todos && todos?.length > 0 && todos.map((todo, index) => (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />))}


        </div>
    )
}
export default Todowrapper;
