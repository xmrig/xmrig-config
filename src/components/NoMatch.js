'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';


export default class NoMatch extends React.PureComponent {
  render() {
    return (
      <div>
        <Navbar type="" path="" />

        <div className="container text-center text-danger">
          <p><Icon icon="exclamation-triangle" size="5x" /></p>
          <p className="text-bold">404 Not Found</p>
        </div>
      </div>
    );
  }
}
