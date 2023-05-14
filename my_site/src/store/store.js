import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { postsReducer } from './reducers/postsReducer';
import { usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));