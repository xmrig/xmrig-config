'use strict';


function sortObject(obj) {
  const out = {};

  Object.keys(obj).sort().forEach(key => {
    out[key] = obj[key]
  });

  return out;
}


export default sortObject;
