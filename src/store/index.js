'use strict';

let store;

if (!store) {
  if (process.env.NODE_ENV === 'production') {
    store = require('./store.prod').default;
  } else {
    store = require('./store.dev').default;
  }
}

module.exports = store;
