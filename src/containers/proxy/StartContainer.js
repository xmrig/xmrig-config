'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Start from '../../components/Start';
import { update } from '../../actions/config';
import { KIND_PROXY } from "../../constants/options";

const KIND = KIND_PROXY;


const StartContainer = ({ version, algo, os, update }) => (
  <Start type={KIND} version={version} algo={algo} os={os} update={update} />
);


const mapStateToProps = state => ({
  version: state.config[KIND].version,
  algo:    state.config[KIND].algo,
  os:      state.config[KIND].os
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND, options));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(StartContainer);
