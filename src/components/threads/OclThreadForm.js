'use strict';

import React from 'react';
import Form from "../Form";
import {MODE_AUTO, MODE_MANUAL} from "../../constants/options";


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

        <div className="form-group">
          {this.renderField('intensity', 1)}
          {this.renderField('worksize', 1)}

          <input type="submit" className="hidden" />
        </div>

        <div className="form-group">
          <label htmlFor="oclStridedIndex" className="col-sm-3 control-label">strided_index</label>
          <div className="col-sm-3">
            <select
              className="form-control"
              value={this.props.strided_index}
              id="oclStridedIndex"
              name="strided_index"
              disabled={this.props.platform === 'NVIDIA'}
              onChange={event => { this.props.update({ strided_index: +event.target.value }); }}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>

          <label htmlFor="oclMemChunk" className="col-sm-3 control-label">mem_chunk</label>
          <div className="col-sm-3">
            <input
              type="number"
              className="form-control"
              id="oclMemChunk"
              name="mem_chunk"
              value={this.props.mem_chunk}
              min={1}
              max={18}
              disabled={this.props.platform === 'NVIDIA' || this.props.strided_index !== 2}
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="form-group no-margin-bottom">
          {this.renderField('unroll', 1, null, 128)}
        </div>

      </form>
    );
  }


  renderField(name, min, label, max) {
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
            max={max}
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
