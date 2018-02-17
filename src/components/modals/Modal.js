'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';


export const Modal = ({ children }) => (
  <div className="modal-dialog">
    <div className="modal-content">
      {children}
    </div>
  </div>
);


export const Header = ({ children, dismiss }) => (
  <div className="modal-header">
    <button type="button" className="close" onClick={dismiss}><Icon icon="times-circle" size="lg" /></button>
    {children}
  </div>
);


export const Title = ({ children }) => (
  <h4 className="modal-title">
    {children}
  </h4>
);


export const Body = ({ children }) => (
  <div className="modal-body">
    {children}
  </div>
);


export const Footer = ({ children }) => (
  <div className="modal-footer">
    {children}
  </div>
);


export const Cancel = ({ dismiss }) => (
  <button type="button" className="btn btn-default hidden-xs" onClick={dismiss}><Icon icon="times" /> Cancel</button>
);


export const Spinner = ({ enabled }) => {
  if (!enabled) {
    return null;
  }

  return <span><i className="fa fa-spinner fa-spin fa-lg text-muted"/> </span>;
};
