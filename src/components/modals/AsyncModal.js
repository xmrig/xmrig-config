'use strict';

import React from 'react';


export default class AsyncModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.success = false;
  }


  componentWillUnmount() {
    if (!this.success) {
      this.props.reject(new Error('dismiss'));
    }
  }


  resolve(result) {
    this.success = true;
    this.props.resolve(result);
    this.props.dismiss();
  }
}
