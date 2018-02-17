'use strict';

import React from 'react';
import Form from "../Form";


export default class ConnectionForm extends Form {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="retries">Number of retries before switch to backup pool</label>

          <input
            value={this.props.retries}
            onChange={this.handleInputChange}
            type="number"
            className="form-control"
            name="retries"
            id="retries"
            style={{width: 200}}
            min={1}
          />

        </div>

        <div className="form-group">
          <label htmlFor="retryPause">Time between retries</label>
          <div className="input-group" style={{width: 200}}>

            <input
              value={this.props.retryPause}
              onChange={this.handleInputChange}
              type="number"
              className="form-control"
              name="retryPause"
              id="retryPause"
              min={1}
            />

            <span className="input-group-addon" id="basic-addon2">Seconds</span>
          </div>
        </div>

      </form>
    );
  }
}
