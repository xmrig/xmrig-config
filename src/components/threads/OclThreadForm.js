'use strict';

import React from 'react';
import Form from "../Form";


export default class OclThreadForm extends Form {
  render() {
    return (
      <form className="form-horizontal" onSubmit={this.props.submit}>

        <div className="form-group">

          {this.renderField('index', 0, 'GPU index')}

          <label htmlFor="oclAffinity" className="col-sm-3 control-label">CPU affinity</label>
          <div className="col-sm-3">
            <div className="input-group">
              <span className="input-group-addon">
                <input type="checkbox" checked={this.props.affine_to_cpu !== false} onChange={this.handleAffinityChange} />
              </span>
              <input
                type="number"
                className="form-control"
                id="oclAffinity"
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
          {this.renderField('intensity', 1)}
          {this.renderField('worksize', 1)}

          <input type="submit" className="hidden" />
        </div>

      </form>
    );
  }


  renderField(name, min, label) {
    return (
      <div>
        <label htmlFor={`ocl${name}`} className="col-sm-3 control-label">{label || name}</label>
        <div className="col-sm-3">
          <input
            type="number"
            className="form-control"
            id={`ocl${name}`}
            name={name}
            value={this.props[name]}
            min={min}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
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
