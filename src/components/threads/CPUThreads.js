'use strict';

import React from 'react';
import {MODE_AUTO, MODE_MANUAL} from "../../constants/options";
import CPUAutoForm from "./CPUAutoForm";
import CPUManualForm from "./CPUManualForm";


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
              <option value={MODE_MANUAL}>Manual</option>
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
    if (this.state.mode === MODE_AUTO) {
      return <CPUAutoForm
        algo={this.props.algo}
        av={this.state.av}
        max={this.state.max}
        priority={this.state.priority}
        update={this.handleUpdate}
      />
    }

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


  handleUpdate = state => {
    this.setState(state, this.save);
  };


  handleModeChange = event => {
    this.setState({ mode: +event.target.value}, this.save);
  };


  save = () => {
    this.props.update({ cpuThreads: this.state });
  };
}
