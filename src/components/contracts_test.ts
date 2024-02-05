import { erc20ABI } from 'wagmi'
import erc1155ABIJSON from '../utils/erc1155-abi.json'
import rescueABI from '../utils/zkMochiRescue-abi.json'

export const raresourcesContractConfig = {
  address: '0x2F31ac0C3C4BC1ed24bDEBFEF33c3F2a756fA9b0',
  abi: erc1155ABIJSON,
} as const

export const rescueContractConfig = {
  address: '0x5111DC2AC610aA26423CabA3AeE9f2Ebfc5cc6e3',
  abi: rescueABI,
} as const