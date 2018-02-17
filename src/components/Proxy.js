'use strict';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StartContainer from '../containers/proxy/StartContainer';
import NetworkContainer from '../containers/proxy/NetworkContainer';
import MiscContainer from '../containers/proxy/MiscContainer';
import ResultContainer from '../containers/proxy/ResultContainer';
import NoMatch from "./NoMatch";
import ResultRedirectContainer from "../containers/proxy/ResultRedirectContainer";


const routes = () => {
  return (
    <Switch>
      <Route exact path="/proxy" component={StartContainer} />
      <Route exact path="/proxy/network" component={NetworkContainer} />
      <Route exact path="/proxy/misc" component={MiscContainer} />
      <Route exact path="/proxy/result" component={ResultRedirectContainer} />
      <Route exact path="/proxy/result/:id" component={ResultContainer} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default routes;
