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
            buttonRef.current.style.background = 'linear-gradient(to right, #e100ff, #7f00ff)'
            buttonRef.current.textContent = 'обновить'
        } else { 
            buttonRef.current.style.background = 'linear-gradient(to right, #7f00ff, #e100ff)'
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