import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

const initialState = {};

export const middleware = [thunk];


const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));

export default store;
