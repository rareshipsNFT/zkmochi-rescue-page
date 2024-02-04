'use client';
import { Button, Grid, useScale } from '@geist-ui/core';
import { useState } from 'react';
import { BaseError } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { IoClose } from 'react-icons/io5';
export function Connect() {
	const { connector, isConnected } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect();
	const { disconnect } = useDisconnect();
	const [showConnectWallet, setShowConnectWallet] = useState(false);
	return (
		<div className="">
			<Grid.Container
				justify="center"
				gap={2}
			>
				{isConnected && (
					<Grid
						xs={24}
						key="Disconnect"
						justify="center"
					>
						<Button
							onClick={() => {
								setShowConnectWallet(false);
								disconnect();
							}}
							placeholder={undefined}
						>
							Disconnect from {connector?.name}
						</Button>
					</Grid>
				)}
				{!isConnected && !showConnectWallet && (
					<Button
						key="Connect"
						onClick={() => {
							setShowConnectWallet(true);
						}}
						style={{ color: '#000' }}
						placeholder={'Connect Wallet'}
						className="bg-white p-[10px] font-semibold px-[25px] rounded-lg  text-black"
					>
						Connect Wallet
					</Button>
				)}
				{!isConnected && showConnectWallet && (
					<div className="fixed z-50 flex flex-col justify-center items-center  w-screen h-screen inset-0 ">
						<button
							onClick={() => setShowConnectWallet(false)}
							className="text-white  absolute z-20 top-5 right-5 text-3xl"
						>
							<IoClose
								color="#fff"
								className="text-white"
							/>
						</button>
						<div className="absolute  backdrop-blur	 w-full h-full top-0 left-0 bg-[#00000075]"></div>
						<div>
							{connectors
								.filter((x) => x.ready && x.id !== connector?.id)
								.map((x) => (
									<Grid
										key={x.id}
										xs={24 / connectors.length}
										justify="center"
									>
										<Button
											className="text-black"
											onClick={() => connect({ connector: x })}
											placeholder={undefined}
										>
											{x.name}
											{isLoading &&
												x.id === pendingConnector?.id &&
												' (connecting)'}
										</Button>
									</Grid>
								))}
						</div>
					</div>
				)}
			</Grid.Container>
			{error && <div>{(error as BaseError).shortMessage}</div>}
		</div>
	);
}
