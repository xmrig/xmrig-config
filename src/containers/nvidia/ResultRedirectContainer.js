'use strict';

import React from 'react';
import { connect } from 'react-redux';
import ResultRedirect from '../../components/ResultRedirect';
import {KIND_NVIDIA_LEGACY} from '../../constants/options';


const ResultRedirectContainer = ({config}) => (
  <ResultRedirect type={KIND_NVIDIA_LEGACY} config={config} />
);


const mapStateToProps = state => ({
  config: state.config[KIND_NVIDIA_LEGACY]
});


export default connect(mapStateToProps)(ResultRedirectContainer);
