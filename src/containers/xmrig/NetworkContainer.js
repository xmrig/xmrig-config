'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Network from '../../components/Network';
import { KIND_XMRIG } from '../../constants/options';
import {update} from "../../actions/config";
import AddPoolModal from "../../components/modals/AddPoolModal";
import EditPoolModal from "../../components/modals/EditPoolModal";
import DeletePoolModal from "../../components/modals/DeletePoolModal";


const NetworkContainer = ({ algo, apiPort, apiToken, apiId, pools, update, add, edit, remove }) => (
  <Network type="xmrig"
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
  algo:     state.config[KIND_XMRIG].algo,
  apiPort:  state.config[KIND_XMRIG].apiPort,
  apiToken: state.config[KIND_XMRIG].apiToken,
  apiId:    state.config[KIND_XMRIG].apiId,
  pools:    state.config[KIND_XMRIG].pools
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  update(options) {
    dispatch(update(KIND_XMRIG, options));
  },
  add(algo) {
    AddPoolModal.show(KIND_XMRIG, algo, false, dispatch);
  },
  edit(pool) {
    EditPoolModal.show(KIND_XMRIG, pool, dispatch);
  },
  remove(pool) {
    DeletePoolModal.show(KIND_XMRIG, pool, dispatch);
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(NetworkContainer);
