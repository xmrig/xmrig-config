'use strict';

import {PRESET_ADD_OR_CHANGE, PRESET_DELETE} from '../constants/ActionTypes';


export const addOrChangePreset = (kind, name, config) => ({ type: PRESET_ADD_OR_CHANGE, kind, name, config });
export const deletePreset      = (name) => ({ type: PRESET_DELETE, name });
