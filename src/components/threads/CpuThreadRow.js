'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import {ALGO_CRYPTONIGHT} from "../../constants/options";
import memSize from "../../lib/memSize";


const ASM_NAMES = [ 'intel', 'ryzen' ];


export default class CpuThreadRow extends React.PureComponent {
  render() {
    const { thread } = this.props;

    return (
      <tr>
        <td className="text-right text-muted">{this.props.index}</td>
        <td className="text-right"><span className="badge">{thread.low_power_mode}</span></td>
        <td className="text-right">{memSize(thread.low_power_mode, this.props.algo)} MB</td>
        <td>{this.renderAsm()}</td>
        <td className="text-right text-muted">{thread.affine_to_cpu === false ? 'none' : thread.affine_to_cpu}</td>
        <td>
          <div className="pull-right btn-group">
            <button className="btn btn-sm btn-default" onClick={this.edit}><Icon icon="pencil-alt" /> Edit</button>
            <button className="btn btn-sm btn-default" onClick={this.remove}><Icon icon="trash-alt" className="text-danger" /></button>
          </div>
        </td>
      </tr>
    );
  }


  renderAsm() {
    const { asm, low_power_mode } = this.props.thread;

    if (asm === 0 || low_power_mode > 2 || this.props.algo !== ALGO_CRYPTONIGHT) {
      return <span className="label label-danger">none</span>;
    }

    if (asm === 1) {
      return <span className="label label-success">auto</span>;
    }

    if (asm > 1) {
      return <span className="label label-primary">{ASM_NAMES[asm - 2]}</span>;
    }
  }


  edit = event => {
    event.preventDefault();

    this.props.edit(this.props.index);
  };


  remove = event => {
    event.preventDefault();

    this.props.remove(this.props.index);
  };
}
