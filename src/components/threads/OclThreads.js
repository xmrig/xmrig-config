'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';
import {MODE_AUTO, MODE_MANUAL} from "../../constants/options";
import AddOclThreadModal from "../modals/AddOclThreadModal";
import OclThreadRow from "./OclThreadRow";
import DeleteThreadModal from "../modals/DeleteThreadModal";
import EditOclThreadModal from "../modals/EditOclThreadModal";


export default class OclThreads extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode:     props.mode,
      platform: props.platform,
      threads:  props.threads
    };
  }


  render() {
    return (
      <div>
        <form className="form-inline pull-right">
          <div className="form-group">
            <label htmlFor="oclMode">Mode</label>{' '}
            <select className="form-control" value={this.state.mode} id="oclMode" name="oclMode" onChange={this.handleModeChange}>
              <option value={MODE_AUTO}>Automatic</option>
              <option value={MODE_MANUAL}>Manual</option>
            </select>
          </div>
        </form>

        <h2>AMD/OpenCL {this.renderAddBtn()}</h2>
        {this.renderBody()}

      </div>
    );
  }


  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }


  renderAddBtn() {
    if (this.state.mode === MODE_MANUAL) {
      return <button type="submit" className="btn btn-success" onClick={this.addThread}><Icon icon="plus" /> Add thread</button>;
    }
  }


  renderBody() {
    if (this.state.mode === MODE_AUTO) {
      return <p className="text-success"><Icon icon="check-circle" /> In automatic mode the miner will try detect and configure all available devices. No additional settings required.</p>;
    }

    return (
      <div>
        <form className="form-inline" style={{marginBottom: 10}} onSubmit={event => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="oclPlatform">OpenCL platform index</label>{' '}
            <input type="number" className="form-control" id="oclPlatform" value={this.state.platform} onChange={this.handlePlatformChange} style={{width: 64}} min={0} />
          </div>
        </form>
        <table className="table table-striped table-hover table-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>index</th>
              <th>intensity</th>
              <th>worksize</th>
              <th>affinity</th>
              <th style={{width: 100 + '%'}} />
            </tr>
          </thead>
          <tbody>
            {this.state.threads.map((thread, index) => <OclThreadRow key={index} index={index} thread={thread} edit={this.editThread} remove={this.removeThread} />)}
          </tbody>
        </table>
      </div>
    );
  }


  handleModeChange = event => {
    this.setState({ mode: +event.target.value}, this.save);
  };


  handlePlatformChange = event => {
    this.setState({ platform: +event.target.value}, this.save);
  };


  addThread = () => {
    AddOclThreadModal.show(this.props.dispatch)
      .then(thread => {
        this.setState({ threads: update(this.state.threads, {$push: [thread]})}, this.save);
      })
      .catch(err => null);
  };


  editThread = index => {
    EditOclThreadModal.show(index, this.state.threads[index], this.props.dispatch)
      .then(result => {
        this.setState({ threads: update(this.state.threads, {$splice: [[result.index, 1, result.thread]]}) }, this.save);
      })
      .catch(err => null);
  };


  removeThread = index => {
    DeleteThreadModal.show(index, this.props.dispatch)
      .then(index => {
        this.setState({ threads: update(this.state.threads, {$splice: [[index, 1]]}) }, this.save);
      })
      .catch(err => null);
  };


  save = () => {
    this.props.update({ oclThreads: this.state });
  };
}
