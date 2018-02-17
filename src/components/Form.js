'use strict';

import React from 'react';


export default class Form extends React.PureComponent {
  constructor(props) {
    super(props);
  }


  handleInputChange = event => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? +target.checked : (target.type === 'number' ? +target.value : target.value);

    this.props.update({
      [target.name]: value
    });
  };
}
