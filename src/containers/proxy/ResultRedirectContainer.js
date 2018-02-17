'use strict';

import React from 'react';
import { connect } from 'react-redux';
import ResultRedirect from '../../components/ResultRedirect';
import {KIND_PROXY} from '../../constants/options';


const ResultRedirectContainer = ({config}) => (
  <ResultRedirect type={KIND_PROXY} config={config} />
);


const mapStateToProps = state => ({
  config: state.config[KIND_PROXY]
});


export default connect(mapStateToProps)(ResultRedirectContainer);
