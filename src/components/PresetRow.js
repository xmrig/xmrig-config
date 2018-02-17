'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export default class PresetsRow extends React.PureComponent {
  render() {
    const { preset } = this.props;

    return (
      <li className="list-group-item">
        <div className="pull-right btn-group">
          <button className="btn btn-default" onClick={this.remove}><Icon icon="trash-alt" className="text-danger" /></button>
        </div>
        <div className="pool-line">
          <span className="label label-info">{preset[1]}</span> <Link to={`/${preset[1]}/result/${preset[2]}`}>{preset[0]}</Link>
        </div>
      </li>
    );
  }


  remove = event => {
    this.props.remove(this.props.preset[0]);
  };
}
