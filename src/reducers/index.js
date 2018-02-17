'use strict';

import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';
import notification from './notification';
import modal from './modal';
import config from './config';
import presets from './presets';


const rootReducer = combineReducers({
  notification,
  modal,
  config,
  router,
  presets
});


export default rootReducer
