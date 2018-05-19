'use strict';

import React from 'react';
import cn from 'classnames';
import Form from "../../Form";
import {ALGO_CRYPTONIGHT, ALGO_CRYPTONIGHT_HEAVY, ALGO_CRYPTONIGHT_LITE} from "../../../constants/options";


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

        {this.renderVariant()}
        {this.renderKeepalive()}
        {this.renderMinerOptions()}

        <input type="submit" className="hidden" />

      </form>
    );
  }


  renderKeepalive() {
    return (
      <div className={cn('checkbox', { 'no-margin-bottom': this.props.isProxy })}>
        <label>
          <input type="checkbox" name="keepalive" onChange={this.handleInputChange} checked={this.props.keepalive} /> keepalive
        </label>
      </div>
    );
  }


  renderMinerOptions() {
    if (this.props.isProxy) {
      return;
    }

    return (
      <div>
        <div className="checkbox no-margin-bottom">
          <label>
            <input type="checkbox" name="nicehash" onChange={this.handleInputChange} checked={this.props.nicehash} /> nicehash
          </label>
        </div>
      </div>
    );
  }


  renderVariant() {
    if (this.props.algo === ALGO_CRYPTONIGHT_HEAVY) {
      return;
    }

    return (
      <div className="form-group">
        <label htmlFor="password">PoW variant</label>
        {this.renderVariantSelect()}
      </div>
    );
  }


  renderVariantSelect() {
    if (this.props.algo === ALGO_CRYPTONIGHT) {
      return (
        <select className="form-control" value={this.props.variant} name="variant" onChange={this.handleVariantChange} style={{maxWidth: 300}}>
          <option value={-1}>variant -1 (Monero)</option>
          <option value={1}>variant 1 (CryptoNightV7)</option>
          <option value={0}>variant 0 (Old CryptoNight)</option>
          <option value={"xtl"}>variant xtl (Stellite)</option>
        </select>
      );
    }

    if (this.props.algo === ALGO_CRYPTONIGHT_LITE) {
      return (
        <select className="form-control" value={this.props.variant} name="variant" onChange={this.handleVariantChange} style={{maxWidth: 300}}>
          <option value={-1}>variant -1 (Aeon)</option>
          <option value={1}>variant 1 (CryptoNightLiteV7)</option>
          <option value={0}>variant 0 (Old CryptoNightLite)</option>
          <option value={"ipbc"}>variant ipbc (IPBC)</option>
        </select>
      );
    }
  }


  handleVariantChange = event => {
    let variant = event.target.value;
    if (variant === '-1' || variant === '0' || variant === '1') {
      variant = +variant;
    }

    this.props.update({ variant });
  };
}
