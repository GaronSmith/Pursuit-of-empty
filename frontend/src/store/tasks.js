import { fetch } from './csrf'

const SET_TASKS = 'tasks/getTasks'

const setTasks = (tasks) => {
    return {
        type:SET_TASKS,
        tasks
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

const initialState = {};

const tasksReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_TASKS:
            newState = { ...state, ...action.tasks }
            return newState
        default:
            return state
    }
}

export default tasksReducer