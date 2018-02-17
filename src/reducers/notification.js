'use strict';

import { NOTIFICATION_SHOW, NOTIFICATION_HIDE, MODAL_SHOW } from '../constants/ActionTypes';
import { NOTIFICATION_NONE } from '../constants/NotificationTypes';


const INITIAL_STATE = { type: NOTIFICATION_NONE, data: {} };


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return {...state, type: action.subtype, data: action.data};

    case NOTIFICATION_HIDE:
      return {...state, type: NOTIFICATION_NONE, data: {}};

    case '@@router/LOCATION_CHANGE':
    case MODAL_SHOW:
      if (state.type !== NOTIFICATION_NONE) {
        return {...state, type: NOTIFICATION_NONE, data: {}};
      }
  }

  return state;
}
