'use strict';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { serialize } from '../lib/config';


const ResultRedirectContainer = ({type, config}) => (
  <Redirect to={`/${type}/result/${serialize(type, config)}`} />
);


export default ResultRedirectContainer;
