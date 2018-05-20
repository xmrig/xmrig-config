'use strict';

import React from 'react';
import Form from "../Form";


export default class ApiForm extends Form {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="apiPort">TCP port for incoming connections</label>

          <input
            value={this.props.apiPort}
            onChange={this.handleInputChange}
            type="number"
            className="form-control"
            name="apiPort"
            id="apiPort"
            min={0}
            max={65535}
            style={{width: 200}}
          />

        </div>

        {this.renderOptions()}
        {this.renderExtra()}

      </form>
    );
  }


  renderOptions() {
    if (this.props.apiPort === 0) {
      return;
    }

    return (
      <div>
        <div className="form-group">
          <label htmlFor="apiId">Worker name</label>

          <input
            value={this.props.apiId}
            onChange={this.handleInputChange}
            type="text"
            className="form-control"
            name="apiId"
            id="apiId"
            placeholder="Optional"
            disabled={+this.props.apiPort === 0}
          />

        </div>

        <div className="form-group">
          <label htmlFor="logFile">Bearer access token</label>

          <input
            value={this.props.apiToken}
            onChange={this.handleInputChange}
            type="text"
            className="form-control"
            name="apiToken"
            id="apiToken"
            placeholder="Optional"
            disabled={+this.props.apiPort === 0}
          />

        </div>
      </div>
    );
  }


  renderExtra() {
    if (this.props.apiPort === 0 || this.props.version < 20600) {
      return;
    }

    return (
      <div>
        <div className="checkbox">
          <label>
            <input
              name="apiFull"
              checked={this.props.apiToken && this.props.apiFull}
              onChange={this.handleInputChange}
              disabled={!this.props.apiToken}
              type="checkbox"
            /> Enable full remote access
          </label>
        </div>

        <div className="checkbox">
          <label>
            <input
              name="apiIPv6"
              checked={this.props.apiIPv6}
              onChange={this.handleInputChange}
              type="checkbox"
            /> Enable IPv6
          </label>
        </div>
      </div>
    );
  }
}
