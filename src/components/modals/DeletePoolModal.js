'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import { Modal, Header, Title, Footer, Cancel } from './Modal';
import {deletePool} from "../../actions/config";
import {MODAL_DELETE_POOL} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";


export default class DeletePoolModal extends AsyncModal {
  static show(type, pool, dispatch) {
    showAsync(MODAL_DELETE_POOL, { type, pool }, dispatch)
      .then(() => {
        dispatch(deletePool(type, pool.id));
      })
      .catch(err => null);
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title>{this.props.pool.url}</Title>
        </Header>
        <div className="alert alert-warning" role="alert"><Icon icon="exclamation-triangle" className="text-danger" /> Are you sure you want to delete this pool?</div>
        <Footer>
          <button type="button" className="btn btn-danger" onClick={this.submit}><Icon icon="trash-alt" /> Delete pool</button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }


  submit = event => {
    event.preventDefault();
    this.resolve(null);
  }
}
