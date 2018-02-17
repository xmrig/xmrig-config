'use strict';

import React from 'react';
import { connect } from 'react-redux';
import ResultRedirect from '../../components/ResultRedirect';
import { KIND_XMRIG } from '../../constants/options';


const ResultRedirectContainer = ({config}) => (
  <ResultRedirect type={KIND_XMRIG} config={config} />
);


const mapStateToProps = state => ({
  config: state.config[KIND_XMRIG]
});


export default connect(mapStateToProps)(ResultRedirectContainer);
