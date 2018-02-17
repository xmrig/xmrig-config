'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Threads from '../../components/Threads';
import {KIND_XMRIG} from "../../constants/options";
import {update} from "../../actions/config";

const KIND = KIND_XMRIG;


const ThreadsContainer = ({ algo, cpuThreads, os, update, dispatch }) => (
  <Threads type={KIND} algo={algo} cpuThreads={cpuThreads} os={os} update={update} dispatch={dispatch} />
);


const mapStateToProps = state => ({
  algo:       state.config[KIND].algo,
  cpuThreads: state.config[KIND].cpuThreads,
  os:         state.config[KIND].os
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND, options));
  },
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
