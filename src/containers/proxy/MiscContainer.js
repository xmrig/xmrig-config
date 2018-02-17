'use strict';

import React from 'react';
import { connect } from 'react-redux';
import ProxyMisc from '../../components/ProxyMisc';
import { update } from "../../actions/config";
import { KIND_PROXY } from "../../constants/options";


const MiscContainer = ({ os, colors, syslog, logFile, accessLog, verbose, retries, retryPause, donate, background, update }) => (
  <ProxyMisc
    type="proxy"
    os={os}
    colors={colors}
    syslog={syslog}
    logFile={logFile}
    accessLog={accessLog}
    verbose={verbose}
    update={update}
    retries={retries}
    retryPause={retryPause}
    donate={donate}
    background={background}
  />
);


const mapStateToProps = state => ({
  os:         state.config[KIND_PROXY].os,
  colors:     state.config[KIND_PROXY].colors,
  syslog:     state.config[KIND_PROXY].syslog,
  logFile:    state.config[KIND_PROXY].logFile,
  accessLog:  state.config[KIND_PROXY].accessLog,
  verbose:    state.config[KIND_PROXY].verbose,
  retries:    state.config[KIND_PROXY].retries,
  retryPause: state.config[KIND_PROXY].retryPause,
  donate:     state.config[KIND_PROXY].donate,
  background: state.config[KIND_PROXY].background,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND_PROXY, options));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MiscContainer);
