'use strict';

import React from 'react';
import Icon from "@fortawesome/react-fontawesome";
import Form from "../Form";


export default class CpuThreadForm extends Form {
  render() {
    return (
      <form className="form-horizontal" onSubmit={this.props.submit}>

        <div className="form-group">

          <label htmlFor="cpuMultiway" className="col-sm-3 control-label"><a href="https://github.com/xmrig/xmrig/issues/563" target="_blank">Multiway <Icon icon="question-circle" /></a></label>
          <div className="col-sm-3">
            <select
              className="form-control"
              value={this.props.low_power_mode}
              id="cpuMultiway"
              name="low_power_mode"
              onChange={event => { this.props.update({ low_power_mode: +event.target.value }); }}
            >
              <option value={1}>1 (Single)</option>
              <option value={2}>2 (Double)</option>
              <option value={3}>3 (Triple)</option>
              <option value={4}>4 (Quad)</option>
              <option value={5}>5 (Penta)</option>
            </select>
          </div>

          <label htmlFor="cpuAffinity" className="col-sm-3 control-label">CPU affinity</label>
          <div className="col-sm-3">
            <div className="input-group">
              <span className="input-group-addon">
                <input type="checkbox" checked={this.props.affine_to_cpu !== false} onChange={this.handleAffinityChange} />
              </span>
              <input
                type="number"
                className="form-control"
                id="cpuAffinity"
                name="affinity"
                min={0}
                value={this.props.affine_to_cpu === false ? '' : this.props.affine_to_cpu}
                disabled={this.props.affine_to_cpu === false}
                placeholder="None"
                onChange={this.handleAffinityChange} />
            </div>
          </div>

        </div>

        <div className="form-group no-margin-bottom">
          <label htmlFor="cpuAssembly" className="col-sm-3 control-label">Assembly</label>
          <div className="col-sm-3">
            <select
              className="form-control"
              value={this.props.low_power_mode > 2 ? 0 : this.props.asm}
              id="cpuAssembly"
              name="asm"
              disabled={this.props.low_power_mode > 2}
              onChange={event => { this.props.update({ asm: +event.target.value }); }}
            >
              <option value={1}>Auto</option>
              <option value={0}>None</option>
              <option value={2}>Intel</option>
              <option value={3}>Ryzen</option>
            </select>
          </div>
        </div>

      </form>
    );
  }


  handleAffinityChange = event => {
    const target = event.target;

    if (target.type === 'checkbox') {
      this.props.update({ affine_to_cpu: target.checked ? 0 : false });
      return;
    }

    this.props.update({ affine_to_cpu: +target.value });
  }
}
