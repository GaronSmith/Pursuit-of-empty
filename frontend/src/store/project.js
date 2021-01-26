import { fetch } from './csrf'

const CREATE_PROJECT = 'project/createProject';
const SET_PROJECTS = 'project/setProjects'
const SET_ASSIGNED_PROJECTS = 'project/setAssignedProjects'

const createProject = (project) => {
    return {
        type: CREATE_PROJECT,
        payload: project,
    }
}

const setProjects = (projects) => {
    return {
        type: SET_PROJECTS,
        projects,
    }
}

const assignProjects = (assignedProjects) => {
    return{
        type: SET_ASSIGNED_PROJECTS,
        assignedProjects,
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

export const getProjects = () => async (dispatch) => {
    const response = await fetch('/api/projects/1') // remember to not hardcode
    dispatch(setProjects(response.data.projects))
    return response
}

export const getAssignedProjects = () => async (dispatch) => {
    const response = await fetch('/api/projects/1/assigned')
    dispatch(assignProjects(response.data.projects))
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
        case SET_PROJECTS:
            newState = { ...state, ...action.projects };
            return newState
        case SET_ASSIGNED_PROJECTS:
            newState = { ...state, ...action.projects };
            return newState
        default:
            return state
    }
}

export default projectReducer