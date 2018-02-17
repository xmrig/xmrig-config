'use strict';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StartContainer from '../containers/nvidia/StartContainer';
import NetworkContainer from '../containers/nvidia/NetworkContainer';
import ThreadsContainer from '../containers/nvidia/ThreadsContainer';
import MiscContainer from '../containers/nvidia/MiscContainer';
import ResultContainer from '../containers/nvidia/ResultContainer';
import NoMatch from "./NoMatch";
import {KIND_NVIDIA_LEGACY} from "../constants/options";
import ResultRedirectContainer from "../containers/nvidia/ResultRedirectContainer";


const routes = () => {
  return (
    <Switch>
      <Route exact path={`/${KIND_NVIDIA_LEGACY}`} component={StartContainer} />
      <Route exact path={`/${KIND_NVIDIA_LEGACY}/network`} component={NetworkContainer} />
      <Route exact path={`/${KIND_NVIDIA_LEGACY}/threads`} component={ThreadsContainer} />
      <Route exact path={`/${KIND_NVIDIA_LEGACY}/misc`} component={MiscContainer} />
      <Route exact path={`/${KIND_NVIDIA_LEGACY}/result`} component={ResultRedirectContainer} />
      <Route exact path={`/${KIND_NVIDIA_LEGACY}/result/:id`} component={ResultContainer} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default routes;
