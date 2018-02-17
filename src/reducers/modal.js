'use strict';

import { MODAL_SHOW, MODAL_HIDE } from '../constants/ActionTypes';
import { MODAL_NONE } from '../constants/ModalTypes';


const INITIAL_STATE = { type: MODAL_NONE, data: {} };


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return {...state, type: action.subtype, data: action.data};

    case MODAL_HIDE:
      return {...state, type: MODAL_NONE, data: {}};
  }

  return state;
}
