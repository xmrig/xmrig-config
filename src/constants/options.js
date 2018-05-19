'use strict';

export const KIND_XMRIG         = 'xmrig';
export const KIND_PROXY         = 'proxy';
export const KIND_AMD_LEGACY    = 'amd';
export const KIND_NVIDIA_LEGACY = 'nvidia';

export const ALGO_CRYPTONIGHT       = 0;
export const ALGO_CRYPTONIGHT_LITE  = 1;
export const ALGO_CRYPTONIGHT_HEAVY = 2;

export const OS_WINDOWS   = 0;
export const OS_LINUX     = 1;
export const OS_X         = 2;

export const MODE_AUTO        = 0;
export const MODE_MANUAL      = 1;
export const MODE_NONE        = 2;
export const MODE_SIMPLE      = 3;
export const MODE_ADVANCED    = 4;
export const MODE_UNAVAILABLE = 5;


export const algoName = (algo, version) => {
  if (version < 20600) {
    return algo === ALGO_CRYPTONIGHT_LITE ? 'cryptonight-lite' : 'cryptonight';
  }

  switch (algo) {
    case ALGO_CRYPTONIGHT:
      return 'cryptonight';

    case ALGO_CRYPTONIGHT_LITE:
      return 'cryptonight-lite';

    case ALGO_CRYPTONIGHT_HEAVY:
      return 'cryptonight-heavy';

    default:
      break;
  }

  return 'cryptonight';
};
