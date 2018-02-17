'use strict';

import { UPDATE, ADD_POOL, UPDATE_POOL, DELETE_POOL } from '../constants/ActionTypes';


export const update     = (kind, options) => ({ type: UPDATE, kind, options });
export const addPool    = (kind, pool) => ({ type: ADD_POOL, kind, pool });
export const updatePool = (kind, pool) => ({ type: UPDATE_POOL, kind, pool });
export const deletePool = (kind, pool) => ({ type: DELETE_POOL, kind, pool });
