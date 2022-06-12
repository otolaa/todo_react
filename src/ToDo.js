function ToDo({todo, toggleTask, removeTask, updateTask, sortTask, dateTask}) {
    return (
        <div key={todo.id} className="item-todo">
            <div className="item-date"  onClick={()=>dateTask(todo.id)}>
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
    )
}

export default ToDo