'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Threads from '../../components/Threads';
import {KIND_NVIDIA_LEGACY} from "../../constants/options";
import {update} from "../../actions/config";

const KIND = KIND_NVIDIA_LEGACY;


const ThreadsContainer = ({ cudaThreads, os, update, dispatch }) => (
  <Threads type={KIND} cudaThreads={cudaThreads} os={os} update={update} dispatch={dispatch} />
);


const mapStateToProps = state => ({
  cudaThreads: state.config[KIND].cudaThreads,
  os:          state.config[KIND].os
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND, options));
  },
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
