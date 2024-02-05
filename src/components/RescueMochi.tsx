'use client';


import { Button, Input, Spacer, Text, useInput } from '@geist-ui/core'
import {Grid} from '@geist-ui/core'
import { use, useEffect, useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useContractReads, useContractWrite, useSendTransaction, useWaitForTransaction } from 'wagmi'
import { raresourcesContractConfig, rescueContractConfig } from './contracts_test'

import { stringify } from '../utils/stringify';

export function RescueMochi() {
	const { data, error, isLoading, isError, sendTransaction } =
		useSendTransaction();
	const {
		data: receipt,
		isLoading: isPending,
		isSuccess,
	} = useWaitForTransaction({ hash: data?.hash });

	// useInput
	const { state, setState, reset, bindings } = useInput('0');

	const [cost, setCost] = useState([0, 0, 0]);

	useEffect(() => {
		let num = parseInt(state);
		// set cost to [count * 100, count * 50, count * 20]
		setCost([num * 100, num * 50, num * 20]);
	}, [state]);

  // get address of user
  const { address } = useAccount();

  const { data: isApprovedForAll, isSuccess: isApprovedForAllSuccess, isLoading: isApprovedForAllLoading } = useContractReads({
    contracts: [
      {
        ...raresourcesContractConfig,
        functionName: 'isApprovedForAll',
        args: [address!, rescueContractConfig.address],
      },
    ],
  })
  const isApproved = isApprovedForAll ? isApprovedForAll[0].result : false;
  console.log('isApproved', isApproved);

  // approve stuff
  const { 
    write: writeSetApprovalForAll, 
    data: dataSetApprovalForAll, 
    error: errorSetApprovalForAll, 
    isLoading: isLoadingSetApprovalForAll, 
    isError: isErrorSetApprovalForAll,
   } = useContractWrite({
    ...raresourcesContractConfig,
    functionName: 'setApprovalForAll',
  })
  
  const {
    data: receiptSetApprovalForAll,
    isLoading: isPendingSetApprovalForAll,
    isSuccess: isSuccessSetApprovalForAll,
  } = useWaitForTransaction({ hash: dataSetApprovalForAll?.hash })
  
  const approve = async () => {
    writeSetApprovalForAll({ args: [rescueContractConfig.address, true] });
  }

  // rescue stuff
  const {
    write: writeRescue,
    data: dataRescue,
    error: errorRescue,
    isLoading: isLoadingRescue,
    isError: isErrorRescue,
  } = useContractWrite({
    ...rescueContractConfig,
    functionName: 'rescueMochi',
  })
  const {
    data: receiptRescue,
    isLoading: isPendingRescue,
    isSuccess: isSuccessRescue,
  } = useWaitForTransaction({ hash: dataRescue?.hash })

  const rescue = async () => {
    writeRescue({ args: [state] });
  }
  
  return (
		<div className="bg-[#f1b0ff] text-black space-y-[20px] w-fit p-[20px] rounded-lg">
      <Grid.Container gap={2} justify="center">
        <Grid
          xs={24}
          justify="center"
        >
          <Text h3>
            {' '}
            <div className="text-3xl font-semibold">Rescue Mochi</div>{' '}
          </Text>
        </Grid>
        <Grid
          xs={24}
          justify="center"
        >
          <Spacer h={0.5} />
          <input
            {...bindings}
            name="count"
            placeholder="Number of zkMochi"
            className="rounded-lg bg-[#ffffff82] border-2 border-[#ffffffb5] focus:outline-none py-[5px] px-[10px]"
          />
          <Spacer h={0.5} />
          <p className="font-[300] text-[14px]">
            <strong>Cost:</strong> Steel : {cost[0] || 0} Wafer : {cost[1] || 0}{' '}
            Cells :{cost[2] || 0}{' '}
          </p>
        </Grid>
        <Grid xs={24} justify="center">
          {!isApproved && !isLoadingSetApprovalForAll && <Button type="secondary" onClick={approve} placeholder={undefined}>Approve</Button>}
          {isApproved && !isLoadingRescue && <Button type="secondary" onClick={rescue} placeholder={undefined}>Rescue</Button>}
          {isLoadingSetApprovalForAll && <div>Approving...</div>}
          {isLoadingRescue && <div>Rescuing...</div>}
        </Grid>
        <Grid xs={24} justify="center">
          {isSuccessSetApprovalForAll && <div>Approval Transaction Hash: {dataSetApprovalForAll?.hash}</div>}
          {isSuccessRescue && <div>Rescue Transaction Hash: {dataRescue?.hash}</div>}
        </Grid>
        <Grid xs={24} justify="center">
          {isErrorSetApprovalForAll && <div>Error: {errorSetApprovalForAll?.message}</div>}
          {isErrorRescue && <div>Error: {errorRescue?.message.split('Contract Call')[0]}</div>}
        </Grid>
      </Grid.Container>
		</div>
	);

}
