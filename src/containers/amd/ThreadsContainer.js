'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Threads from '../../components/Threads';
import {KIND_AMD_LEGACY} from "../../constants/options";
import {update} from "../../actions/config";

const KIND = KIND_AMD_LEGACY;


const ThreadsContainer = ({ oclThreads, update, dispatch }) => (
  <Threads type={KIND} oclThreads={oclThreads} update={update} dispatch={dispatch} />
);


const mapStateToProps = state => ({
  oclThreads: state.config[KIND].oclThreads,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND, options));
  },
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(ThreadsContainer);
