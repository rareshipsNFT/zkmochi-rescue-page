import { erc20ABI } from 'wagmi'
import erc1155ABIJSON from '../utils/erc1155-abi.json'
import rescueABI from '../utils/zkMochiRescue-abi.json'

export const daiContractConfig = {
  address: '0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b', // zkSync Era Goerli Testnet DAI token address
  abi: erc20ABI,
} as const

export const raresourcesContractConfig = {
  address: '0x458cc809357e4141604cc3f0d3d475e73ccf6ecd',
  abi: erc1155ABIJSON,
} as const

export const rescueContractConfig = {
  address: '0x5111DC2AC610aA26423CabA3AeE9f2Ebfc5cc6e3',
  abi: rescueABI,
} as const