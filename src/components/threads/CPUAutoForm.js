'use strict';

import React from 'react';
import {ALGO_CRYPTONIGHT_LITE} from "../../constants/options";
import memSize from "../../lib/memSize";


export default class CPUAutoForm extends React.PureComponent {
  static multiway(av) {
    switch (av) {
      case 1:
      case 3:
        return 1;

      case 2:
      case 4:
        return 2;

      case 5:
      case 8:
        return 3;

      case 6:
      case 9:
        return 4;

      case 7:
      case 10:
        return 5;
    }

    return 1;
  }


  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="cpuHashes">Hashes count per round</label>
          <div style={{display: 'flex'}}>
            <select className="form-control" value={this.av()} id="cpuHashes" name="av" onChange={this.handleInputChange} style={{maxWidth: 150, marginRight: 12}}>
              <option value={0}>Auto</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={5}>3</option>
              <option value={6}>4</option>
              <option value={7}>5</option>
            </select>
            {this.renderCacheHint()}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cpuMax">Limit maximum CPU usage <sup className="text-danger">*</sup></label>
          <div className="input-group" style={{maxWidth: 150}}>
            <input type="number" className="form-control" id="cpuMax" name="max" value={this.props.max} min={1} max={100} onChange={this.handleInputChange} />
            <span className="input-group-addon">%</span>
          </div>
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

        <hr />
        <div>
          <sup className="text-danger">*</sup> <small className="text-muted">Default value 75% has no effect on most desktop CPUs except AMD FX series, because optimal thread count limited by CPU cache first.</small><br />
          <sup className="text-danger">*</sup> <small className="text-muted">This option not precise, it change only thread count, you can't get less than 100% on single core CPU or less than 50% on 2 core CPU.</small>
        </div>
      </form>
    );
  }


  renderCacheHint() {
    if (this.props.av === 0) {
      return;
    }

    const size = memSize(CPUAutoForm.multiway(this.props.av), this.props.algo);

    return <div style={{marginBottom: 5}} className="help-block"><b>{size} MB</b> CPU cache required per thread</div>;
  }


  handleInputChange = event => {
    const target = event.target;

    this.props.update({
      [target.name]: +target.value
    });
  };


  av() {
    const av = this.props.av;

    switch (av) {
      case 3:
        return 1;

      case 4:
        return 2;

      case 8:
        return 5;

      case 9:
        return 6;

      case 10:
        return 7;

      default:
        break;
    }

    return av;
  }
}
