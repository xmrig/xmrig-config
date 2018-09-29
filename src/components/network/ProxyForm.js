'use strict';

import React from 'react';
import Textarea from 'react-autosize-textarea';
import Form from "../Form";
import Icon from "@fortawesome/react-fontawesome";


export default class ProxyForm extends Form {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="proxyMode" className="control-label">Mode</label>
          <select className="form-control" value={this.props.mode} id="proxyMode" name="mode" style={{maxWidth: 200}} onChange={event => { this.props.update({ mode: +event.target.value }); }}>
            <option value={0}>Nicehash</option>
            <option value={1}>Simple</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="proxyWorkers" className="control-label"><a href="https://github.com/xmrig/xmrig-proxy/issues/251" target="_blank">Workers <Icon icon="question-circle" /></a></label>
          <select className="form-control" value={this.props.workers} id="proxyWorkers" name="workers" style={{maxWidth: 200}} onChange={event => { this.props.update({ workers: +event.target.value }); }}>
            <option value={1}>Rig ID/User</option>
            <option value={2}>User</option>
            <option value={3}>Password</option>
            <option value={4}>User agent</option>
            <option value={5}>IP</option>
            <option value={0}>Disable</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="proxyDiff" className="control-label">Custom diff</label>
          <input className="form-control" type="number" id="proxyDiff" name="diff" min={0} value={this.props.diff} step={1000} onChange={this.handleInputChange} style={{maxWidth: 200}} />
        </div>

        <div className="form-group">
          <label htmlFor="proxyBind" className="control-label">Bind</label>
          <Textarea id="proxyBind" className="form-control" rows={2} value={this.props.bind} name="bind" onChange={this.handleInputChange} style={{maxWidth: 200, resize: 'none'}} placeholder="Example: 0.0.0.0:3333" />
        </div>

      </form>
    );
  }
}
