import { fetch } from './csrf';

const SET_TASKS = 'tasks/getTasks'
const REMOVE_TASKS = 'tasks/emptyTasks'
const CREATE_TASK = 'tasks/createTask'

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

const addTask = (task) => {
    return {
        type:CREATE_TASK,
        task
    }
}

export const createTask = (name,storyId) => async (dispatch) => {
    const completed = false;
    const body = {name, storyId, completed}
    const response = await fetch('/api/projects/tasks',{
        method:'POST',
        body: JSON.stringify(body),
    })
    dispatch(createTask(response.data.task))
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
        case CREATE_TASK:
            newState = {...state}
            newState[action.task.id] = action.task
            return newState
        default:
            return state
    }
}

export default tasksReducer