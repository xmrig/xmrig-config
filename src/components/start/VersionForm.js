'use strict';

import React from 'react';


export default class VersionForm extends React.PureComponent {
  render() {
    return (
      <form className="form-inline">
        <select className="form-control" name="version" disabled>
          <option value={21400}>2.14.x</option>
        </select>
      </form>
    );
  }
}
