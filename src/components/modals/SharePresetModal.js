'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import ClipboardButton from 'react-clipboard.js';
import AsyncModal from './AsyncModal';
import { Modal, Header, Title, Body, Footer, Cancel } from './Modal';
import {MODAL_SHARE_PRESET} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";
import {dismiss, showSuccess} from "../../actions/notification";


export default class SharePresetModal extends AsyncModal {
  static show(dispatch) {
    showAsync(MODAL_SHARE_PRESET, {}, dispatch)
      .then(data => {})
      .catch(err => null);
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title><Icon icon="share-alt" /> Share preset url</Title>
        </Header>
        <Body>
          <pre id="url">{window.location.href}</pre>
        </Body>
        <Footer>
          <ClipboardButton button-title="Copy" className="btn btn-success" data-clipboard-target="#url" onSuccess={this.onCopied}><span><Icon icon="copy" /> Copy & Close</span></ClipboardButton>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }


  onCopied = () => {
    this.resolve();
  };
}
