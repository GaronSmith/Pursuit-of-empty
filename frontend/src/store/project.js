import { fetch } from './csrf'

const CREATE_PROJECT = 'project/createProject';

const createProject = (project) => {
    return {
        type: CREATE_PROJECT,
        payload: project,
    }
}

const projectCreate = (project) => async (dispatch) => {
    const {sessionUser, name, description, startDate, endDate} = project;
    const today = new Date()
    const response = await fetch('/api/projects', {
        method:'POST',
        body: JSON.stringify({
            ownerId: sessionUser.id,
            name,
            description,  
            startDate,
            endDate,
            active: ((startDate<= today) && (endDate >= today))
        }),
    });
    dispatch(createProject(response.data.project))

}

const initialState = {project : {}};

const projectReducer = (state = initialState, action) =>{
    let newState;
    switch (action.type){
        case CREATE_PROJECT:
            newState = {...state};
            newState[action.id] = action.payload;
            return newState;
    }
}

export default projectReducer