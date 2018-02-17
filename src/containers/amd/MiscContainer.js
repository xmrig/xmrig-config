'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Misc from '../../components/Misc';
import {update} from "../../actions/config";
import {KIND_AMD_LEGACY} from "../../constants/options";


const MiscContainer = ({ os, colors, syslog, logFile, printTime, retries, retryPause, donate, background, update }) => (
  <Misc
    type={KIND_AMD_LEGACY}
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
  os:         state.config[KIND_AMD_LEGACY].os,
  colors:     state.config[KIND_AMD_LEGACY].colors,
  syslog:     state.config[KIND_AMD_LEGACY].syslog,
  logFile:    state.config[KIND_AMD_LEGACY].logFile,
  printTime:  state.config[KIND_AMD_LEGACY].printTime,
  retries:    state.config[KIND_AMD_LEGACY].retries,
  retryPause: state.config[KIND_AMD_LEGACY].retryPause,
  donate:     state.config[KIND_AMD_LEGACY].donate,
  background: state.config[KIND_AMD_LEGACY].background,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND_AMD_LEGACY, options));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MiscContainer);
