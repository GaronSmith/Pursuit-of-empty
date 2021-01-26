import { useState } from 'react';
import { DateRangePicker } from 'react-date-range'
import { useDispatch, useSelector } from 'react-redux';

import './CreateProjectForm.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import {projectCreate} from '../../store/project'


const CreateProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const selectionRange = {
        startDate,
        endDate,
        key: 'selection'
    }
 

    const onSelection = (dates) => {
        setStartDate(dates.selection.startDate)
        setEndDate(dates.selection.endDate)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        return dispatch(projectCreate({ sessionUser, name, description,startDate,endDate})).catch(
            (res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            }
        );
    }

    return (
       <form className='form__login' onSubmit={onSubmit}>
            <div className='form__content-container'>
                <h3 className='form__title'>Create a new project</h3>
                <ul className="error-list">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="form__input-container">
                    <input
                        type="text"
                        value={name}
                        className="form__input-container--text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder='project name'
                        required
                    />
                </div>
                <div className="form__input-container">
                    <textarea
                        value={description}
                        className="form__input-container--textarea"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='project description'
                        required
                    />
                </div>
                <div className="form__input-container">
                    <DateRangePicker
                    className='form__content-calendar'
                    ranges={[selectionRange]}
                    editableDateInputs={true}
                    scroll={{ enabled: true }}
                    onChange={onSelection}
                    minDate={new Date()}
                    />
                </div>   
                <div className="form__button">
                    <button id='cancel' data-dismiss="modal" className="form__button-button">Cancel</button>
                    <button className="form__button-button" type="submit">Create</button>
                </div>
           </div>
       </form>
    )
}

export default CreateProject