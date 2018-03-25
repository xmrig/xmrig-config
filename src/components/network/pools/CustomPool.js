'use strict';

import React from 'react';
import cn from 'classnames';
import Form from "../../Form";


export default class CustomPool extends Form {
  render() {
    return (
      <form onSubmit={this.props.submit}>

        <div className="form-group">
          <label htmlFor="url">URL of mining server</label>
          <div className="input-group">
            <span className="input-group-addon">stratum+tcp://</span>
            <input type="text" className="form-control autofocus" id="url" name="url" onChange={this.handleInputChange} value={this.props.url} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input type="text" className="form-control" id="user" name="user" onChange={this.handleInputChange} value={this.props.user} placeholder="Wallet address on most pools" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="text" className="form-control" id="password" name="pass" onChange={this.handleInputChange} value={this.props.pass} placeholder="Optional on most pools" />
        </div>

        <div className={cn('form-group', { 'no-margin-bottom': this.props.isProxy })}>
          <label htmlFor="password">PoW variant</label>
          <select className="form-control" value={this.props.variant} name="variant" onChange={this.handleVariantChange} style={{maxWidth: 300}}>
            <option value={-1}>Autodetect</option>
            <option value={0}>Original/old CryptoNight</option>
            <option value={1}>New CryptoNight (Monero v7)</option>
          </select>
        </div>

        {this.renderMinerOptions()}

        <input type="submit" className="hidden" />

      </form>
    );
  }


  renderMinerOptions() {
    if (this.props.isProxy) {
      return;
    }

    return (
      <div>
        <div className="checkbox">
          <label>
            <input type="checkbox" name="keepalive" onChange={this.handleInputChange} checked={this.props.keepalive} /> keepalive
          </label>
        </div>

        <div className="checkbox no-margin-bottom">
          <label>
            <input type="checkbox" name="nicehash" onChange={this.handleInputChange} checked={this.props.nicehash} /> nicehash/xmrig-proxy
          </label>
        </div>
      </div>
    );
  }


  handleVariantChange = event => {
    this.props.update({ variant: +event.target.value });
  };
}
