import { fetch } from './csrf'

const SET_STORIES = 'stories/setStories'
const UPDATE_STORIES ='stories/updateStories'

const setStories = (stories) => {
    return {
        type: SET_STORIES,
        stories
    }
}

const updateStories = (story) => {
    return{
        type: UPDATE_STORIES,
        story
    }
}

export const getStories = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/stories/${id}`)
    dispatch(setStories(response.data.stories))
    return response
}

export const storyDnD = (id, priority, workflowStatusId) => async (dispatch) => {
    const body = {id, priority, workflowStatusId}
    const response = await fetch(`/api/projects/stories/`,{
        method:'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    dispatch(updateStories(response.data.story))
    return response
}

const initialState = {};

const storiesReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_STORIES:
            newState = {...state, ...action.stories}
            return newState
        case UPDATE_STORIES:
            newState = {
                ...state, 
                [action.story.id]:action.story
            }
        default:
            return state
    }
}
export default storiesReducer