'use strict';

import React from 'react';
import {MODE_ADVANCED, MODE_AUTO, MODE_MANUAL} from "../../constants/options";
import CPUAutoForm from "./CPUAutoForm";
import CPUManualForm from "./CPUManualForm";
import update from "immutability-helper";
import AddCpuThreadModal from "../modals/AddCpuThreadModal";
import CPUAdvancedForm from "./CPUAdvancedForm";
import CpuThreadRow from "./CpuThreadRow";
import DeleteThreadModal from "../modals/DeleteThreadModal";
import EditCpuThreadModal from "../modals/EditCpuThreadModal";


export default class CPUThreads extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...props.threads};
  }


  render() {
    return (
      <div>
        <form className="form-inline pull-right">
          <div className="form-group">
            <label htmlFor="cpuMode">Mode</label>{' '}
            <select className="form-control" value={this.state.mode} id="cpuMode" name="cpuMode" onChange={this.handleModeChange}>
              <option value={MODE_AUTO}>Automatic</option>
              <option value={MODE_MANUAL}>Simple</option>
              <option value={MODE_ADVANCED}>Advanced</option>
            </select>
          </div>
        </form>

        <h2>CPU</h2>
        {this.renderBody()}
      </div>
    );
  }


  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }


  renderBody() {
    const { mode } = this.state;

    if (mode === MODE_AUTO) {
      return <CPUAutoForm
        algo={this.props.algo}
        av={this.state.av}
        max={this.state.max}
        priority={this.state.priority}
        update={this.handleUpdate}
      />
    }

    if (mode === MODE_MANUAL) {
      return <CPUManualForm
        algo={this.props.algo}
        count={this.state.count}
        av={this.state.av}
        priority={this.state.priority}
        safe={this.state.safe}
        affinity={this.state.affinity}
        noPages={this.state.noPages}
        update={this.handleUpdate}
      />;
    }

    if (mode === MODE_ADVANCED) {
      return (
        <div>
          <CPUAdvancedForm
            aes={this.state.aes}
            priority={this.state.priority}
            update={this.handleUpdate}
            add={this.addThread}
          />
          <table className="table table-striped table-hover table-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>low_power_mode</th>
                <th>asm</th>
                <th>affine_to_cpu</th>
                <th style={{width: 100 + '%'}} />
              </tr>
            </thead>
            <tbody>
              {this.state.threads.map((thread, index) => <CpuThreadRow key={index} index={index} thread={thread} edit={this.editThread} remove={this.removeThread} />)}
            </tbody>
          </table>
        </div>
      )
    }
  }


  handleUpdate = state => {
    this.setState(state, this.save);
  };


  handleModeChange = event => {
    this.setState({ mode: +event.target.value}, this.save);
  };


  save = () => {
    this.props.update({ cpuThreads: this.state });
  };


  addThread = () => {
    AddCpuThreadModal.show({ }, this.props.dispatch)
      .then(thread => {
        this.setState({ threads: update(this.state.threads, {$push: [thread]})}, this.save);
      })
      .catch(err => null);
  };


  editThread = index => {
    EditCpuThreadModal.show({ index, thread: this.state.threads[index] }, this.props.dispatch)
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
}
