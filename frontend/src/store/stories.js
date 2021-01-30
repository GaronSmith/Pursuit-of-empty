import { fetch } from './csrf'

const SET_STORIES = 'stories/setStories'
const UPDATE_STORIES ='stories/updateStories'
const DELETE_STORY = 'stories/delStory'
const NEW_STORY = 'stories/createStory'
const REMOVE_STORIES = 'stories/removeStories'

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

const delStory = (id) => {
    return {
        type:DELETE_STORY,
        id
    }
}

const newStory = (story) => {
    return {
        type: NEW_STORY,
        story
    }
}

const remStories = () => {
    return {
        type: REMOVE_STORIES
    }
}

export const getStories = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/stories/${id}`)
    const obj = {}
    Object.keys(response.data.stories).forEach(el => {
        obj[response.data.stories[el].id] = response.data.stories[el]
    })
    dispatch(setStories(obj))
    return response
}

export const storyDnD = (id, priority, workflowStatusId, plusOne, minusOne) => async (dispatch) => {
    const body = {id, priority, workflowStatusId, plusOne, minusOne}
    const response = await fetch(`/api/projects/stories/`,{
        method:'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const obj = {}
    Object.keys(response.data.obj).forEach(el => {
        obj[response.data.obj[el].id] = response.data.obj[el]
    })
    console.log('thunk',obj)
    dispatch(setStories(obj))
    return response
}

export const updateProgress = (story) => async (dispatch) => {
    const body = story
    const response = await fetch(`/api/projects/stories/${story.id}`,{
        method: 'PUT',
        body:JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    dispatch(updateStories(response.data.story))
    return response
}

export const deleteStory = (id) => async (dispatch) => {
    await fetch(`/api/projects/stories/${id}`,{
        method:'DELETE',
    })
    dispatch(delStory(id))
}

export const createStory = (story) => async (dispatch) => {
    const response = await fetch(`/api/projects/stories`, {
        method:'POST',
        body: JSON.stringify(story)
    })
    dispatch(newStory(response.data.story))
    return story
}

export const removeStories = () => async (dispatch) => {
    dispatch(remStories())
    return
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
            return newState
        case DELETE_STORY:
            newState = {...state}
            delete newState[action.id]
            return newState
        case NEW_STORY:
            newState = {...state}
            newState[action.story.id] = action.story
            return newState
        case REMOVE_STORIES:
            newState = {}
            return newState
        default:
            return state
    }
}
export default storiesReducer