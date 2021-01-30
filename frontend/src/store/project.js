import { fetch } from './csrf'

const CREATE_PROJECT = 'project/createProject';
const SET_PROJECTS = 'project/setProjects'
const DELETE_PROJECT = 'project/deleteProject'

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
const delProject = (id) => {
    return {
        type: DELETE_PROJECT,
        id
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

export const getProjects = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`) 
    const obj = {}
    Object.keys(response.data.projects).forEach(el => {
        obj[response.data.projects[el].id] = response.data.projects[el]
    })
    dispatch(setProjects(obj))
    return response
}

export const removeProject = (id) => async (dispatch) => {
    await fetch(`/api/projects/${id}`, {
        method:'DELETE'
    })
    dispatch(delProject(id))
    return
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
        case DELETE_PROJECT:
            newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export default projectReducer