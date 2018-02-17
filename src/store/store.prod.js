'use strict';

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'


const configureStore = (preloadedState, enhancer) => createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(thunk),
    enhancer
  )
);


export default configureStore;
