'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Tabs from './Tabs';
import OclThreads from "./threads/OclThreads";
import {MODE_UNAVAILABLE} from "../constants/options";
import CUDAThreads from "./threads/CUDAThreads";
import CPUThreads from "./threads/CPUThreads";


export default class Threads extends React.PureComponent {
  render() {
    const { type } = this.props;

    return (
      <div>
        <Navbar type={type} path="/threads" />
        <div className="container">
          <Tabs type={type} path="/threads" />

          {this.renderCPU()}
          {this.renderOCL()}
          {this.renderCUDA()}
          <hr />

          <nav>
            <ul className="pager">
              <li><Link to={`/${type}/network`}>Previous</Link></li> <li><Link to={`/${type}/misc`}>Next</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }


  renderCPU() {
    const { cpuThreads } = this.props;

    if (cpuThreads && cpuThreads.mode !== MODE_UNAVAILABLE) {
      return <CPUThreads
        algo={this.props.algo}
        threads={cpuThreads}
        update={this.props.update}
        dispatch={this.props.dispatch}
      />
    }
  }


  renderOCL() {
    const { oclThreads } = this.props;

    if (oclThreads && oclThreads.mode !== MODE_UNAVAILABLE) {
      return <OclThreads
        mode={oclThreads.mode}
        platform={oclThreads.platform}
        threads={oclThreads.threads}
        update={this.props.update}
        dispatch={this.props.dispatch}
      />
    }
  }


  renderCUDA() {
    const { cudaThreads } = this.props;

    if (cudaThreads && cudaThreads.mode !== MODE_UNAVAILABLE) {
      return <CUDAThreads
        mode={cudaThreads.mode}
        os={this.props.os}
        max={cudaThreads.max}
        optimize={cudaThreads.optimize}
        bfactor={cudaThreads.bfactor}
        bsleep={cudaThreads.bsleep}
        threads={cudaThreads.threads}
        update={this.props.update}
        dispatch={this.props.dispatch}
      />
    }
  }
}
