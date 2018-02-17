'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';
import {MODE_AUTO, MODE_MANUAL, OS_WINDOWS} from "../../constants/options";
import DeleteThreadModal from "../modals/DeleteThreadModal";
import EditCUDAThreadModal from "../modals/EditCUDAThreadModal";
import CUDAUsageOptimizer from "./CUDAUsageOptimizer";
import AddCUDAThreadModal from "../modals/AddCUDAThreadModal";
import CUDAThreadRow from "./CUDAThreadRow";


export default class CUDAThreads extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...{
      mode:     props.mode,
      max:      props.max,
      optimize: props.optimize,
      threads:  props.threads
    }, ...optimize()};


    function optimize() {
      if (props.os === OS_WINDOWS) {
        if (props.optimize === 0) {
          return { bfactor: 6, bsleep: 25 };
        }

        if (props.optimize === 1) {
          return { bfactor: 12, bsleep: 100 };
        }
      }

      return { bfactor: props.bfactor, bsleep: props.bsleep };
    }
  }


  render() {
    return (
      <div>
        <form className="form-inline pull-right">
          <div className="form-group">
            <label htmlFor="cudaMode">Mode</label>{' '}
            <select className="form-control" value={this.state.mode} id="cudaMode" name="cudaMode" onChange={this.handleModeChange}>
              <option value={MODE_AUTO}>Automatic</option>
              <option value={MODE_MANUAL}>Manual</option>
            </select>
          </div>
        </form>

        <h2>NVIDIA/CUDA {this.renderAddBtn()}</h2>
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
      return this.renderAutoMode();
    }

    return (
      <table className="table table-striped table-hover table-middle">
        <thead>
        <tr>
          <th>#</th>
          <th>index</th>
          <th>threads</th>
          <th>blocks</th>
          <th>bfactor</th>
          <th>bsleep</th>
          <th>affinity</th>
          <th style={{width: 100 + '%'}} />
        </tr>
        </thead>
        <tbody>
        {this.state.threads.map((thread, index) => <CUDAThreadRow key={index} index={index} thread={thread} edit={this.editThread} remove={this.removeThread} />)}
        </tbody>
      </table>
    );
  }


  renderAutoMode() {
    return (
      <div>
        <form className="form-inline" style={{marginBottom: 10}} onSubmit={event => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="cudaMax">Limit maximum CUDA threads per device</label>{' '}
            <input type="number" className="form-control" id="cudaMax" value={this.state.max} onChange={this.handleMaxChange} style={{width: 80}} min={0} />
          </div>
        </form>

        {this.renderOptimizer()}
      </div>
    );
  }


  renderOptimizer() {
    if (this.props.os === OS_WINDOWS) {
      return <CUDAUsageOptimizer optimize={this.state.optimize} bfactor={this.state.bfactor} bsleep={this.state.bsleep} update={this.handleUpdate} />;
    }
  }


  handleUpdate = state => {
    this.setState(state, this.save);
  };


  handleModeChange = event => {
    this.setState({ mode: +event.target.value}, this.save);
  };


  handleMaxChange = event => {
    this.setState({ max: +event.target.value}, this.save);
  };


  addThread = () => {
    AddCUDAThreadModal.show(this.props.os, this.props.dispatch)
      .then(thread => {
        this.setState({ threads: update(this.state.threads, {$push: [thread]})}, this.save);
      })
      .catch(err => null);
  };


  editThread = index => {
    EditCUDAThreadModal.show(index, this.state.threads[index], this.props.dispatch)
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
    this.props.update({ cudaThreads: this.state });
  };
}
