'use strict';

import React from 'react';
import {getCoin} from "../../../lib/pools";


export default class TwoMinersPool extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = TwoMinersPool.parse(props);
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
    const coin = getCoin(this.props.coin, this.props.pool);
    if (!coin) {
      return;
    }

    console.log(coin);
    let user   = this.state.wallet + '.' + this.state.worker;
    let pass   = 'x';

    const state = {
      url: coin.url,
      user,
      pass,
      keepalive: false
    };

    this.props.update(state);
  };


  static parse(props) {
    const user = props.user.split('.');

    const state = {
      wallet: user[0],
      worker: user[1]
    };

    console.log(user);

    return state;
  }

}
