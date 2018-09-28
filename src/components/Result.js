'use strict';

import React from 'react';
import ClipboardButton from 'react-clipboard.js';
import Icon from '@fortawesome/react-fontawesome';
import FileSaver from 'file-saver';
import Navbar from './Navbar';
import Tabs from './Tabs';
import PresetForm from "./result/PresetForm";

import { Link } from 'react-router-dom';
import { showSuccess, dismiss } from '../actions/notification';
import { getCommandLine, getJSON, deserialize } from '../lib/config';
import { serialize } from '../lib/config';
import {addOrChangePreset} from "../actions/presets";
import SharePresetModal from "./modals/SharePresetModal";


export default class Result extends React.PureComponent {
  render() {
    const { type } = this.props;

    return (
      <div>
        <Navbar type={type} path="/result" />
        <div className="container">
          <Tabs type={type} path="/result" />

          <h2>Preset
            <PresetForm name={this.props.config.name || 'Unnamed preset'} save={this.save} share={this.share} />
          </h2>

          <hr />

          <h2>
            Command line <ClipboardButton button-title="Copy" className="btn btn-success" data-clipboard-target="#cmd" onSuccess={this.onCopied}><span><Icon icon="copy" /></span></ClipboardButton>
          </h2>
          <pre id="cmd">{getCommandLine(type, this.props.config)}</pre>
          <pre>{JSON.stringify(serialize(type, this.props.config, false))}</pre>

          <h4 className="text-muted text-or"><span>OR</span></h4>

          <h2>
            config.json{' '}
            <div className="btn-group" role="group">
              <ClipboardButton button-title="Copy" className="btn btn-success" data-clipboard-target="#json" onSuccess={this.onCopied}><span><Icon icon="copy" /></span></ClipboardButton>{' '}
              <button title="Download" onClick={this.download} className="btn btn-success"><Icon icon="download" /></button>
            </div>
          </h2>
          <pre id="json">{getJSON(type, this.props.config)}</pre>

          <hr />

          <nav>
            <ul className="pager">
              <li><Link to={`/${type}/misc`}>Previous</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }


  componentDidMount() {
    const config = deserialize(this.props.encodedConfig);
    if (config.kind && config.kind === this.props.type) {
      this.props.update(config);
    }
  }


  onCopied = () => {
    this.props.dispatch(showSuccess('Copied to clipboard'));

    setTimeout(() => this.props.dispatch(dismiss()), 2000);
  };


  download = () => {
    const blob = new Blob([getJSON(this.props.type, this.props.config)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "config.json", true);
  };


  save = name => {
    this.props.update({ name });

    const encodedConfig = serialize(this.props.type, {...this.props.config, name});
    this.props.historyPush(`/${this.props.type}/result/${encodedConfig}`);

    this.props.dispatch(addOrChangePreset(this.props.type, name, encodedConfig));

    this.props.dispatch(showSuccess('Preset successfully saved'));
    setTimeout(() => this.props.dispatch(dismiss()), 2000);
  };


  share = () => {
    SharePresetModal.show(this.props.dispatch);
  };
}
