'use strict';

import React from 'react';
import { connect } from 'react-redux';
import ResultRedirect from '../../components/ResultRedirect';
import {KIND_AMD_LEGACY} from '../../constants/options';


const ResultRedirectContainer = ({config}) => (
  <ResultRedirect type={KIND_AMD_LEGACY} config={config} />
);


const mapStateToProps = state => ({
  config: state.config[KIND_AMD_LEGACY]
});


export default connect(mapStateToProps)(ResultRedirectContainer);
