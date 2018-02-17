'use strict';

import React from 'react';


export default class CUDAUsageOptimizer extends React.PureComponent {
  render() {
    return (
      <form className="form-inline" style={{marginBottom: 10}} onSubmit={event => event.preventDefault()}>

        <div className="form-group">
          <label htmlFor="cudaUsage">Optimize for</label>{' '}
          <select className="form-control" value={this.props.optimize} id="cudaUsage" name="optimize" onChange={this.handleOptimizeChange}>
            <option value={0}>Performance</option>
            <option value={1}>Smooth desktop</option>
            <option value={2}>Custom</option>
          </select>
        </div>{' '}

        <div className="form-group">
          <label htmlFor="cudaBFactor">bfactor</label>{' '}
          <select className="form-control" value={this.props.bfactor} id="cudaBFactor" name="bfactor" onChange={this.handleInputChange} disabled={this.props.optimize !== 2} style={{width: 80}}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
          </select>
        </div>{' '}

        <div className="form-group">
          <label htmlFor="cudaBSleep">bsleep</label>{' '}
          <input
            type="number"
            className="form-control"
            value={this.props.bsleep}
            id="cudaBSleep"
            name="bsleep"
            onChange={this.handleInputChange}
            disabled={this.props.optimize !== 2}
            min={0}
            style={{width: 80}}
          />
        </div>
      </form>
    );
  }


  handleOptimizeChange = event => {
    const optimize = +event.target.value;

    if (optimize === 0) {
      this.props.update({ optimize, bfactor: 6, bsleep: 25 });
    }
    else if (optimize === 1) {
      this.props.update({ optimize, bfactor: 12, bsleep: 100 });
    }
    else {
      this.props.update({ optimize });
    }
  };


  handleInputChange = event => {
    const target = event.target;

    this.props.update({
      [target.name]: +target.value
    });
  };
}
