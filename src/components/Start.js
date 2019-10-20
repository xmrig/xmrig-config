'use strict';

import React from 'react';
import cn from 'classnames';
import Icon from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';
import Tabs from './Tabs';
import VersionForm from './start/VersionForm';

import { Link } from 'react-router-dom';
import {
  ALGO_CRYPTONIGHT,
  ALGO_CRYPTONIGHT_LITE,
  OS_WINDOWS,
  OS_LINUX,
  OS_X,
  ALGO_CRYPTONIGHT_HEAVY, ALGO_CRYPTONIGHT_PICO
} from '../constants/options';
import Deprecated from "./Deprecated";


export default class Start extends React.PureComponent {
  render() {
    const { type } = this.props;

    return (
      <div>
        <Navbar type={type} path="" />
        <div className="container">
          {this.renderDeprecated()}

          <Tabs type={type} path="" />
          <h2>Version</h2>
          <VersionForm version={this.props.version} update={this.props.update} />

          <h2>Algorithm</h2>
          <div>
            <div className="btn-group">
              {this.renderAlgoBtn(ALGO_CRYPTONIGHT,       'CryptoNight')}
              {this.renderAlgoBtn(ALGO_CRYPTONIGHT_LITE,  'CryptoNight-Lite')}
              {this.renderAlgoBtn(ALGO_CRYPTONIGHT_HEAVY, 'CryptoNight-Heavy')}
              {this.renderAlgoBtn(ALGO_CRYPTONIGHT_PICO,  'CryptoNight-Pico')}
            </div>
            <div>
              <small className="text-muted">Algorithm variant specified separately for each pool.</small>
            </div>
          </div>

          <h2>OS</h2>
          <div>
            <div className="btn-group">
              {this.renderOsBtn(OS_WINDOWS, 'windows', 'Windows')}
              {this.renderOsBtn(OS_LINUX, 'linux', 'Linux')}
              {this.renderOsBtn(OS_X, 'apple', 'macOS')}
            </div>
          </div>

          <hr />

          <nav>
            <ul className="pager">
              <li><Link to={`/${type}/network`}>Next</Link></li>
            </ul>
          </nav>

        </div>
      </div>
    );
  }


  renderAlgoBtn(algo, component) {
    return (
      <button
        onClick={() => this.props.update({ algo })}
        type="button"
        className={cn('btn', 'btn-default', { active: this.props.algo === algo })}
      >
        {component}
      </button>
    );
  }


  renderOsBtn(os, icon, name) {
    return (
      <button onClick={() => this.props.update({ os })} type="button" className={cn('btn', 'btn-default', { active: this.props.os === os })}>
        <Icon icon={['fab', icon]} /> {name}
      </button>
    );
  }


  renderDeprecated() {
    const { type } = this.props;

    if (type === 'xmrig' || type === 'amd') {
      return <Deprecated />;
    }
  }
}
