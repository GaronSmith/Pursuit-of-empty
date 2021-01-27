import { fetch } from './csrf'

const SET_PREFERENCES = 'preferences/ etPreferences'

const setPreferences = (preferences) => {
    return {
        type: SET_PREFERENCES,
        preferences,
    }
}

export const getPreferences = (id) => async (dispatch) => {

    const response = await fetch(`api/preferences/:id`)
    dispatch(setPreferences(response.data.preferences))
    return response
}

const initialState = {};

const preferencesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_PREFERENCES:
            newState = action.preferences
        default:
            return state;
    }
}

export default preferencesReducer