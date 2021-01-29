import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan} from '@fortawesome/free-solid-svg-icons'

import './Task.css'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../../store/tasks'

const Task = ({task}) => {
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault()
        dispatch(deleteTask(task.id))
    }
    return (
        <div className='task-container' >
            <div className='task-content'>
                <div className='task-content-left'>
                    <input type='checkbox' className='task-checkbox'></input>
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