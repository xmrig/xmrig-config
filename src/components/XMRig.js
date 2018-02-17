'use strict';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StartContainer from '../containers/xmrig/StartContainer';
import NetworkContainer from '../containers/xmrig/NetworkContainer';
import ThreadsContainer from '../containers/xmrig/ThreadsContainer';
import MiscContainer from '../containers/xmrig/MiscContainer';
import ResultContainer from '../containers/xmrig/ResultContainer';
import NoMatch from "./NoMatch";
import ResultRedirectContainer from "../containers/xmrig/ResultRedirectContainer";


const routes = () => {
  return (
    <Switch>
      <Route exact path="/xmrig" component={StartContainer} />
      <Route exact path="/xmrig/network" component={NetworkContainer} />
      <Route exact path="/xmrig/threads" component={ThreadsContainer} />
      <Route exact path="/xmrig/misc" component={MiscContainer} />
      <Route exact path="/xmrig/result" component={ResultRedirectContainer} />
      <Route exact path="/xmrig/result/:id" component={ResultContainer} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default routes;
