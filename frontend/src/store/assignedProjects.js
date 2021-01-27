import { fetch } from './csrf'

const SET_ASSIGNED_PROJECTS = 'project/setAssignedProjects'


const assignProjects = (assignedProjects) => {
    return {
        type: SET_ASSIGNED_PROJECTS,
        assignedProjects,
    }
}

export const getAssignedProjects = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}/assigned`)
    dispatch(assignProjects(response.data.projects))
    return response
}

const initialState = {};

const assignedProjectReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_ASSIGNED_PROJECTS:
            newState = { ...state, ...action.assignedProjects};
            return newState
        default:
            return state
    }
}

export default assignedProjectReducer