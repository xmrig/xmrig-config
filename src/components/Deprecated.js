'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';


export default class Deprecated extends React.PureComponent {
  render() {
    return (
      <div className="alert alert-danger"><Icon icon="exclamation-triangle" /> This config editor is deprecated and not support latest miner versions use <a className="alert-link" href="https://xmrig.com/wizard">xmrig.com/wizard</a> instead.</div>
    );
  }
}
