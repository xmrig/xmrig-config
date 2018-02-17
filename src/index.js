'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import Root from './containers/Root';
import configureStore from './store';

import './lib/fontawesome';

import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

const history = createHistory();
const store = configureStore({}, applyMiddleware(routerMiddleware(history)));

ReactDOM.render(
  <Root store={store} history={history} />, document.getElementById('root')
);
