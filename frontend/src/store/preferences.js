import { fetch } from './csrf'

const SET_PREFERENCES = 'preferences/getPreferences'

const setPreferences = (preferences) => {
    return {
        type: SET_PREFERENCES,
        preferences,
    }
}

export const getPreferences = (id) => async (dispatch) => {

    const response = await fetch(`/api/preferences/${id}`)
    dispatch(setPreferences(response.data.preferences))
    return response
}


const normalizePref = (arr) => {
    const obj = {};
    arr.forEach(el => {
        obj[el.orderIdx] = el.workflowStatusId
    })
    return obj
}

const normalizedNames = (arr) => {
    const obj = {}
    arr.forEach(el => {
        obj[el.workflowStatusId] = el.WorkFlowStatus.name
    })
    return obj
}

export const addUser = (id) => async (dispatch) => {
    for(let i = 1; i<=4; i++){
        const workflowStatusId = i
        const orderIdx = i
        const userId = id
        const body = {workflowStatusId, orderIdx, userId}
        await fetch('/api/preferences', {
            method:'POST',
            body:JSON.stringify(body)
        })
    }
    dispatch(getPreferences(id))
}



const initialState = {};

const preferencesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_PREFERENCES:
            const normalized = normalizePref(action.preferences)
            const names = normalizedNames(action.preferences)
            newState = {...state}
            newState.order = normalized
            newState.names = names
            return newState
        default:
            return state;
    }
}

export default preferencesReducer