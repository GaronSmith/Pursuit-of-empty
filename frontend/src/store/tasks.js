import { fetch } from './csrf';

const SET_TASKS = 'tasks/getTasks'
const REMOVE_TASKS = 'tasks/emptyTasks'
const CREATE_TASK = 'tasks/createTask'
const DELETE_TASK = 'tasks/delTask'
const UPDATED_TASK = 'tasks/updatedTask'

const setTasks = (tasks) => {
    return {
        type: SET_TASKS,
        tasks
    }
}

const emptyTasks = () => {
    return {
        type: REMOVE_TASKS
    }
}

const addTask = (task) => {
    return {
        type: CREATE_TASK,
        task
    }
}

const delTask = (id) => {
    return {
        type: DELETE_TASK,
        id
    }
}
const updatedTask = (task) => {
    return {
        type: UPDATED_TASK,
        task
    }
}

export const createTask = (name,storyId) => async (dispatch) => {
    const completed = false;
    const body = {name, storyId, completed}
    console.log('thunk', body)
    const response = await fetch('/api/projects/tasks',{
        method:'POST',
        body: JSON.stringify(body),
    })
    dispatch(addTask(response.data.task))
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

export const deleteTask = (id) => async(dispatch) => {
     await fetch(`/api/projects/tasks/${id}`,{
        method:'DELETE'
    })
    dispatch(delTask(id))
}

export const updateTask = (task) => async(dispatch) => {
    const body = task;
    const response = await fetch(`/api/projects/tasks/${task.id}`, {
        method:'PUT',
        body:JSON.stringify(body)
    })
    dispatch(updatedTask(response.data.task))
    return response
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
        case DELETE_TASK:
            newState = {...state}
            delete newState[action.id]
            return newState
        case UPDATED_TASK:
            newState = {...state}
            newState[action.task.id] = action.task
            return newState
        default:
            return state
    }
}

export default tasksReducer