'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import { Modal, Header, Title, Body, Footer, Cancel } from './Modal';
import {MODAL_ADD_CUDA_THREAD} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";
import CUDAThreadForm from "../threads/CUDAThreadForm";
import {OS_WINDOWS} from "../../constants/options";


export default class AddCUDAThreadModal extends AsyncModal {
  static show(os, dispatch) {
    return showAsync(MODAL_ADD_CUDA_THREAD, { os }, dispatch)
  }

  constructor(props) {
    super(props);

    this.state = {
      index:         0,
      threads:       0,
      blocks:        0,
      bfactor:       props.os === OS_WINDOWS ? 6 : 0,
      bsleep:        props.os === OS_WINDOWS ? 25 : 0,
      affine_to_cpu: false,
    };
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title><Icon icon="plus" /> Add new CUDA thread</Title>
        </Header>
        <Body>
          <CUDAThreadForm
            index={this.state.index}
            threads={this.state.threads}
            blocks={this.state.blocks}
            bfactor={this.state.bfactor}
            bsleep={this.state.bsleep}
            affine_to_cpu={this.state.affine_to_cpu}
            update={this.update}
            submit={this.submit}
          />
        </Body>
        <Footer>
          <button type="button" className="btn btn-success" onClick={this.submit} disabled={!this.isReady()}><Icon icon="plus" /> Add thread</button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }


  isReady() {
    return this.state.threads > 0 && this.state.blocks > 0;
  }


  submit = event => {
    event.preventDefault();

    if (!this.isReady()) {
      return;
    }

    this.resolve(this.state);
  };


  update = state => {
    this.setState(state);
  };
}
