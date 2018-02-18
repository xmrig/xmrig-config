'use strict';

import React from 'react';
import Textarea from 'react-autosize-textarea';
import Form from "../Form";


export default class BindForm extends Form {
  render() {
    return (
      <form>
        <Textarea className="form-control" rows={2} value={this.props.bind} name="bind" onChange={this.handleInputChange} style={{maxWidth: 200, resize: 'none'}} placeholder="Example: 0.0.0.0:3333" />
      </form>
    );
  }
}
