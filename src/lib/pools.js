'use strict';

import find from 'lodash/find';

import POOLS_CN       from '../config/pools_cn';
import POOLS_CN_LITE  from '../config/pools_cn_lite';
import POOLS_CN_HEAVY from '../config/pools_cn_heavy';
import POOLS_CN_PICO  from '../config/pools_cn_pico';


const POOLS = [ POOLS_CN, POOLS_CN_LITE, POOLS_CN_HEAVY, POOLS_CN_PICO ];


export const getPools = algo => {
  return POOLS[algo].pools;
};


export const getPool = (algo, poolId) => {
  return POOLS[algo][poolId];
};


export const getCoin = (algo, coin, poolId) => {
  const pool = getPool(algo, poolId);
  if (!pool) {
    return null;
  }

  const c = find(pool.coins, { code: coin });
  return c === undefined ? pool.coins[0] : c;
};
