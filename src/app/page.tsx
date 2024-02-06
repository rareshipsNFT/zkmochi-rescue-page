'use client';

import { Grid, Text } from '@geist-ui/core';
import { Account } from '../components/Account';
import { Balance } from '../components/Balance';
import { BlockNumber } from '../components/BlockNumber';
import { Connect } from '../components/Connect';
import { Connected } from '../components/Connected';
import { NetworkSwitcher } from '../components/NetworkSwitcher';
import { RaresourcesBalances } from '../components/RaresourcesBalances';
import { ReadContract } from '../components/ReadContract';
import { ReadContracts } from '../components/ReadContracts';
import { RescueMochi } from '../components/RescueMochi';
import { SendTransaction } from '../components/SendTransaction';
import { SendTransactionPrepared } from '../components/SendTransactionPrepared';
import { SignMessage } from '../components/SignMessage';
import { SignTypedData } from '../components/SignTypedData';
import { Token } from '../components/Token';
import { WatchContractEvents } from '../components/WatchContractEvents';
import { WatchPendingTransactions } from '../components/WatchPendingTransactions';
import { WriteContract } from '../components/WriteContract';
import { WriteContractPrepared } from '../components/WriteContractPrepared';
import Image from 'next/image';
import MochiLogo from '../../public/Mochi.png';
import { useNetwork, useSwitchNetwork } from 'wagmi';
export default function Page() {

	const { chain } = useNetwork()
	const { chains, error, isLoading, pendingChainId, switchNetwork } =
		useSwitchNetwork()

	console.log("chain id:", chain?.id, chain?.name, chain?.unsupported)
	const isZkSync = chain?.id === 324

	return (
		<div className="p-[50px] h-screen overflow-hidden text-white bg-[#141414] relative">
			<img
				src={MochiLogo.src}
				alt="Mochi Logo"
				width={400}
				height={400}
				className="absolute bottom-0"
			/>
			<Grid.Container
				gap={2}
				justify="center"
				className="flex"
			>
				<div className="flex lg:flex-row flex-col justify-center items-center  w-full lg:justify-between">
					<Text h1>
						<p className="text-xl font-semibold pb-[10px] lg:pb-0">
							zkMochi Rescue Site
						</p>
					</Text>

					<Connect />
				</div>
				<Connected>
					{!isZkSync && (
						<Grid.Container gap={2}>
							<Grid xs={24} justify="center">
								<NetworkSwitcher />
							</Grid>
						</Grid.Container>
					)}
					{isZkSync && (
						<div className="space-y-[100px] flex flex-col justify-center">
							<Grid
								xs={24}
								justify="center"
							>
								<RaresourcesBalances />
							</Grid>
							<Grid
								xs={24}
								justify="center"
							>
								<RescueMochi />
							</Grid>
						</div>
					)}
				</Connected>
			</Grid.Container>
		</div>
	);
}
