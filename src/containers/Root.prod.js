'use strict';

import React from 'react';
import routes from '../routes';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';


const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes()}
    </ConnectedRouter>
  </Provider>
);


export default Root;
