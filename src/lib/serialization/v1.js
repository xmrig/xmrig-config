'use strict';

import {
  KIND_AMD_LEGACY, KIND_NVIDIA_LEGACY, KIND_PROXY, KIND_XMRIG, MODE_AUTO,
  MODE_UNAVAILABLE
} from "../../constants/options";

const MINER_KEYS = ["version","name","algo","os","background","colors","retries","retryPause","donate","syslog","logFile","pools","apiPort","apiToken","apiId","cpuThreads","oclThreads","cudaThreads","printTime"];
const PROXY_KEYS = ["version","name","algo","os","background","colors","retries","retryPause","donate","syslog","logFile","pools","apiPort","apiToken","apiId","accessLog","verbose","bind"];
const POOL_KEYS  = ["id","url","user","pass","enabled","keepalive","nicehash","ssl","pool","coin","variant"];
const OCL_KEYS   = ["index","intensity","worksize","affine_to_cpu"];
const CUDA_KEYS  = ["index","threads","blocks","bfactor","bsleep","affine_to_cpu"];
const KINDS      = [KIND_XMRIG, KIND_PROXY, KIND_AMD_LEGACY, KIND_NVIDIA_LEGACY];


function toArray(type, config) {
  const result = [ 1, KINDS.indexOf(type) ];
  const keys   = type === KIND_PROXY ? PROXY_KEYS : MINER_KEYS;

  for (const key of keys) {
    switch (key) {
      case 'pools':
        result.push(config.pools.map(pool => POOL_KEYS.map(key => pool[key])));
        continue;

      case 'cpuThreads':
        result.push(saveCPU(config[key]));
        continue;

      case 'oclThreads':
        result.push(saveOCL(config[key]));
        continue;

      case 'cudaThreads':
        result.push(saveCUDA(config[key]));
        continue;

      default:
        break;
    }

    result.push(config[key]);
  }

  return result;
}


function saveCPU(threads) {
  if (threads.mode === MODE_UNAVAILABLE) {
    return 0;
  }

  return [ threads.mode, threads.count, threads.av, threads.max, threads.priority, threads.safe, threads.affinity, threads.noPages ];
}


function saveOCL(threads) {
  if (threads.mode === MODE_UNAVAILABLE) {
    return 0;
  }

  if (threads.mode === MODE_AUTO) {
    return [ MODE_AUTO ];
  }

  return [ threads.mode, threads.platform, threads.threads.map(thread => OCL_KEYS.map(key => thread[key])) ];
}


function saveCUDA(threads) {
  if (threads.mode === MODE_UNAVAILABLE) {
    return 0;
  }

  if (threads.mode === MODE_AUTO) {
    return [ MODE_AUTO, threads.max, threads.optimize, threads.bfactor, threads.bsleep ];
  }

  return [ threads.mode, threads.max, threads.optimize, threads.bfactor, threads.bsleep, threads.threads.map(thread => CUDA_KEYS.map(key => thread[key])) ];
}


function fromArray(array) {
  const result = {
    kind: KINDS[array[1]]
  };

  const keys = result.kind === KIND_PROXY ? PROXY_KEYS : MINER_KEYS;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    switch (key) {
      case 'pools':
        result[key] = getPools(array[i + 2], result.kind === KIND_PROXY);
        continue;

      case 'cpuThreads':
        result[key] = restoreCPU(array[i + 2]);
        continue;

      case 'oclThreads':
        result[key] = restoreOCL(array[i + 2]);
        continue;

      case 'cudaThreads':
        result[key] = restoreCUDA(array[i + 2]);
        continue;

      default:
        break;
    }

    result[key] = array[i + 2];
  }

  return result;
}


function restoreCPU(threads) {
  if (threads === 0) {
    return { mode: MODE_UNAVAILABLE };
  }

  return { mode: threads[0], count: threads[1], av: threads[2], max: threads[3], priority: threads[4], safe: threads[5], affinity: threads[6], noPages: threads[7] }
}


function restoreOCL(threads) {
  if (threads === 0) {
    return { mode: MODE_UNAVAILABLE };
  }

  if (threads[0] === MODE_AUTO) {
    return { mode: MODE_AUTO, platform: 0, threads: []};
  }

  return { mode: threads[0], platform: threads[1], threads: threads[2].map(thread => array2object(thread, OCL_KEYS)) };
}


function restoreCUDA(threads) {
  if (threads === 0) {
    return { mode: MODE_UNAVAILABLE };
  }

  if (threads[0] === MODE_AUTO) {
    return { mode: MODE_AUTO, max: threads[1], optimize: threads[2], bfactor: threads[3], bsleep: threads[4], threads: []};
  }

  return { mode: threads[0], max: threads[1], optimize: threads[2], bfactor: threads[3], bsleep: threads[4], threads: threads[5].map(thread => array2object(thread, CUDA_KEYS))};
}


function getPools(pools, proxy) {
  const result = pools.map(pool => Object.assign({ proxy, name: '' }, array2object(pool, POOL_KEYS)));

  for (let pool of result) {
    if (pool.variant === undefined) { // since v2.5
      pool.variant = -1;
    }
  }

  return result;
}


function array2object(array, keys) {
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = array[i];
  }

  return result;
}


export default {
  toArray,
  fromArray
}
