'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import AsyncModal from './AsyncModal';
import PoolForm from '../network/PoolForm';
import { Modal, Header, Title, Body, Footer, Cancel } from './Modal';
import {MODAL_EDIT_POOL} from "../../constants/ModalTypes";
import {showAsync} from "../../actions/modals";
import {updatePool} from "../../actions/config";


export default class EditPoolModal extends AsyncModal {
  static show(type, pool, dispatch) {
    showAsync(MODAL_EDIT_POOL, { type, pool }, dispatch)
      .then(data => {
        dispatch(updatePool(type, data));
      })
      .catch(err => null);
  }


  constructor(props) {
    super(props);

    const { pool } = props;

    this.state = {
      id:        pool.id,
      url:       pool.url,
      user:      pool.user,
      pass:      pool.pass,
      proxy:     pool.proxy,
      enabled:   pool.enabled,
      keepalive: pool.keepalive,
      nicehash:  pool.nicehash,
      ssl:       pool.ssl,
      pool:      pool.pool,
      coin:      pool.coin,
      variant:   pool.variant
    }
  }


  render() {
    return (
      <Modal>
        <Header dismiss={this.props.dismiss}>
          <Title><Icon icon="pencil-alt" /> Edit pool</Title>
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
            ro={true}
            variant={this.state.variant}
            submit={this.submit}
            update={this.update}
          />
        </Body>
        <Footer>
          <button type="button" className="btn btn-success" onClick={this.submit} disabled={!this.isReady()}><Icon icon="check" /> Done</button>
          <Cancel dismiss={this.props.dismiss} />
        </Footer>
      </Modal>
    );
  }


  isReady() {
    return !!this.state.url;
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
