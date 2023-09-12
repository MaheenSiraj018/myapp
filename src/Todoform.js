import React, {useState,useEffect} from 'react';

function Todoform({addTodo,removealltasks,buttonname,placeholdertext="",task,editTask}) {
    
    const [value,setValue]=useState("");

    useEffect(() => {
        if (task !== null) {
          setValue(task.name);
        } else {
          setValue('');
        }
      }, [task]);

    const error=(message)=>
            {document.getElementById('error').innerHTML=message;}

    const handlesubmit =(e)=>{
        console.log("Handling Submit");
        e.preventDefault();
        if(task!==null){
            console.log("If task is not equal to null, execute this");
            editTask(value,task.id);
        }
        else{
            if(value!==''){
                error("");
                addTodo(value);
            }
            else{
                
                error("Error! Please input task first.");
            }
        }
        setValue('');
        
    }
    return (
        <form className='Todoform' onSubmit={handlesubmit}>
            <input type='text' value={value}  className='todoinput' placeholder={placeholdertext}
            onChange={(e) =>
             {setValue(e.target.value);}}/>
             
            <button type='submit' className='todobtn'>{buttonname}</button>
            <button type="button" className='todobtn' onClick={() =>
             removealltasks()}>Remove All Tasks</button>
            <p id="error"></p>
        </form>
    )
}
export default Todoform;