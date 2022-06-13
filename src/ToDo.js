import {useState, useReducer} from 'react'
import ToDoCalendar from './ToDoCalendar'

function reducerCalendar(stateCalendar, action) {
    switch (action.type) {
      case 'clickCalendar':
        return {isOpen: !stateCalendar.isOpen};
      default:
        throw new Error();
    }
}

/* переписать на useReducer */
function ToDo({todo, toggleTask, removeTask, updateTask, sortTask, dateTask}) {
    const [stateCalendar, dispatchCalendar] = useReducer(reducerCalendar, {isOpen: false});    

    console.log(stateCalendar.isOpen);
    return (
        <>
            <div key={todo.id} className="item-todo">
                <div className="item-date"
                onClick={()=>{
                    dispatchCalendar({type: 'clickCalendar'})
                }}>
                    &#8986;
                </div>
                <div 
                    className={todo.complete ? "item-text strike" : "item-text"}
                    onClick={() => toggleTask(todo.id)}>
                    {todo.task}
                </div>
                <div className="item-delete" onClick={() => removeTask(todo.id)}>
                    &#10006;
                </div>
                <div className="item-update" onClick={()=>updateTask(todo.id)}>               	
                    &#128393;
                </div>
                <div className="item-up" onClick={()=>sortTask(todo.id, 'up')}>&#9650;</div>
                <div className="item-down" onClick={()=>sortTask(todo.id, 'down')}>&#9660;</div>
            </div>

            {stateCalendar.isOpen && <ToDoCalendar key={`c_${todo.id}`} idCal={todo.id} dateTask={dateTask}/>}
        </>
    )
}

export default ToDo