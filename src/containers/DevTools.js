'use strict';

import React from 'react'
import createDevTools from 'redux-devtools/lib/createDevTools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'


export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" changeMonitorKey='ctrl-m' defaultIsVisible={false}>
    <LogMonitor />
  </DockMonitor>
);
