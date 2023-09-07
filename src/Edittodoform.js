import React, {useState} from 'react';

function Edittodoform({editTodo,task}) {
    
    const [value,setValue]=useState(task.task);

    const handlesubmit =(e)=>{
        e.preventDefault();
        editTodo(value,task.id);
        setValue('');
    }
    return (
        <form className='Todoform' onSubmit={handlesubmit}>
            <input type='text' value={value}  className='todoinput' placeholder='Update Task' 
            onChange={(e) => setValue(e.target.value)}/>
            <button type='submit' className='todobtn'>Edit Task</button>
        </form>
    )
}
export default Edittodoform;