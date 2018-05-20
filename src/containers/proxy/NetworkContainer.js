'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Network from '../../components/Network';
import {update} from "../../actions/config";
import {KIND_PROXY} from "../../constants/options";
import AddPoolModal from "../../components/modals/AddPoolModal";
import EditPoolModal from "../../components/modals/EditPoolModal";
import DeletePoolModal from "../../components/modals/DeletePoolModal";


const KIND = KIND_PROXY;


const NetworkContainer = ({ version, algo, apiPort, apiToken, apiId, apiIPv6, apiFull, pools, bind, update, add, edit, remove }) => (
  <Network
    version={version}
    algo={algo}
    type={KIND}
    apiPort={apiPort}
    apiToken={apiToken}
    apiId={apiId}
    apiIPv6={apiIPv6}
    apiFull={apiFull}
    pools={pools}
    bind={bind}
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
  pools:    state.config[KIND].pools,
  bind:     state.config[KIND].bind,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND, options));
  },
  add(algo) {
    AddPoolModal.show(KIND, algo, true, dispatch);
  },
  edit(pool) {
    EditPoolModal.show(KIND, pool, dispatch);
  },
  remove(pool) {
    DeletePoolModal.show(KIND, pool, dispatch);
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(NetworkContainer);
