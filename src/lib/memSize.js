'use strict';


const MEM_SIZE = [ 2, 1, 4 ];


function memSize(count, algo) {
  return count * MEM_SIZE[algo];
}


export default memSize;
