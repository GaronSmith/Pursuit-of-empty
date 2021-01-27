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
        obj[el.orderIdx] = el.WorkFlowStatus.name
    })
    return obj
}



const initialState = {};

const preferencesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_PREFERENCES:
            const normalized = normalizePref(action.preferences)
            newState = {...state}
            newState.order = normalized
            return newState
        default:
            return state;
    }
}

export default preferencesReducer