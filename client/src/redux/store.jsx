import { createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import rootReducer from './rootReducer'

// logger to console
import logger from 'redux-logger';
// extension
// import { composeWithDevTools } from 'redux-devtools-extension';
// Manual configuration using composeWithDevTools
// const middleware = [...getDefaultMiddleware(), logger];


const store = createStore(
    rootReducer, // Provide the reducer here
    applyMiddleware(logger, thunk)
    // composeWithDevTools(applyMiddleware(logger))
);

export default store;