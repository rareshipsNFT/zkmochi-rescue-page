'use client';

import { useAccount, useContractRead, useContractReads } from 'wagmi'

import { raresourcesContractConfig } from './contracts'
import { stringify } from '../utils/stringify'
import { Grid, Text } from '@geist-ui/core';
import { use } from 'react';
import { formatEther, parseEther, parseGwei } from 'viem';

export function RaresourcesBalances() {
  const { address } = useAccount();
  const { data, isSuccess, isLoading } = useContractRead({
      ...raresourcesContractConfig,
      functionName: 'balanceOfBatch',
      args: [[address!,address!,address!], [1,2,3]],
      enabled: true,
  })

  console.log('raresources data:', data)

  let [balanceOfSteel, balanceOfWafer, balanceOfCells] = (!isLoading && isSuccess && data) ? [
    // @ts-ignore
    formatEther(data[2]),
    // @ts-ignore
    formatEther(data[0]),
    // @ts-ignore
    formatEther(data[1]),
  ] : [0, 0, 0];

	console.log('balanceOfSteel', balanceOfWafer);
	console.log('balanceOfWafer', balanceOfWafer);
	console.log('balanceOfCells', balanceOfCells);

	return (
		<Grid.Container
			gap={0}
			justify="center"
			className="space-y-[10px]"
		>
			<Grid
				xs={24}
				justify="center"
			>
				<Text h3>
					{' '}
					<p className="text-xl font-[500] ">Raresources Balance</p>{' '}
				</Text>
			</Grid>
			{isLoading && <div>loading...</div>}
			{isSuccess && (
				<Grid.Container
					xs={24}
					justify="center"
					gap={0}
				>
					<div className="flex font-[250] space-x-[20px] items-center">
						<p>
							{' '}
							Steel: {''} <span className="text-base">{balanceOfSteel}</span>{' '}
						</p>{' '}
						<p>
							{' '}
							Wafer: <span>{balanceOfWafer} </span>
						</p>
						<p>
							{' '}
							Cells: <span>{balanceOfCells}</span>
						</p>
					</div>
				</Grid.Container>
			)}
		</Grid.Container>
	);
}
