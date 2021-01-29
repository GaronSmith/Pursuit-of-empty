import { fetch } from './csrf';

const SET_TASKS = 'tasks/getTasks'
const REMOVE_TASKS = 'tasks/emptyTasks'

const setTasks = (tasks) => {
    return {
        type:SET_TASKS,
        tasks
    }
}

const emptyTasks = () => {
    return {
        type:REMOVE_TASKS
    }
}

export const getTasks = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/tasks/${id}`)

    const obj = {}
    Object.keys(response.data.tasks).forEach(el => {
        obj[response.data.tasks[el].id] = response.data.tasks[el]
    })
    dispatch(setTasks(obj))
}

export const removeTasks = () => async (dispatch) => {
    dispatch(emptyTasks())
}

const initialState = {};

const tasksReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_TASKS:
            newState = { ...state, ...action.tasks }
            return newState
        case REMOVE_TASKS:
            newState = {}
            return newState
        default:
            return state
    }
}

export default tasksReducer