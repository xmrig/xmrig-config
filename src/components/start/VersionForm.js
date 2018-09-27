'use strict';

import React from 'react';


export default class VersionForm extends React.PureComponent {
  render() {
    return (
      <form className="form-inline">
        <select className="form-control" value={this.props.version} name="version" onChange={this.handleInputChange}>
          <option value={20800}>2.8.x</option>
          <option value={20600}>2.6.x</option>
          <option value={20500}>2.5.x</option>
          <option value={20400}>2.4.x</option>
        </select>
      </form>
    );
  }


  handleInputChange = event => {
    this.props.update({ version: +event.target.value });
  };
}
