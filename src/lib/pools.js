'use strict';

import find from 'lodash/find';

import POOLS      from '../config/pools';
import POOLS_AEON from '../config/pools_aeon';


export const getPools = coin => {
  return (coin === 'AEON' ? POOLS_AEON : POOLS).pools;
};


export const getPool = (coin, poolId) => {
  return (coin === 'AEON' ? POOLS_AEON : POOLS)[poolId];
};


export const getCoin = (coin, poolId) => {
  const pool = (coin === 'AEON' ? POOLS_AEON : POOLS)[poolId];
  if (!pool) {
    return null;
  }

  return find(pool.coins, { code: coin });
};
