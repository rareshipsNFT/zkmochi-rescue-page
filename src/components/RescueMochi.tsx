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
		<Grid.Container
			gap={2}
			justify="center"
		>
			<Grid
				xs={24}
				justify="center"
			>
				<Text h3>Rescue Mochi</Text>
			</Grid>
			<Grid
				xs={24}
				justify="center"
			>
				<Spacer h={0.5} />
				<Input
					{...bindings}
					name="count"
					placeholder="Number of zkMochi"
					crossOrigin={undefined}
				/>
				<Spacer h={0.5} />
				<pre>
					Cost: {cost[0] || 0} Steel / {cost[1] || 0} Wafer / {cost[2] || 0}{' '}
					Cells
				</pre>
			</Grid>
			<Grid
				xs={24}
				justify="center"
			>
				<Button
					type="secondary"
					placeholder={undefined}
				>
					Rescue
				</Button>
			</Grid>
		</Grid.Container>
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
