'use strict';

import React from 'react';
import Navbar from './Navbar';
import Icon from '@fortawesome/react-fontawesome';
import PresetsRow from "./PresetRow";
import DeletePresetModal from "./modals/DeletePresetModal";


export default class Presets extends React.PureComponent {
  render() {
    const { type } = this.props;

    return (
      <div>
        <Navbar type={type} path="/presets" />
        <div className="container">
          <h2 className="no-margin-top">Presets <span className="badge">{this.props.presets.keys.length}</span></h2>
          {this.renderPresets()}
        </div>
      </div>
    );
  }


  renderPresets() {
    const { presets } = this.props;

    if (presets.keys.length === 0) {
      return <p className="text-danger"><Icon icon="exclamation-triangle"/> No presets found! Setup and save at least one preset.</p>;
    }

    return (
      <ul className="list-group checkbox-list-group">
        {presets.keys.map(name => <PresetsRow key={name} preset={presets.values[name]} remove={this.remove} />)}
      </ul>
    );
  }


  remove = name => {
    DeletePresetModal.show(name, this.props.dispatch)
  };
}
