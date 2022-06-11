import {useState, useEffect, useRef} from 'react'

function ToDoForm({ addTask, defaultInput = ''}) {
    const [userInput, setUserInput] = useState(defaultInput)
    const buttonRef = useRef(null);

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }    
    
    const handleSubmit = (e) =>  {
        e.preventDefault()
        addTask(userInput)
        setUserInput("")
    }

    const handleKeyPress = (e)  => {
        if(e.key === "Enter") {
            handleSubmit(e)
        }
    }

    useEffect(() => {
        setUserInput(defaultInput)

        /* button dance */
        if (defaultInput.length) {
            buttonRef.current.style.color = 'red'
            buttonRef.current.textContent = 'обновить'
        } else { 
            buttonRef.current.style.color = '#fff'
            buttonRef.current.textContent  = 'сохранить'
        }

    }, [defaultInput])
    
    /* handleSubmit - обрабатывать Отправить */
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={userInput}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Ваше значение"
            />
            <button ref={buttonRef} type="submit">сохранить</button>
        </form>
    )
}

export default ToDoForm