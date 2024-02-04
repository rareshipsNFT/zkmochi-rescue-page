'use client';

import { Button, Input, Spacer, Text, useInput } from '@geist-ui/core';
import { Grid } from '@geist-ui/core';
import { use, useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';

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

	return (
		<div className="bg-[#f1b0ff] text-black space-y-[20px] w-fit p-[20px] rounded-lg">
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

			<Button
				type="secondary"
				placeholder={undefined}
				className="w-full"
				width={'100%'}
			>
				Rescue
			</Button>
		</div>
	);

	return (
		<>
			<Text h3>Rescue Mochi</Text>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target as HTMLFormElement);
					const address = formData.get('address') as string;
					const value = formData.get('value') as `${number}`;
					sendTransaction({
						to: address,
						value: parseEther(value),
					});
				}}
			>
				<Input
					name="address"
					placeholder="address"
					crossOrigin={undefined}
				/>
				<Input
					name="value"
					placeholder="value (ether)"
					crossOrigin={undefined}
				/>
				<Button type="submit">Send</Button>
			</form>

			{isLoading && <div>Check wallet...</div>}
			{isPending && <div>Transaction pending...</div>}
			{isSuccess && (
				<>
					<div>Transaction Hash: {data?.hash}</div>
					<div>
						Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
					</div>
				</>
			)}
			{isError && <div>Error: {error?.message}</div>}
		</>
	);
}
