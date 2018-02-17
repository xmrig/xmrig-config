'use strict';

import React from 'react';
import Form from "../Form";


export default class OtherForm extends Form {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="donate">Donate level</label>
          <div className="input-group" style={{width: 200}}>

            <input
              value={this.props.donate}
              onChange={this.handleInputChange}
              type="number"
              className="form-control"
              name="donate"
              id="donate"
              min={1}
              max={99}
            />

            <span className="input-group-addon" id="basic-addon2">%</span>
          </div>
        </div>

        <div className="checkbox">
          <label>

            <input
              checked={this.props.background}
              onChange={this.handleInputChange}
              name="background"
              type="checkbox"
            /> Run in background

          </label>
        </div>
      </form>
    );
  }
}
