'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import { Modal, Header, Title, Body, Footer, Cancel } from './Modal';
import {MODAL_ADD_OCL_THREAD} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";
import OclThreadForm from "../threads/OclThreadForm";


export default class AddOclThreadModal extends AsyncModal {
  static show(props, dispatch) {
    return showAsync(MODAL_ADD_OCL_THREAD, props, dispatch)
  }

  constructor(props) {
    super(props);

    this.state = {
      index:         0,
      intensity:     1000,
      worksize:      8,
      affine_to_cpu: false,
      strided_index: props.platform === 'NVIDIA' ? 0 : 2,
      mem_chunk:     2,
      unroll:        8
    };
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title><Icon icon="plus" /> Add new OpenCL thread</Title>
        </Header>
        <Body>
          <OclThreadForm
            index={this.state.index}
            intensity={this.state.intensity}
            worksize={this.state.worksize}
            affine_to_cpu={this.state.affine_to_cpu}
            platform={this.props.platform}
            strided_index={this.state.strided_index}
            mem_chunk={this.state.mem_chunk}
            unroll={this.state.unroll}
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
