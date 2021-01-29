import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createTask } from '../../../store/tasks';
import './TaskForm.css'
const TaskForm = ({storyId}) => {
    console.log(storyId)
    const dispatch = useDispatch();
    const[name, setName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTask(name, storyId))
        setName('')
    }

    return (
        <div className='taskform-container'>
            <input className='taskform-input' value={name} onChange={(e) => setName(e.target.value) }type='text' placeholder='Add a task'></input>
            <button className='taskform-add' onClick={onSubmit}>Add</button>
        </div>
    )
}
export default TaskForm