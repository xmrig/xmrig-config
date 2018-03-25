'use strict';

import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';
import randomID from 'random-id';
import {
  ALGO_CRYPTONIGHT, OS_WINDOWS, KIND_XMRIG, KIND_PROXY, KIND_AMD_LEGACY, KIND_NVIDIA_LEGACY,
  MODE_AUTO, MODE_UNAVAILABLE
} from '../constants/options';
import {ADD_POOL, DELETE_POOL, UPDATE, UPDATE_POOL} from '../constants/ActionTypes';


const INITIAL_STATE = {
  [KIND_XMRIG]: {
    version:     20500,
    algo:        ALGO_CRYPTONIGHT,
    os:          OS_WINDOWS,
    name:        '',
    kind:        KIND_XMRIG,
    background:  0,
    colors:      1,
    retries:     5,
    retryPause:  5,
    donate:      5,
    syslog:      0,
    logFile:     null,
    cpuThreads:  { mode: MODE_AUTO, count: 0, av: 0, max: 75, priority: 2, safe: 0, affinity: '', noPages: 0 },
    oclThreads:  { mode: MODE_UNAVAILABLE },
    cudaThreads: { mode: MODE_UNAVAILABLE },
    pools:       [],
    printTime:   60,
    apiPort:     0,
    apiToken:    null,
    apiId:       null,
  },
  [KIND_PROXY]: {
    version:    20500,
    algo:       ALGO_CRYPTONIGHT,
    os:         OS_WINDOWS,
    name:       '',
    kind:       KIND_PROXY,
    background: 0,
    colors:     1,
    retries:    5,
    retryPause: 5,
    donate:     2,
    syslog:     0,
    logFile:    null,
    pools:      [],
    accessLog:  null,
    verbose:    0,
    apiPort:    0,
    apiToken:   null,
    apiId:      null,
    bind:       '0.0.0.0:3333'
  },
  [KIND_AMD_LEGACY]: {
    version:     20400,
    algo:        ALGO_CRYPTONIGHT,
    os:          OS_WINDOWS,
    name:        '',
    kind:        KIND_AMD_LEGACY,
    background:  0,
    colors:      1,
    retries:     5,
    retryPause:  5,
    donate:      5,
    syslog:      0,
    logFile:     null,
    cpuThreads:  { mode: MODE_UNAVAILABLE },
    oclThreads:  { mode: MODE_AUTO, platform: 0, threads: [] },
    cudaThreads: { mode: MODE_UNAVAILABLE },
    pools:       [],
    printTime:   60,
    apiPort:     0,
    apiToken:    null,
    apiId:       null,
  },
  [KIND_NVIDIA_LEGACY]: {
    version:     20500,
    algo:        ALGO_CRYPTONIGHT,
    os:          OS_WINDOWS,
    name:        '',
    kind:        KIND_NVIDIA_LEGACY,
    background:  0,
    colors:      1,
    retries:     5,
    retryPause:  5,
    donate:      5,
    syslog:      0,
    logFile:     null,
    cpuThreads:  { mode: MODE_UNAVAILABLE },
    oclThreads:  { mode: MODE_UNAVAILABLE },
    cudaThreads: { mode: MODE_AUTO, max: 64, optimize: 0, bfactor: 0, bsleep: 0, threads: [] },
    pools:       [],
    printTime:   60,
    apiPort:     0,
    apiToken:    null,
    apiId:       null,
  }
};


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case UPDATE:
      return {...state, ...{[action.kind]: {...state[action.kind], ...action.options}}};

    case ADD_POOL: {
      const pools = update(state[action.kind].pools, {$push: [{...action.pool, id: randomID(10)}]});
      return {...state, ...{[action.kind]: {...state[action.kind], ...{pools}}}};
    }

    case UPDATE_POOL: {
      const index = findIndex(state[action.kind].pools, {id: action.pool.id});
      if (index === -1) {
        return state;
      }

      const pools = update(state[action.kind].pools, {$splice: [[index, 1, action.pool]]});
      return {...state, ...{[action.kind]: {...state[action.kind], ...{pools}}}};
    }

    case DELETE_POOL:
      const index = findIndex(state[action.kind].pools, {id: action.pool});
      if (index === -1) {
        return state;
      }

      const pools = update(state[action.kind].pools, {$splice: [[index, 1]]});
      return {...state, ...{[action.kind]: {...state[action.kind], ...{pools}}}};
  }

  return state;
}
