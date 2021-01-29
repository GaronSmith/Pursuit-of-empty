import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan} from '@fortawesome/free-solid-svg-icons'

import './Task.css'

const Task = ({task}) => {
    return (
        <div className='task-container' >
            <div className='task-header'>
                <label className='form-label'>Tasks</label>
            </div>
            <div className='task-content'>
                <div className='task-content-left'>
                    <input type='checkbox' className='task-checkbox'></input>
                    <p className='task-name'>{task.name}</p>
                </div>
                <div className='task-content-right'>
                    <button className='delete'>
                        <FontAwesomeIcon icon={faBan} />
                    </button>
                </div>
                
            </div>
        </div>

    )
}

export default Task