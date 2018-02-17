'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Network from '../../components/Network';
import {KIND_PROXY} from "../../constants/options";
import AddPoolModal from "../../components/modals/AddPoolModal";
import EditPoolModal from "../../components/modals/EditPoolModal";
import DeletePoolModal from "../../components/modals/DeletePoolModal";


const NetworkContainer = ({ algo, apiPort, apiToken, apiId, pools, update, add, edit, remove }) => (
  <Network
    algo={algo}
    type="proxy"
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
  algo:     state.config[KIND_PROXY].algo,
  apiPort:  state.config[KIND_PROXY].apiPort,
  apiToken: state.config[KIND_PROXY].apiToken,
  apiId:    state.config[KIND_PROXY].apiId,
  pools:    state.config[KIND_PROXY].pools
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND_PROXY, options));
  },
  add(algo) {
    AddPoolModal.show(KIND_PROXY, algo, true, dispatch);
  },
  edit(pool) {
    EditPoolModal.show(KIND_PROXY, pool, dispatch);
  },
  remove(pool) {
    DeletePoolModal.show(KIND_PROXY, pool, dispatch);
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(NetworkContainer);
