'use strict';

import React from 'react';
import Form from "../Form";

import {getPool, getPools} from "../../lib/pools";


export default class PoolSelectForm extends Form {
  render() {
    const pools = getPools(this.props.coin);

    return (
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="pool">Pool</label>{' '}
          <select className="form-control" value={this.props.pool} id="pool" name="pool" disabled={this.props.ro} onChange={this.handleInputChange}>
            {pools.map(pool => (<option key={pool.id} value={pool.id}>{pool.name}</option>))}
          </select>
        </div>{' '}
        {this.renderCoins()}
      </form>
    );
  }


  renderCoins() {
    if (this.props.coin === 'AEON') {
      return (
        <div className="form-group">
          <label htmlFor="coin">Coin</label>{' '}
          <select className="form-control" disabled id="coin" name="coin">
            <option>AEON</option>
          </select>
        </div>
      );
    }

    const pool = getPool(this.props.coin, this.props.pool);
    if (!pool || !pool.coins) {
      return;
    }

    return (
      <div className="form-group">
        <label htmlFor="coin">Coin</label>{' '}
        <select className="form-control" value={this.props.coin} id="coin" name="coin" disabled={pool.coins.length === 1} style={{minWidth: 150}} onChange={this.handleInputChange}>
          {pool.coins.map(coin => (<option key={coin.code} value={coin.code}>{coin.name}</option>))}
        </select>
      </div>
    );
  }
}
