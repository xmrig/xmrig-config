'use strict';

import React from 'react';
import { OS_WINDOWS } from '../../constants/options';
import Form from "../Form";


export default class LoggingForm extends Form {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="logFile">Log filename</label>

          <input
            value={this.props.logFile}
            onChange={this.handleInputChange}
            type="text"
            className="form-control"
            name="logFile"
            id="logFile"
            placeholder="Absolute or relative log filename"
          />

        </div>
        <div className="form-group">
          <label htmlFor="printTime">Hashrate report interval</label>
          <div className="input-group" style={{width: 200}}>

            <input
              value={this.props.printTime}
              onChange={this.handleInputChange}
              type="number"
              className="form-control"
              name="printTime"
              id="printTime"
              min={1}
            />

            <span className="input-group-addon" id="basic-addon2">Seconds</span>
          </div>
        </div>
        <div className="checkbox">
          <label>

            <input
              checked={this.props.os !== OS_WINDOWS && this.props.syslog}
              onChange={this.handleInputChange}
              name="syslog"
              type="checkbox"
              disabled={this.props.os === OS_WINDOWS}
            /> Use syslog

          </label>
        </div>
        <div className="checkbox">
          <label>

            <input
              checked={this.props.colors}
              onChange={this.handleInputChange}
              name="colors"
              type="checkbox"
            /> Colored output

          </label>
        </div>
      </form>
    );
  }
}
