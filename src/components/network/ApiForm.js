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

      </form>
    );
  }
}
