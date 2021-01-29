import { useDispatch } from 'react-redux'
import './TaskForm.css'
const TaskForm = ({storyId}) => {
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmit} className='taskform-container'>
            <input className='taskform-input' type='text' placeholder='Add a task'></input>
            <button className='taskform-add' type='submit'>Add</button>
        </form>
    )
}
export default TaskForm