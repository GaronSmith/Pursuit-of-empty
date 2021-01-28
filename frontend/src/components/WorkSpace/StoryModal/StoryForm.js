import { useState } from 'react'
import './StoryForm.css'

const StoryForm = ({story}) => {
    const [progress, setProgress] = useState(story.progress)
    const [name, setName] = useState(story.name)
    const [description, setDescription] = useState(story.description)
    const [points, setPoints] = useState(story.points)
    const [code, setCode] = useState(story.code)
    return (
        <form className='form__story'>
            <div className='form__content-container'>
                <h3 className='form__title'>{story.name}</h3>
            </div>
            <div className='form__input-container'>
                <input
                    required
                    className="form__input-container--text"
                    type="text" value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={name}
                /> 
            </div>
            <div className='form__input-container'>
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
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            <div className='form__input-container'>
                <input
                    required
                    className="form__input-container--text"
                    type="text" value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder={code}
                />
            </div>
        </form>
    )
}

export default StoryForm