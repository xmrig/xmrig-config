'use strict';

import React from 'react';


const DismissibleAlert = ({ children, type, dismiss }) => (
  <div className={'alert alert-dismissible alert-' + (type || 'info')} role="alert">
    <button type="button" className="close" onClick={dismiss}>&times;</button>
    {children}
  </div>
);


export default DismissibleAlert;
