'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import { Modal, Header, Title, Footer, Cancel } from './Modal';
import {MODAL_DELETE_THREAD} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";


export default class DeleteThreadModal extends AsyncModal {
  static show(index, dispatch) {
    return showAsync(MODAL_DELETE_THREAD, { index }, dispatch)
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title>Delete thread</Title>
        </Header>
        <div className="alert alert-warning" role="alert"><Icon icon="exclamation-triangle" className="text-danger" /> Are you sure you want to delete this thread?</div>
        <Footer>
          <button type="button" className="btn btn-danger" onClick={this.submit}><Icon icon="trash-alt" /> Delete thread</button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }


  submit = event => {
    event.preventDefault();
    this.resolve(this.props.index);
  }
}
