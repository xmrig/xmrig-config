'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import { Modal, Header, Title, Body, Footer, Cancel } from './Modal';
import {MODAL_EDIT_OCL_THREAD} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";
import OclThreadForm from "../threads/OclThreadForm";


export default class EditOclThreadModal extends AsyncModal {
  static show(index, thread, dispatch) {
    return showAsync(MODAL_EDIT_OCL_THREAD, { index, thread }, dispatch)
  }

  constructor(props) {
    super(props);

    this.state = {...props.thread};
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title><Icon icon="pencil-alt" /> Edit OpenCL thread</Title>
        </Header>
        <Body>
          <OclThreadForm
            index={this.state.index}
            intensity={this.state.intensity}
            worksize={this.state.worksize}
            affine_to_cpu={this.state.affine_to_cpu}
            update={this.update}
            submit={this.submit}
          />
        </Body>
        <Footer>
          <button type="button" className="btn btn-success" onClick={this.submit}><Icon icon="check" /> Done</button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }


  submit = event => {
    event.preventDefault();

    this.resolve({thread: this.state, index: this.props.index});
  };


  update = state => {
    this.setState(state);
  };



}
