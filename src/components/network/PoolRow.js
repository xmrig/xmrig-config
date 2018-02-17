'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';


export default class PoolRow extends React.PureComponent {
  render() {
    const { pool } = this.props;

    return (
      <li className="list-group-item">
        <div className="pull-right btn-group">
          <button className="btn btn-default" onClick={this.edit}><Icon icon="pencil-alt" /> Edit</button>
          <button className="btn btn-default" onClick={this.remove}><Icon icon="trash-alt" className="text-danger" /></button>
        </div>
        {/*<div className="checkbox">*/}
          {/*<input type="checkbox" checked={pool.enabled} />*/}
        {/*</div>*/}
        <div className="pool-line">
          <a href="#" className="text-bold" onClick={this.edit}>{pool.url}</a> <span className="text-muted">{pool.user}</span>
        </div>
      </li>
    );
  }


  edit = event => {
    event.preventDefault();

    this.props.edit(this.props.pool);
  };


  remove = event => {
    this.props.remove(this.props.pool);
  };
}
