'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as types from '../constants/ModalTypes';
import { dismiss } from  '../actions/modals';
import {MODAL_ADD_CUDA_THREAD} from "../constants/ModalTypes";


const MODALS = {
  [types.MODAL_ADD_POOL]:         require('../components/modals/AddPoolModal').default,
  [types.MODAL_EDIT_POOL]:        require('../components/modals/EditPoolModal').default,
  [types.MODAL_DELETE_POOL]:      require('../components/modals/DeletePoolModal').default,
  [types.MODAL_DELETE_PRESET]:    require('../components/modals/DeletePresetModal').default,
  [types.MODAL_SHARE_PRESET]:     require('../components/modals/SharePresetModal').default,
  [types.MODAL_ADD_OCL_THREAD]:   require('../components/modals/AddOclThreadModal').default,
  [types.MODAL_DELETE_THREAD]:    require('../components/modals/DeleteThreadModal').default,
  [types.MODAL_EDIT_OCL_THREAD]:  require('../components/modals/EditOclThreadModal').default,
  [types.MODAL_ADD_CUDA_THREAD]:  require('../components/modals/AddCUDAThreadModal').default,
  [types.MODAL_EDIT_CUDA_THREAD]: require('../components/modals/EditCUDAThreadModal').default,
  [types.MODAL_ADD_CPU_THREAD]:   require('../components/modals/AddCpuThreadModal').default,
  [types.MODAL_EDIT_CPU_THREAD]:  require('../components/modals/EditCpuThreadModal').default,
};


class ModalContainer extends React.PureComponent {
  render() {
    return <div className="modal fade" ref="modal" tabIndex="-1">{this.renderModal()}</div>;
  }


  renderModal() {
    const Component = MODALS[this.props.type];
    if (!Component) {
      return;
    }

    const props = {...this.props.data, dismiss: this.dismiss};
    return <Component {...props} />;
  }


  componentDidMount() {
    this.$modal = $(this.refs.modal);

    this.$modal.on('shown.bs.modal', () => {
      this.$modal.find('.autofocus').focus();
    });

    this.$modal.on('hidden.bs.modal', () => {
      this.props.dismiss();
    });
  }


  componentDidUpdate() {
    if (this.props.type !== types.MODAL_NONE) {
      this.$modal.modal('show');
    }
  }


  dismiss = () => {
    this.$modal.modal('hide');
  }
}


const mapStateToProps = state => ({
  type: state.modal.type,
  data: state.modal.data
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  dismiss: () => dispatch(dismiss())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
