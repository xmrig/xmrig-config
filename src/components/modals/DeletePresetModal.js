'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import { Modal, Header, Title, Footer, Cancel } from './Modal';
import {MODAL_DELETE_PRESET} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";
import {deletePreset} from "../../actions/presets";


export default class DeletePresetModal extends AsyncModal {
  static show(name, dispatch) {
    showAsync(MODAL_DELETE_PRESET, { name }, dispatch)
      .then(() => {
        dispatch(deletePreset(name));
      })
      .catch(err => null);
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title>{this.props.name}</Title>
        </Header>
        <div className="alert alert-warning" role="alert"><Icon icon="exclamation-triangle" className="text-danger" /> Are you sure you want to delete this preset?</div>
        <Footer>
          <button type="button" className="btn btn-danger" onClick={this.submit}><Icon icon="trash-alt" /> Delete preset</button>
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
