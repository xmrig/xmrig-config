'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Tabs from './Tabs';
import LoggingForm from './misc/LoggingForm';
import ConnectionForm from './misc/ConnectionForm';
import OtherForm from './misc/OtherForm';
import Deprecated from "./Deprecated";


export default class Misc extends React.PureComponent {
  render() {
    const { type } = this.props;

    return (
      <div>
        <Navbar type={type} path="/misc" />
        <div className="container">
          {this.renderDeprecated()}

          <Tabs type={type} path="/misc" />

          <h2>Console output & logging</h2>
          <LoggingForm
            os={this.props.os}
            logFile={this.props.logFile || ''}
            printTime={this.props.printTime}
            syslog={this.props.syslog}
            colors={this.props.colors}
            update={this.props.update}
          />

          <h2>Connection recovery</h2>
          <ConnectionForm retries={this.props.retries} retryPause={this.props.retryPause} update={this.props.update} />

          <h2>Other options</h2>
          <OtherForm donate={this.props.donate} background={this.props.background} update={this.props.update} />

          <hr />

          <nav>
            <ul className="pager">
              <li><Link to={`/${type}/threads`}>Previous</Link></li> <li><Link to={`/${type}/result`}>Next</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }


  renderDeprecated() {
    const { type } = this.props;

    if (type === 'xmrig' || type === 'amd') {
      return <Deprecated />;
    }
  }
}
