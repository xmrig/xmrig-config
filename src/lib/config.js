'use strict';

import bs58 from 'bs58';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import {
  ALGO_CRYPTONIGHT,
  ALGO_CRYPTONIGHT_HEAVY,
  ALGO_CRYPTONIGHT_LITE,
  algoName,
  KIND_AMD_LEGACY,
  KIND_NVIDIA_LEGACY,
  KIND_PROXY,
  KIND_XMRIG,
  MODE_ADVANCED,
  MODE_AUTO,
  MODE_MANUAL,
  OS_WINDOWS
} from '../constants/options';
import products from '../constants/products';
import v1 from './serialization/v1';
import sortObject from "./sortObject";


const CPU_LOW_POWER_MODE = [ false, true, 3, 4, 5];
const CPU_ASM            = [ false, true, 'intel', 'ryzen'];
const PROXY_WORKERS_CMD  = [ 'none', 'rig_id', 'user', 'password', 'agent', 'ip'];
const PROXY_WORKERS      = [ false, true, 'user', 'password', 'agent', 'ip'];


function escape(str) {
  return str.indexOf(' ') === -1 ? str : `"${str}"`
}


function strOption(array, option, str) {
  if (!str) {
    return;
  }

  array.push(option);
  array.push(escape(str));
}


export const getCommandLine = (type, options) => {
  const product = products[type];
  const isProxy = type === 'proxy';

  const array = [];
  array.push(options.os === OS_WINDOWS ? `${product.exe}.exe` : `./${product.exe}`);

  if (options.algo !== ALGO_CRYPTONIGHT) {
    if (isProxy && options.version < 20500 && options.algo !== ALGO_CRYPTONIGHT_HEAVY) {
      array.push('--coin aeon');
    }
    else {
      array.push(`-a ${algoName(options.algo, options.version)}`);
    }
  }

  if (options.background) {
    array.push('-B');
  }

  if (!options.colors) {
    array.push('--no-color');
  }

  if (options.printTime && options.printTime !== 60) {
    array.push(`--print-time ${options.printTime}`);
  }

  if (options.syslog) {
    array.push('-S');
  }

  if (options.verbose) {
    array.push('--verbose');
  }

  strOption(array, '-l', options.logFile);
  strOption(array, '-A', options.accessLog);

  if (+options.retries !== 5) {
    array.push(`-r ${options.retries}`);
  }

  if (+options.retryPause !== 5) {
    array.push(`-R ${options.retryPause}`);
  }

  if (+options.donate !== (isProxy ? 2 : 5)) {
    array.push(`--donate-level ${options.donate}`)
  }

  if (+options.apiPort) {
    array.push(`--api-port ${options.apiPort}`);

    strOption(array, '--api-worker-id', options.apiId);
    strOption(array, '--api-access-token', options.apiToken);

    if (options.apiIPv6) {
      array.push('--api-ipv6');
    }

    if (options.apiToken && options.apiFull) {
      array.push('--api-no-restricted');
    }
  }

  if (isProxy) {
    const bind = options.bind.split('\n').filter(bind => !!bind);
    for (let addr of bind) {
      array.push(`-b ${addr}`);
    }

    if (options.mode === 1) {
      array.push(`-m simple`);
    }

    if (options.version >= 20800 && options.workers !== 1) {
      array.push(`--workers ${PROXY_WORKERS_CMD[options.workers]}`);
    }

    if (options.diff >= 100) {
      array.push(`--custom-diff ${options.diff}`);
    }
  }

  if (type === KIND_XMRIG) {
    const { cpuThreads } = options;

    if (cpuThreads.mode === MODE_AUTO) {
      if (cpuThreads.av) {
        array.push(`--av ${cpuThreads.av} --safe`);
      }

      if (cpuThreads.max !== 75) {
        array.push(`--max-cpu-usage ${cpuThreads.max}`);
      }

      if (cpuThreads.priority !== 2) {
        array.push(`--cpu-priority ${cpuThreads.priority}`);
      }
    }
    else if (cpuThreads.mode === MODE_MANUAL) {
      if (cpuThreads.av) {
        array.push(`--av ${cpuThreads.av}`);
      }

      if (cpuThreads.safe) {
        array.push('--safe');
      }

      if (cpuThreads.priority !== 2) {
        array.push(`--cpu-priority ${cpuThreads.priority}`);
      }

      if (cpuThreads.affinity) {
        array.push(`--cpu-affinity ${cpuThreads.affinity}`);
      }

      if (cpuThreads.noPages) {
        array.push('--no-huge-pages');
      }

      if (cpuThreads.count) {
        array.push(`-t ${cpuThreads.count}`);
      }
    }
  }

  if (type === KIND_AMD_LEGACY) {
    const { oclThreads } = options;

    if (oclThreads.mode === MODE_MANUAL) {
      array.push(`--opencl-platform ${oclThreads.platform}`);

      if (oclThreads.threads && oclThreads.threads.length) {
        array.push('--opencl-devices');
        array.push(oclThreads.threads.map(thread => thread.index).join(','));
        array.push('--opencl-launch');
        array.push(oclThreads.threads.map(thread => thread.intensity + 'x' + thread.worksize).join(','));

        const affinity = oclThreads.threads.filter(thread => thread.affine_to_cpu !== false);
        if (affinity.length) {
          array.push('--opencl-affinity');
          array.push(oclThreads.threads.map(thread => thread.affine_to_cpu === false ? -1 : thread.affine_to_cpu).join(','));
        }

        if (options.version >= 20800) {
          array.push('--opencl-strided-index');
          array.push(oclThreads.threads.map(thread => thread.strided_index || (oclThreads.platform === 'NVIDIA' ? 0 : 2)).join(','));

          array.push('--opencl-mem-chunk');
          array.push(oclThreads.threads.map(thread => thread.mem_chunk || 2).join(','));

          array.push('--opencl-unroll');
          array.push(oclThreads.threads.map(thread => isUndefined(thread.unroll) ? 8 : thread.unroll).join(','));
        }
      }
    }

    if (oclThreads.mode === MODE_AUTO && options.version >= 20800 && oclThreads.platform !== 'AMD') {
      array.push(`--opencl-platform ${oclThreads.platform}`);
    }
  }

  if (type === KIND_NVIDIA_LEGACY) {
    const { cudaThreads } = options;

    if (cudaThreads.mode === MODE_AUTO) {
      if (cudaThreads.max !== 64) {
        array.push(`--cuda-max-threads ${cudaThreads.max}`);
      }

      if (cudaThreads.optimize) {
        if (cudaThreads.bfactor !== (options.os === OS_WINDOWS ? 6 : 0)) {
          array.push(`--cuda-bfactor ${cudaThreads.bfactor}`);
        }

        if (cudaThreads.bsleep !== (options.os === OS_WINDOWS ? 25 : 0)) {
          array.push(`--cuda-bsleep ${cudaThreads.bsleep}`);
        }
      }
    }
    else if (cudaThreads.mode === MODE_MANUAL && cudaThreads.threads && cudaThreads.length) {
      array.push('--cuda-devices');
      array.push(cudaThreads.threads.map(thread => thread.index).join(','));

      array.push('--cuda-launch');
      array.push(cudaThreads.threads.map(thread => thread.threads + 'x' + thread.blocks).join(','));

      array.push('--cuda-bfactor');
      array.push(cudaThreads.threads.map(thread => thread.bfactor).join(','));

      array.push('--cuda-bsleep');
      array.push(cudaThreads.threads.map(thread => thread.bsleep).join(','));

      const affinity = cudaThreads.threads.filter(thread => thread.affine_to_cpu !== false);
      if (affinity.length) {
        array.push('--cuda-affinity');
        array.push(cudaThreads.threads.map(thread => thread.affine_to_cpu === false ? -1 : thread.affine_to_cpu).join(','));
      }
    }
  }

  for (const pool of options.pools) {
    array.push(`-o ${pool.url}`);
    array.push(`-u ${pool.user ? pool.user : 'x'}`);
    array.push(`-p ${pool.pass ? pool.pass : 'x'}`);

    if (options.version >= 20500 && pool.variant !== -1 && pool.variant != null) {
      array.push(`--variant ${pool.variant}`);
    }

    if (pool.keepalive) {
      array.push('-k');
    }

    if (options.version >= 20800 && pool.tls) {
      array.push('--tls');
    }

    if (!isProxy) {
      if (pool.nicehash) {
        array.push('--nicehash');
      }
    }
  }

  return array.join(' ');
};


export const getJSON = (type, options, str = true) => {
  const result  = {};
  const isProxy = type === KIND_PROXY;

  if (isProxy && options.version < 20500) {
    result.coin = options.algo === ALGO_CRYPTONIGHT_LITE ? 'aeon' : 'xmr';
  }
  else {
    result.algo = algoName(options.algo, options.version);
  }

  result.background      = !!options.background;
  result.colors          = !!options.colors;
  result.retries         = +options.retries;
  result['retry-pause']  = +options.retryPause;
  result['donate-level'] = +options.donate;
  result.syslog          = !!options.syslog;
  result['log-file']     = options.logFile ? options.logFile : null;

  if (options.printTime) {
    result['print-time'] = +options.printTime;
  }

  if (options.hasOwnProperty('accessLog')) {
    result['access-log-file'] = options.accessLog ? options.accessLog : null;
  }

  if (options.hasOwnProperty('verbose')) {
    result.verbose = !!options.verbose;
  }

  if (type === KIND_XMRIG) {
    const { cpuThreads } = options;

    result.av                = cpuThreads.av;
    result['max-cpu-usage']  = cpuThreads.max;
    result['cpu-priority']   = cpuThreads.priority === 2 ? null : cpuThreads.priority;
    result['huge-pages']     = cpuThreads.noPages === 0;
    result["hw-aes"]         = cpuThreads.aes === -1 ? null : !!cpuThreads.aes;

    if (cpuThreads.mode === MODE_AUTO) {
      result.safe            = cpuThreads.av > 0;
      result.threads         = null;
      result['cpu-affinity'] = null;
    }
    else if (cpuThreads.mode === MODE_MANUAL) {
      result.safe            = !!cpuThreads.safe;
      result.threads         = cpuThreads.count;
      result['cpu-affinity'] = cpuThreads.affinity ? cpuThreads.affinity : null;
    }
    else if (cpuThreads.mode === MODE_ADVANCED) {
      result.safe            = false;
      result['cpu-affinity'] = null;
      result.threads         = cpuThreads.threads.map(thread => ({
        low_power_mode: CPU_LOW_POWER_MODE[thread.low_power_mode - 1],
        affine_to_cpu:  thread.affine_to_cpu,
        asm:            CPU_ASM[thread.asm]
      }));
    }
  }

  if (type === KIND_AMD_LEGACY) {
    const { oclThreads } = options;

    result['opencl-platform'] = oclThreads.platform;
    result.threads = oclThreads.mode === MODE_MANUAL ? oclThreads.threads : null;
  }

  if (type === KIND_NVIDIA_LEGACY) {
    const { cudaThreads } = options;

    if (cudaThreads.mode === MODE_AUTO) {
      const defaultBFactor = (options.os === OS_WINDOWS ? 6 : 0);
      const defaultBSleep  = (options.os === OS_WINDOWS ? 25 : 0);

      result['cuda-max-threads'] = cudaThreads.max === 64 ? undefined : cudaThreads.max;

      if (cudaThreads.optimize) {
        const bfactor = cudaThreads.bfactor === defaultBFactor ? undefined : cudaThreads.bfactor;
        const bsleep  = cudaThreads.bfactor === defaultBSleep  ? undefined : cudaThreads.bsleep;

        // https://github.com/xmrig/xmrig-nvidia/commit/7f2f86fd418ccd95540335dac4b61430c6649049
        result['cuda-bfactor'] = options.version === 20400 ? ('' + bfactor) : bfactor;
        result['cuda-bsleep']  = options.version === 20400 ? ('' + bsleep)  : bsleep;
      }

      result.threads = null;
    }
    else if (cudaThreads.mode === MODE_MANUAL) {
      result.threads = cudaThreads.threads;
    }
  }

  if (isProxy) {
    result.pools = options.pools.filter(pool => pool.enabled).map(pool => ({
      url:               pool.url,
      user:              pool.user,
      pass:              pool.pass || 'x',
      keepalive:         !!pool.keepalive,
      variant:           options.version >= 20500 ? pool.variant : undefined,
      tls:               options.version >= 20800 ? !!pool.tls : undefined,
      'tls-fingerprint': options.version >= 20800 ? null : undefined,
    }));
  }
  else {
    result.pools = options.pools.filter(pool => pool.enabled).map(pool => ({
      url:               pool.url,
      user:              pool.user,
      pass:              pool.pass || 'x',
      keepalive:         !!pool.keepalive,
      nicehash:          !!pool.nicehash,
      variant:           options.version >= 20500 ? pool.variant : undefined,
      tls:               options.version >= 20800 ? !!pool.tls : undefined,
      'tls-fingerprint': options.version >= 20800 ? null : undefined,
    }));
  }

  if (isProxy) {
    result.bind    = options.bind.split('\n').filter(bind => !!bind);
    result.mode    = options.mode === 1 ? 'simple' : 'nicehash';
    result.workers = PROXY_WORKERS[options.workers];

    if (options.diff >= 100) {
      result['custom-diff'] = options.diff;
    }
  }

  result.api = {
    port:             +options.apiPort,
    ['access-token']: options.apiToken ? options.apiToken : null,
    ['worker-id']:    options.apiId ? options.apiId : null,
    ipv6:             !!options.apiIPv6,
    restricted:       !options.apiFull
  };

  return str === true ? JSON.stringify(sortObject(result), null, 4) : result;
};


export const serialize = (type, config, str = true) => {
  const result = v1.toArray(type, config, str);
  if (str === true) {
    return bs58.encode(Buffer.from(JSON.stringify(result)));
  }

  return result;
};


export const deserialize = input => {
  let array;
  try {
    array = JSON.parse(bs58.decode(input));
  }
  catch (e) {
    console.error(e);
    return {}
  }

  if (!isArray(array)) {
    return {}
  }

  if (array[0] === 1) {
    return v1.fromArray(array);
  }

  return {};
};
