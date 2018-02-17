'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Misc from '../../components/Misc';
import { KIND_XMRIG } from '../../constants/options';
import { update } from "../../actions/config";


const MiscContainer = ({ os, colors, syslog, logFile, printTime, retries, retryPause, donate, background, update }) => (
  <Misc
    type="xmrig"
    os={os}
    colors={colors}
    syslog={syslog}
    logFile={logFile}
    printTime={printTime}
    update={update}
    retries={retries}
    retryPause={retryPause}
    donate={donate}
    background={background}
  />
);


const mapStateToProps = state => ({
  os:         state.config[KIND_XMRIG].os,
  colors:     state.config[KIND_XMRIG].colors,
  syslog:     state.config[KIND_XMRIG].syslog,
  logFile:    state.config[KIND_XMRIG].logFile,
  printTime:  state.config[KIND_XMRIG].printTime,
  retries:    state.config[KIND_XMRIG].retries,
  retryPause: state.config[KIND_XMRIG].retryPause,
  donate:     state.config[KIND_XMRIG].donate,
  background: state.config[KIND_XMRIG].background,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND_XMRIG, options));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MiscContainer);
