'use strict';

import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import Icon from '@fortawesome/react-fontawesome';
import products from '../constants/products';
import {KIND_AMD_LEGACY, KIND_NVIDIA_LEGACY, KIND_PROXY, KIND_XMRIG} from "../constants/options";


export default class Navbar extends React.PureComponent {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand"><img alt="Brand" src="/assets/img/xmrig_logo.svg" width={32} height={32} style={{marginTop:-6}} /></Link>
            <Link to="/" className="navbar-brand">XMRig CONFIG</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  {this.props.type ? products[this.props.type].name : 'Products'} <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  {this.renderProduct(KIND_XMRIG)}
                  {this.renderProduct(KIND_AMD_LEGACY)}
                  {this.renderProduct(KIND_NVIDIA_LEGACY)}
                  <li className="divider" />
                  {this.renderProduct(KIND_PROXY)}
                </ul>
              </li>
              <li className={cn({ active: this.props.path === '/presets' })}><Link to="/presets"><Icon icon="sliders-h" /> Presets</Link></li>
            </ul>
            <p className="navbar-text navbar-right">
              <a title="Twitter" href="https://twitter.com/xmrig_dev" target="_blank" className="navbar-link" style={{ marginRight: 12 }}><Icon size="lg" icon={['fab', 'twitter']} /></a>
              <a title="reddit" href="https://www.reddit.com/u/XMRig" target="_blank" className="navbar-link" style={{ marginRight: 12 }}><Icon size="lg" icon={['fab', 'reddit']} /></a>
              <a title="Telegram" href="https://t.me/xmrig" target="_blank" className="navbar-link" style={{ marginRight: 12 }}><Icon size="lg" icon={['fab', 'telegram']} /></a>
              <a title="GitHub" href="https://github.com/xmrig/xmrig-config" target="_blank" className="navbar-link"><Icon size="lg" icon={['fab', 'github']} /></a>
            </p>
          </div>
        </div>
      </nav>
    );
  }


  renderProduct(type) {
    const getLink = (type, path) => {
      switch (path) {
        case '':
        case '/network':
        case '/misc':
        case '/result':
          return `/${type}${path}`;

        case '/threads':
          return type === KIND_PROXY ? `/${type}` : `/${type}${path}`;

        default:
          return `/${type}`;
      }
    };

    return <li className={cn({ active: this.props.type === type })}><Link to={getLink(type, this.props.path)}>{products[type].name}</Link></li>;
  }
}
