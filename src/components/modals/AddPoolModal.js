'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import PoolForm from '../network/PoolForm';
import { Modal, Header, Title, Body, Footer, Cancel } from './Modal';
import {MODAL_ADD_POOL} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";
import {addPool} from "../../actions/config";
import {ALGO_CRYPTONIGHT_LITE} from "../../constants/options";


export default class AddPoolModal extends AsyncModal {
  static show(type, algo, proxy, dispatch) {
    showAsync(MODAL_ADD_POOL, { type, algo, proxy }, dispatch)
      .then(data => {
        dispatch(addPool(type, data));
      })
      .catch(err => null);
  }

  constructor(props) {
    super(props);

    this.state = {
      url:       '',
      user:      '',
      pass:      '',
      proxy:     props.proxy,
      enabled:   1,
      keepalive: 1,
      nicehash:  0,
      ssl:       0,
      pool:      'hv',
      coin:      props.algo === ALGO_CRYPTONIGHT_LITE ? 'AEON' : 'XMR',
      variant:   -1
    };
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title>
            <Icon icon="plus" /> Add new pool
          </Title>
        </Header>
        <Body>
          <PoolForm
            pool={this.state.pool}
            coin={this.state.coin}
            url={this.state.url}
            user={this.state.user}
            pass={this.state.pass}
            keepalive={this.state.keepalive}
            nicehash={this.state.nicehash}
            isProxy={this.state.proxy}
            ro={false}
            variant={this.state.variant}
            submit={this.submit}
            update={this.update}
          />
        </Body>
        <Footer>
          <button type="button" className="btn btn-success" onClick={this.submit} disabled={!this.isReady()}><Icon icon="plus" /> Add pool</button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }


  isReady() {
    return !!this.state.url && this.state.user;
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
