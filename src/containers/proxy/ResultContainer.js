'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Result from '../../components/Result';
import {KIND_PROXY} from "../../constants/options";
import {update} from "../../actions/config";

const KIND = KIND_PROXY;


const ResultContainer = ({ config, match, history, update, dispatch }) => (
  <Result type={KIND}
          config={config}
          encodedConfig={match.params.id}
          historyPush={history.push}
          match={match}
          update={update}
          dispatch={dispatch}
  />
);


const mapStateToProps = state => ({
  config: state.config[KIND]
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND, options));
  },
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);
