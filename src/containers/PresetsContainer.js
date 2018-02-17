'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Presets from '../components/Presets';


const PresetsContainer = ({ presets, dispatch }) => (
  <Presets presets={presets} dispatch={dispatch} />
);


const mapStateToProps = state => ({
  presets: state.presets
});


export default connect(mapStateToProps)(PresetsContainer);
