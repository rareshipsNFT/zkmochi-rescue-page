'use client'

import { useAccount, useContractReads } from 'wagmi'

import { raresourcesContractConfig } from './contracts'
import { stringify } from '../utils/stringify'
import { Grid, Text } from '@geist-ui/core';
import { use } from 'react';
import { formatEther, parseEther, parseGwei } from 'viem';

export function RaresourcesBalances() {
  const { address } = useAccount();
  const { data, isSuccess, isLoading } = useContractReads({
    contracts: [
      {
        ...raresourcesContractConfig,
        functionName: 'balanceOfBatch',
        args: [[address!,address!,address!], [1,2,3]],
      },
    ],
  })

  let [balanceOfSteel, balanceOfWafer, balanceOfCells] = (!isLoading && isSuccess) ? [
    formatEther(data[0].result[2]),
    formatEther(data[0].result[0]),
    formatEther(data[0].result[1]),
  ] : [0, 0, 0];



  console.log('balanceOfSteel', balanceOfWafer);
  console.log('balanceOfWafer', balanceOfWafer);
  console.log('balanceOfCells', balanceOfCells);

  return (
    <Grid.Container gap={0} justify="center">

      <Grid xs={24} justify="center"><Text h3>Your Raresource Balances:</Text></Grid>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <Grid.Container xs={24} justify='center' gap={0}>
          <pre height={"fit-content"} h4>Steel: {balanceOfSteel} </pre>
          <pre height={"fit-content"} h4>Wafer: {balanceOfWafer} </pre>
          <pre height={"fit-content"} h4>Cells: {balanceOfCells}</pre>
        </Grid.Container>
      )}
    </Grid.Container>
  )
}
