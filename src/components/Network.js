'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';
import Tabs from './Tabs';
import ApiForm from './network/ApiForm';
import PoolRow from './network/PoolRow';
import {KIND_PROXY} from "../constants/options";
import BindForm from "./network/BindForm";


export default class Network extends React.PureComponent {
  render() {
    const { type } = this.props;

    return (
      <div>
        <Navbar type={type} path="/network" />
        <div className="container">
          <Tabs type={type} path="/network" />

          <h2>Pools <button className="btn btn-success" onClick={this.add}><Icon icon="plus" /> Add</button></h2>
          {this.renderPools()}
          {this.renderBind()}

          <h2>HTTP API</h2>
          <ApiForm
            apiPort={this.props.apiPort}
            apiToken={this.props.apiToken || ''}
            apiId={this.props.apiId || ''}
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


  renderBind() {
    if (this.props.type !== KIND_PROXY) {
      return;
    }

    return (
      <div>
        <h2>Bind</h2>
        <BindForm bind={this.props.bind} update={this.props.update} />
      </div>
    );
  }


  add = () => {
    this.props.add(this.props.algo);
  }
}
