'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Network from '../../components/Network';
import {update} from "../../actions/config";
import {KIND_NVIDIA_LEGACY} from "../../constants/options";
import AddPoolModal from "../../components/modals/AddPoolModal";
import EditPoolModal from "../../components/modals/EditPoolModal";
import DeletePoolModal from "../../components/modals/DeletePoolModal";


const KIND = KIND_NVIDIA_LEGACY;


const NetworkContainer = ({ version, algo, apiPort, apiToken, apiId, apiIPv6, apiFull, pools, update, add, edit, remove }) => (
  <Network type={KIND}
           version={version}
           algo={algo}
           apiPort={apiPort}
           apiToken={apiToken}
           apiId={apiId}
           apiIPv6={apiIPv6}
           apiFull={apiFull}
           pools={pools}
           update={update}
           add={add}
           edit={edit}
           remove={remove}
  />
);


const mapStateToProps = state => ({
  version:  state.config[KIND].version,
  algo:     state.config[KIND].algo,
  apiPort:  state.config[KIND].apiPort,
  apiToken: state.config[KIND].apiToken,
  apiIPv6:  state.config[KIND].apiIPv6,
  apiFull:  state.config[KIND].apiFull,
  apiId:    state.config[KIND].apiId,
  pools:    state.config[KIND].pools
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND, options));
  },
  add(algo) {
    AddPoolModal.show(KIND, algo, false, dispatch);
  },
  edit(pool) {
    EditPoolModal.show(KIND, pool, dispatch);
  },
  remove(pool) {
    DeletePoolModal.show(KIND, pool, dispatch);
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(NetworkContainer);
