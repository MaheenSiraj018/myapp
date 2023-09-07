import React, {useState} from 'react';

function Todoform({addTodo}) {
    
    const [value,setValue]=useState("");

    const error=(message)=>
            {document.getElementById('error').innerHTML=message;}

    const handlesubmit =(e)=>{
        e.preventDefault();
       
            if(value!==''){
                error("");
                addTodo(value);
            }
            else{
                
                error("Error! Please input task first.");
            }
        
        setValue('');
        
    }
    return (
        <form className='Todoform' onSubmit={handlesubmit}>
            <input type='text' value={value}  className='todoinput' placeholder='Enter task for today' 
            onChange={(e) => setValue(e.target.value)}/>
            <button type='submit' className='todobtn'>Add Task</button>
            <p id="error"></p>
        </form>
    )
}
export default Todoform;