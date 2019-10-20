'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';


export default class CPUManualForm extends React.PureComponent {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="cpuThreads">Threads count</label>
          <input type="number" className="form-control" id="cpuThreads" name="count" value={this.props.count} min={0} onChange={this.handleInputChange} style={{maxWidth: 150}} />
        </div>

        <div className="form-group">
          <label htmlFor="cpuAV">Algorithm <a href="https://github.com/xmrig/xmrig/tree/dev#algorithm-variations" target="_blank">variation <Icon icon="question-circle" /></a></label>
          <select className="form-control" value={this.props.av} id="cpuAV" name="av" onChange={this.handleInputChange} style={{maxWidth: 150}}>
            <option value={0}>0 Auto</option>
            <option value={1}>1 Single/AES</option>
            <option value={2}>2 Double/AES</option>
            <option value={3}>3 Single</option>
            <option value={4}>4 Double</option>
            <option value={5}>5 Triple/AES</option>
            <option value={6}>6 Quard/AES</option>
            <option value={7}>7 Penta/AES</option>
            <option value={8}>8 Triple</option>
            <option value={9}>9 Quard</option>
            <option value={10}>10 Penta</option>
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


  handleInputChange = event => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? +target.checked : (target.type === 'text' ? target.value : +target.value);

    this.props.update({
      [target.name]: value
    });
  };
}
