export const SUPPORTED_CHAIN = {
  'ETH': '0x5',
  // 'ETH': '0x1',  // eth mainnet
  'BSC': '0x61' // bsc testnet
  // 'BSC': '0x38' // bsc mainnet
}

export const SUPPORTED_CHAIN_LABEL = {
  '0x5': 'ETH',
  '0x61': 'BSC' // bsc testnet
}

export const SUPPORTED_CHAIN_NAME = {
  '0x5': 'Goerli Tesnet',
  // 'ETH': 'Ethereum Mainnet',  // eth mainnet
  '0x61': 'BSC Testnet' // bsc testnet
  // 'BSC': 'BSC Mainnet' // bsc mainnet
}

export const formatAddress = (_address) => {
  if (_address === undefined || _address === "") return "-";
  return `${_address.substring(0, 7)}...${_address.substring(
    _address.length - 6,
    _address.length - 1
  )}`;
};

export const addCommas = (num) => {
  var str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
};

export const isSupportedChain = (chainId) => {
  for(const [key, value] of Object.entries(SUPPORTED_CHAIN)) {
    if(Number(value) === Number(chainId)) return true;
  }
  return false;
}
