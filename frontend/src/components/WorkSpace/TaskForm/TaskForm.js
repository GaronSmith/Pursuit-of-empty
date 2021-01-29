import './TaskForm.css'
const TaskForm = () => {
    return (
        <div className='taskform-container'>
            <input className='taskform-input' type='text' placeholder='Add a task'></input>
            <button className='taskform-add' type='submit'>Add</button>

        </div>
    )
}
export default TaskForm