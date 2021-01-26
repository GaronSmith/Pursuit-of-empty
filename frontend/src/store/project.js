import { fetch } from './csrf'

const CREATE_PROJECT = 'project/createProject';

const createProject = (project) => {
    return {
        type: CREATE_PROJECT,
        payload: project,
    }
}

export const projectCreate = (project) => async (dispatch) => {
    const {sessionUser, name, description, startDate, endDate} = project;
    const today = new Date()
    today.setTime(0,0)
    const response = await fetch('/api/projects', {
        method:'POST',
        body: JSON.stringify({
            ownerId: sessionUser.id,
            name,
            description,  
            startDate,
            endDate,
            active: (((startDate <= today) && (endDate >= today)) || (!startDate && !endDate))
        }),
    });
    dispatch(createProject(response.data.project))
    return response
}

const initialState = {};

const projectReducer = (state = initialState, action) =>{
    let newState;

    switch (action.type){
        case CREATE_PROJECT:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state
    }
}

export default projectReducer