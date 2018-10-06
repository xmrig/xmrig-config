'use strict';

import React from 'react';
import {getCoin} from "../../../lib/pools";


export default class NodeJsPool extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = NodeJsPool.parse(props);
  }

  render() {
    return (
      <form onSubmit={this.props.submit}>

        <div className="form-group">
          <label htmlFor="wallet">Wallet address</label>
          <input type="text" className="form-control" id="wallet" name="wallet" onChange={this.handleInputChange} value={this.state.wallet} required placeholder="Your public wallet address" />
        </div>

        <div className="form-group">
          <label htmlFor="worker">Worker name</label>
          <input type="text" className="form-control" id="worker" name="worker" onChange={this.handleInputChange} value={this.state.worker} placeholder="Custom string for miner identification" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={this.handleInputChange} value={this.state.email} placeholder="Email address for notifications" />
        </div>

        <div className="form-group no-margin-bottom">
          <label htmlFor="diff">Fixed diff</label>
          <input type="number" className="form-control" id="diff" name="diff" onChange={this.handleInputChange} value={this.state.diff} min={1000} style={{maxWidth: 150}} placeholder="Optional" />
        </div>

        <input type="submit" className="hidden" />

      </form>
    );
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.coin !== prevProps.coin) {
      this.build();
    }
  }


  handleInputChange = event => {
    const target = event.target;
    const value  = (target.type === 'number' ? +target.value : target.value);

    this.setState({
      [target.name]: value
    }, this.build);
  };


  build = () => {
    const coin = getCoin(this.props.algo, this.props.coin, this.props.pool);
    if (!coin) {
      return;
    }

    let user   = this.state.wallet;
    let pass   = this.state.worker || 'x';
    const diff = this.state.diff;

    if (diff && diff >= 1000) {
      user += '+' + diff;
    }

    if (this.state.email) {
      pass += ':' + this.state.email;
    }

    const state = {
      url: coin.url,
      user,
      pass,
      keepalive: true,
      nicehash:  false,
      variant:   coin.variant
    };

    this.props.update(state);
  };


  static parse(props) {
    const user = props.user.split('+');
    const pass = props.pass.split(':');

    return {
      wallet: user[0],
      worker: pass[0],
      email:  pass[1]  || '',
      diff:   +user[1] || ''
    };
  }
}
