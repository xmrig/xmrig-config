'use strict';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StartContainer from '../containers/amd/StartContainer';
import NetworkContainer from '../containers/amd/NetworkContainer';
import ThreadsContainer from '../containers/amd/ThreadsContainer';
import MiscContainer from '../containers/amd/MiscContainer';
import ResultContainer from '../containers/amd/ResultContainer';
import NoMatch from "./NoMatch";
import {KIND_AMD_LEGACY} from "../constants/options";
import ResultRedirectContainer from "../containers/amd/ResultRedirectContainer";


const routes = () => {
  return (
    <Switch>
      <Route exact path={`/${KIND_AMD_LEGACY}`} component={StartContainer} />
      <Route exact path={`/${KIND_AMD_LEGACY}/network`} component={NetworkContainer} />
      <Route exact path={`/${KIND_AMD_LEGACY}/threads`} component={ThreadsContainer} />
      <Route exact path={`/${KIND_AMD_LEGACY}/misc`} component={MiscContainer} />
      <Route exact path={`/${KIND_AMD_LEGACY}/result`} component={ResultRedirectContainer} />
      <Route exact path={`/${KIND_AMD_LEGACY}/result/:id`} component={ResultContainer} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default routes;
