'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';


export default class OclThreadRow extends React.PureComponent {
  render() {
    const { thread } = this.props;

    return (
      <tr>
        <td className="text-right text-muted">{this.props.index}</td>
        <td className="text-right">{thread.index}</td>
        <td className="text-right">{thread.intensity}</td>
        <td className="text-right">{thread.worksize}</td>
        <td className="text-right">{thread.strided_index}</td>
        <td className="text-right">{thread.mem_chunk}</td>
        <td className="text-right">{thread.unroll}</td>
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


  edit = event => {
    event.preventDefault();

    this.props.edit(this.props.index);
  };


  remove = event => {
    event.preventDefault();

    this.props.remove(this.props.index);
  };
}
