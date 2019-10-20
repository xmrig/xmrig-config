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

        <h2>AMD/OpenCL</h2>
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


  renderPlatform() {
    return (
      <div className="form-group">
        <label htmlFor="oclPlatform">OpenCL platform</label>{' '}
        <select
          className="form-control"
          value={this.state.platform}
          id="oclPlatform"
          name="oclPlatform"
          onChange={event => { this.setState({ platform: event.target.value}, this.save); }}
        >
          <option value="AMD">AMD</option>
          <option value="NVIDIA">NVIDIA</option>
          <option value="Intel">Intel</option>
        </select>
      </div>
    );
  }


  renderBody() {
    if (this.state.mode === MODE_AUTO) {
      return (
        <div>
          <form className="form-inline" style={{marginBottom: 10}} onSubmit={event => event.preventDefault()}>
            {this.renderPlatform()}
          </form>
        </div>
      )
    }

    return (
      <div>
        <form className="form-inline" style={{marginBottom: 10}} onSubmit={event => event.preventDefault()}>
          {this.renderPlatform()}
          <div className="form-group" style={{paddingLeft: 12}}>
            {this.renderAddBtn()}
          </div>
        </form>
        <table className="table table-striped table-hover table-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>index</th>
              <th>intensity</th>
              <th>memory</th>
              <th>worksize</th>
              <th>strided_index</th>
              <th>mem_chunk</th>
              <th>unroll</th>
              <th>affinity</th>
              <th style={{width: 100 + '%'}} />
            </tr>
          </thead>
          <tbody>
            {this.state.threads.map((thread, index) => <OclThreadRow key={index} index={index} thread={thread} algo={this.props.algo} edit={this.editThread} remove={this.removeThread} />)}
          </tbody>
        </table>
      </div>
    );
  }


  handleModeChange = event => {
    this.setState({ mode: +event.target.value}, this.save);
  };


  addThread = () => {
    const { platform } = this.state;

    AddOclThreadModal.show({ platform }, this.props.dispatch)
      .then(thread => {
        this.setState({ threads: update(this.state.threads, {$push: [thread]})}, this.save);
      })
      .catch(err => null);
  };


  editThread = index => {
    const { platform } = this.state;

    EditOclThreadModal.show({ index, thread: this.state.threads[index], platform }, this.props.dispatch)
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
