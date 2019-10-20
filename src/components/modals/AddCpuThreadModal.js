'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import { Modal, Header, Title, Body, Footer, Cancel } from './Modal';
import {MODAL_ADD_CPU_THREAD} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";
import CpuThreadForm from '../threads/CpuThreadForm';
import OclThreadForm from "../threads/OclThreadForm";


export default class AddCpuThreadModal extends AsyncModal {
  static show(props, dispatch) {
    return showAsync(MODAL_ADD_CPU_THREAD, props, dispatch)
  }

  constructor(props) {
    super(props);

    this.state = {
      low_power_mode: 1,
      affine_to_cpu:  false,
      asm:            1
    };
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title><Icon icon="plus" /> Add new CPU thread</Title>
        </Header>
        <Body>
          <CpuThreadForm
            low_power_mode={this.state.low_power_mode}
            affine_to_cpu={this.state.affine_to_cpu}
            asm={this.state.asm}
            update={this.update}
            submit={this.submit}
          />
        </Body>
        <Footer>
          <button type="button" className="btn btn-success" onClick={this.submit}><Icon icon="plus" /> Add thread</button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }


  submit = event => {
    event.preventDefault();

    this.resolve(this.state);
  };


  update = state => {
    this.setState(state);
  };
}
