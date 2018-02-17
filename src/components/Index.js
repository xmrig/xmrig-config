'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import products from '../constants/products';
import {KIND_AMD_LEGACY, KIND_NVIDIA_LEGACY, KIND_PROXY, KIND_XMRIG} from "../constants/options";


export default class Index extends React.PureComponent {
  render() {
    return (
      <div>
        <Navbar type="" path="" />

        <div className="container">
          <div className="jumbotron">
            <h1>XMRig config generator & editor</h1>
            <p>
              {Index.renderProduct(KIND_XMRIG)}{' '}
              {Index.renderProduct(KIND_AMD_LEGACY)}{' '}
              {Index.renderProduct(KIND_NVIDIA_LEGACY)}{' '}
              {Index.renderProduct(KIND_PROXY)}
            </p>
          </div>
        </div>
      </div>
    );
  }


  static renderProduct(id) {
    const product = products[id];

    return <Link className="btn btn-primary" to={`/${id}`} role="button">{product.name}</Link>;
  }
}
