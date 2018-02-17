'use strict';

import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';
import { PRESET_ADD_OR_CHANGE, PRESET_DELETE } from '../constants/ActionTypes';


function init() {
  let presets = [];

  try {
    presets = JSON.parse(localStorage.getItem('xmrig-presets') || '[]');
  }
  catch (e) {
    console.error(e);
  }

  return {
    keys: presets.map(preset => preset[0]),
    values: keyBy(presets, o => o[0])
  }
}


function save(state) {
  localStorage.setItem('xmrig-presets', JSON.stringify(state.keys.map(name => state.values[name])));

  return state;
}


const INITIAL_STATE = init();


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case PRESET_ADD_OR_CHANGE: {
      if (state.values[action.name]) {
        return save({...state, values: {...state.values, [action.name]: [ action.name, action.kind, action.config ] }});
      }

      return save({...state, keys: state.keys.concat(action.name).sort(), values: {...state.values, [action.name]: [ action.name, action.kind, action.config ] }});
    }

    case PRESET_DELETE:
      return save({...state, keys: state.keys.filter(name => name !== action.name), values: omit(state.values, action.name)});
  }

  return state;
}
