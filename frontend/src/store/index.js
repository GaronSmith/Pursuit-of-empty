import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import projectReducer from './project';
import assignedProjectReducer from './assignedProjects'
import preferencesReducer from './preferences'
import storiesReducer from './stories';
import tasksReducer from './tasks';


const rootReducer = combineReducers({
    session: sessionReducer,
    projects: projectReducer,
    assignedProjects: assignedProjectReducer,
    preferences: preferencesReducer,
    stories: storiesReducer,
    tasks: tasksReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;