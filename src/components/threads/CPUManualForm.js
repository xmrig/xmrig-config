'use strict';

import React from 'react';
import {ALGO_CRYPTONIGHT_LITE} from "../../constants/options";


export default class CPUManualForm extends React.PureComponent {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="cpuThreads">Threads count</label>
          <input type="number" className="form-control" id="cpuThreads" name="count" value={this.props.count} min={0} onChange={this.handleInputChange} style={{maxWidth: 150}} />
        </div>

        <div className="form-group">
          <label htmlFor="cpuAV">Algorithm variation</label>
          <select className="form-control" value={this.props.av} id="cpuAV" name="av" onChange={this.handleInputChange} style={{maxWidth: 150}}>
            <option value={0}>Auto</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cpuPriority">CPU Priority</label>
          <select className="form-control" value={this.props.priority} id="cpuPriority" name="priority" onChange={this.handleInputChange} style={{maxWidth: 150}}>
            <option value={0}>Low</option>
            <option value={1}>Below normal</option>
            <option value={2}>Normal</option>
            <option value={3}>Above normal</option>
            <option value={4}>High</option>
            <option value={5}>Realtime</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cpuAffinity">CPU affinity</label>
          <input type="text" className="form-control" id="cpuAffinity" name="affinity" value={this.props.affinity} onChange={this.handleInputChange} style={{maxWidth: 150}} />
        </div>

        <div className="checkbox">
          <label><input type="checkbox" name="safe" checked={!!this.props.safe} onChange={this.handleInputChange} /> Safe adjust <b>threads</b> and <b>av</b> settings</label>
        </div>

        <div className="checkbox">
          <label><input type="checkbox" name="noPages" checked={!!this.props.noPages} onChange={this.handleInputChange} /> Disable huge pages support</label>
        </div>
      </form>
    );
  }


  renderCacheHint() {
    const av = this.av();
    if (av === 0) {
      return;
    }

    const size = av * (this.props.algo === ALGO_CRYPTONIGHT_LITE ? 1 : 2);

    return <div style={{marginBottom: 5}} className="help-block"><b>{size} MB</b> CPU cache required per thread</div>;
  }


  handleInputChange = event => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? +target.checked : (target.type === 'text' ? target.value : +target.value);

    this.props.update({
      [target.name]: value
    });
  };


  av() {
    const av = this.props.av;

    switch (av) {
      case 0:
      case 1:
      case 2:
        return av;

      case 3:
        return 1;

      case 4:
        return 2;

      default:
        return 0;
    }
  }
}
