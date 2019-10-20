'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';
import Tabs from './Tabs';
import ApiForm from './network/ApiForm';
import PoolRow from './network/PoolRow';
import {KIND_PROXY} from "../constants/options";
import ProxyForm from "./network/ProxyForm";
import Deprecated from "./Deprecated";


export default class Network extends React.PureComponent {
  render() {
    const { type } = this.props;

    return (
      <div>
        <Navbar type={type} path="/network" />
        <div className="container">
          {this.renderDeprecated()}

          <Tabs type={type} path="/network" />

          <h2>Pools <button className="btn btn-success" onClick={this.add}><Icon icon="plus" /> Add</button></h2>
          {this.renderPools()}
          {this.renderProxy()}

          <h2>HTTP API</h2>
          <ApiForm
            version={this.props.version}
            apiPort={this.props.apiPort}
            apiToken={this.props.apiToken || ''}
            apiId={this.props.apiId || ''}
            apiIPv6={+this.props.apiIPv6}
            apiFull={+this.props.apiFull}
            update={this.props.update}
          />

          <hr />

          <nav>
            <ul className="pager">
              <li><Link to={`/${type}`}>Previous</Link></li> <li><Link to={`/${type}/${type === KIND_PROXY ? 'misc' : 'threads'}`}>Next</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }


  renderPools() {
    if (!this.props.pools.length) {
      return <p className="text-danger"><Icon icon="exclamation-triangle" /> No pools specified! Specify at least one valid pool.</p>;
    }

    return (
      <ul className="list-group checkbox-list-group">
        {this.props.pools.map((pool, index) => <PoolRow key={pool.id} pool={pool} primary={index === 0} edit={this.props.edit} remove={this.props.remove} />)}
      </ul>
    );
  }


  renderProxy() {
    if (this.props.type !== KIND_PROXY) {
      return;
    }

    return (
      <div>
        <h2>Proxy</h2>
        <ProxyForm
          bind={this.props.bind}
          mode={this.props.mode}
          workers={this.props.workers}
          diff={this.props.diff}
          update={this.props.update}
        />
      </div>
    );
  }


  renderDeprecated() {
    const { type } = this.props;

    if (type === 'xmrig' || type === 'amd') {
      return <Deprecated />;
    }
  }


  add = () => {
    this.props.add(this.props.algo);
  }
}
