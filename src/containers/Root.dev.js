'use strict';

import React from 'react'
import DevTools from './DevTools';
import routes from '../routes';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';


const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <ConnectedRouter history={history}>
        {routes()}
      </ConnectedRouter>
      <DevTools />
    </div>
  </Provider>
);


export default Root;
