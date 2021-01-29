import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan} from '@fortawesome/free-solid-svg-icons'

import './Task.css'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../../../store/tasks'
import { useState } from 'react'

const Task = ({task}) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    const onClick = (e) => {
        e.preventDefault()
        dispatch(deleteTask(task.id))
    }
    const handleCheck =(e) => {
        e.preventDefault()
        setChecked(!e.target.value)
        const newTask = {
            ...task,
            completed:checked
        }
        console.log(newTask)
        // dispatch(updateTask(newTask))
    }
    return (
        <div className='task-container' >
            <div className='task-content'>
                <div className='task-content-left'>
                    <input 
                    type='checkbox' 
                    className='task-checkbox'
                    value={checked}
                    onChange={handleCheck}
                    checked={checked === true}
                    ></input>
                    <p className='task-name'>{task.name}</p>
                </div>
                <div className='task-content-right'>
                    <button onClick={onClick} className='delete'>
                        <FontAwesomeIcon icon={faBan} />
                    </button>
                </div>
                
            </div>
        </div>

    )
}

export default Task