'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Network from '../../components/Network';
import {update} from "../../actions/config";
import {KIND_AMD_LEGACY} from "../../constants/options";
import AddPoolModal from "../../components/modals/AddPoolModal";
import EditPoolModal from "../../components/modals/EditPoolModal";
import DeletePoolModal from "../../components/modals/DeletePoolModal";


const NetworkContainer = ({ algo, apiPort, apiToken, apiId, pools, update, add, edit, remove }) => (
  <Network type={KIND_AMD_LEGACY}
           algo={algo}
           apiPort={apiPort}
           apiToken={apiToken}
           apiId={apiId}
           pools={pools}
           update={update}
           add={add}
           edit={edit}
           remove={remove}
  />
);


const mapStateToProps = state => ({
  algo:     state.config[KIND_AMD_LEGACY].algo,
  apiPort:  state.config[KIND_AMD_LEGACY].apiPort,
  apiToken: state.config[KIND_AMD_LEGACY].apiToken,
  apiId:    state.config[KIND_AMD_LEGACY].apiId,
  pools:    state.config[KIND_AMD_LEGACY].pools
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND_AMD_LEGACY, options));
  },
  add(algo) {
    AddPoolModal.show(KIND_AMD_LEGACY, algo, false, dispatch);
  },
  edit(pool) {
    EditPoolModal.show(KIND_AMD_LEGACY, pool, dispatch);
  },
  remove(pool) {
    DeletePoolModal.show(KIND_AMD_LEGACY, pool, dispatch);
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(NetworkContainer);
