'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';


export default class CPUAdvancedForm extends React.PureComponent {
  render() {
    return (
      <div style={{marginBottom: 10}}>
        <form className="form-inline" onSubmit={event => event.preventDefault()}>

          <div className="form-group" style={{paddingRight: 12}}>
            <label htmlFor="cpuPriority">CPU Priority</label>{' '}
            <select className="form-control" value={this.props.priority} id="cpuPriority" name="priority" onChange={this.handleInputChange} style={{maxWidth: 150}}>
              <option value={0}>Low</option>
              <option value={1}>Below normal</option>
              <option value={2}>Normal</option>
              <option value={3}>Above normal</option>
              <option value={4}>High</option>
              <option value={5}>Realtime</option>
            </select>
          </div>

          <div className="form-group" style={{paddingRight: 12}}>
            <label htmlFor="cpuAES">HW AES</label>{' '}
            <select className="form-control" value={this.props.aes} id="cpuAES" name="aes" onChange={this.handleInputChange} style={{maxWidth: 150}}>
              <option value={-1}>Auto</option>
              <option value={1}>Force enable</option>
              <option value={0}>Disable</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-success" onClick={this.props.add}><Icon icon="plus" /> Add thread</button>
          </div>
        </form>

      </div>
    );
  }


  handleInputChange = event => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? +target.checked : (target.type === 'text' ? target.value : +target.value);

    this.props.update({
      [target.name]: value
    });
  };
}
