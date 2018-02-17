'use strict';

import { MODAL_SHOW, MODAL_HIDE } from '../constants/ActionTypes';


export const show = (type, data = {}) => ({
  type: MODAL_SHOW,
  subtype: type,
  data
});


export const showAsync = (type, data, dispatch) => (
  new Promise((resolve, reject) => dispatch(show(type, {...data, resolve, reject})))
);


export const dismiss = () => ({
  type: MODAL_HIDE
});
