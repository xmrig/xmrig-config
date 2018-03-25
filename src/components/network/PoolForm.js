'use strict';

import React from 'react';
import Form from "../Form";
import PoolSelectForm from "./PoolSelectForm";
import {getPool} from "../../lib/pools";


const EDITORS = {
  'nodejs-pool': require('./pools/NodeJsPool').default,
  'custom':      require('./pools/CustomPool').default
};


export default class PoolForm extends Form {
  render() {
    return (
      <div>
        <PoolSelectForm ro={this.props.ro} pool={this.props.pool} coin={this.props.coin} update={this.props.update} />

        <hr />
        {this.renderBody()}
      </div>
    );
  }


  renderBody() {
    const pool      = getPool(this.props.coin, this.props.pool);
    const Component = EDITORS[(pool && pool.editor && EDITORS.hasOwnProperty(pool.editor)) ? pool.editor : 'custom'];

    return <Component url={this.props.url}
                      coin={this.props.coin}
                      pool={this.props.pool}
                      user={this.props.user}
                      pass={this.props.pass}
                      keepalive={this.props.keepalive}
                      nicehash={this.props.nicehash}
                      isProxy={this.props.isProxy}
                      variant={this.props.variant}
                      submit={this.props.submit}
                      update={this.props.update}
    />
  }
}
