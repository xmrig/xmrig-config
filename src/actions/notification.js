'use strict';

import { NOTIFICATION_SHOW, NOTIFICATION_HIDE } from '../constants/ActionTypes';
import { NOTIFICATION_SUCCESS, NOTIFICATION_INFO, NOTIFICATION_WARNING, NOTIFICATION_ERROR } from '../constants/NotificationTypes';


export const showSuccess = (data = {}) => ({
  type: NOTIFICATION_SHOW,
  subtype: NOTIFICATION_SUCCESS,
  data
});


export const showInfo = (data = {}) => ({
  type: NOTIFICATION_SHOW,
  subtype: NOTIFICATION_INFO,
  data
});


export const showWarning = (data = {}) => ({
  type: NOTIFICATION_SHOW,
  subtype: NOTIFICATION_WARNING,
  data
});


export const showError = (data = {}) => ({
  type: NOTIFICATION_SHOW,
  subtype: NOTIFICATION_ERROR,
  data
});


export const dismiss = () => ({
  type: NOTIFICATION_HIDE
});
