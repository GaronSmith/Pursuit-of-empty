import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../../store/tasks';
import Task from '../Task';
import TaskForm from '../TaskForm';
import './StoryForm.css'

const StoryForm = ({story}) => {
    const [progress, setProgress] = useState(story.progress)
    const [name, setName] = useState(story.name)
    const [description, setDescription] = useState(story.description)
    const [points, setPoints] = useState(story.points)
    const [code, setCode] = useState(story.code)
    
    const tasks = useSelector(state => state.tasks)
    
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getTasks(story.id))
    }, [dispatch])
    return (
        <form className='form__story'>
            <div className='form__content-container'>
                <h3 className='form__title'>Story: {story.name}</h3>
            </div>
            <div className='form__input-container'>
                <label className='form-label'>
                   Name
                </label>
                <input
                    required
                    className="form__input-container--text"
                    type="text" value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={name}
                /> 
            </div>
            <div className='form__input-container'>
                <label className='form-label'>
                    Progress
                </label>
                <select className='form__input-container--dropdown'
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}>
                    <option value={null}>Not Started</option>
                    <option value='Start'>Started</option>
                    <option value='Complete'>Completed</option>
                    <option value={4}>4 - extremely difficult</option>
                </select>
            </div>
            <div className='form__input-container'>
                <label className='form-label'>
                    Description
                </label>
                <textarea
                    value={description}
                    className="form__input-container--textarea"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={description}
                    required
                />
            </div>
            <div className='form__input-container'>
                <label className='form-label'>
                    Please estimate points
                </label>
                <select className= 'form__input-container--dropdown' 
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}>
                    <option value={1}>1 - easy</option>
                    <option value={2}>2 - medium</option>
                    <option value={3}>3 - hard</option>
                    <option value={4}>4 - extremely difficult</option>
                </select>
            </div>
            <div className='form__input-container'>
                <label className='form-label'>
                    Link to your pull request
                </label>
                <input
                    required
                    className="form__input-container--text"
                    type="text" value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder={code}
                />
            </div>
            <div className='task-container'>
                <div className='task-header'>
                    <label className='form-label'>Tasks</label>
                </div>
                {Object.keys(tasks).map(key => {
                    return <Task key={key} task={tasks[key]} />
                })}
                <TaskForm storyId={story.id}/>
            </div>
        </form>
    )
}

export default StoryForm