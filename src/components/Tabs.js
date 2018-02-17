'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@fortawesome/react-fontawesome';


export default class Tabs extends React.PureComponent {
  render() {
    return (
      <ul className="nav nav-wizard nav-justified">
        {this.renderTab('flag', '', 'Start')}
        {this.renderTab('plug', '/network', 'Network')}
        {this.renderThreads()}
        {this.renderTab('cog', '/misc', 'Misc')}
        {this.renderTab('flag-checkered', '/result', 'Result')}
      </ul>
    );
  }


  renderTab(icon, path, text) {
    return (
      <li className={this.props.path === path ? 'active' : ''}><Link to={`/${this.props.type}${path}`}><Icon icon={icon} /> {text}</Link></li>
    );
  }


  renderThreads() {
    if (this.props.type !== 'proxy') {
      return this.renderTab('microchip', '/threads', 'Threads');
    }
  }
}
