'use strict';

import React from 'react';
import { OS_WINDOWS } from '../../constants/options';
import Form from "../Form";


export default class ProxyLoggingForm extends Form {
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
          <label htmlFor="accessLog">Access log filename</label>

          <input
            value={this.props.accessLog}
            onChange={this.handleInputChange}
            type="text"
            className="form-control"
            name="accessLog"
            id="accessLog"
            placeholder="Absolute or relative access log filename"
          />
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
              checked={this.props.verbose}
              onChange={this.handleInputChange}
              name="verbose"
              type="checkbox"
            /> Verbose. <span className="text-muted">Use <kbd>V</kbd> key in runtime to switch this option.</span>

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
