'use strict';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import XMRig from './components/XMRig';
import AMD from './components/AMD';
import NVIDIA from './components/NVIDIA';
import Proxy from './components/Proxy';
import NotificationContainer from './containers/NotificationContainer';
import ModalContainer from './containers/ModalContainer';
import NoMatch from "./components/NoMatch";
import {KIND_AMD_LEGACY, KIND_NVIDIA_LEGACY, KIND_PROXY, KIND_XMRIG} from "./constants/options";
import PresetsContainer from "./containers/PresetsContainer";


const routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path={`/${KIND_XMRIG}`} component={XMRig} />
        <Route path={`/${KIND_AMD_LEGACY}`} component={AMD} />
        <Route path={`/${KIND_NVIDIA_LEGACY}`} component={NVIDIA} />
        <Route path={`/${KIND_PROXY}`} component={Proxy} />
        <Route path="/presets" component={PresetsContainer} />
        <Route component={NoMatch} />
      </Switch>

      <NotificationContainer />
      <ModalContainer />
    </div>
  );
};

export default routes;
