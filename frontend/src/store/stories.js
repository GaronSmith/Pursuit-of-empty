import { fetch } from './csrf'

const SET_STORIES = 'stories/setStories'

const setStories = (stories) => {
    return {
        type: SET_STORIES,
        stories
    }
}

export const getStories = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/stories/${id}`)
    dispatch(setStories(response.data.stories))
    return response
}

const initialState = {};

const storiesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_STORIES:
            newState = {...state, ...action.stories}
            return newState
        default:
            return state
    }
}
export default storiesReducer