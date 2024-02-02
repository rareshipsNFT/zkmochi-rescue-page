'use client'
import { Button, Grid } from '@geist-ui/core'

import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'



export function Connect() {
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <Grid.Container justify='center' gap={2}>
        {isConnected && (
          <Grid xs={24} justify="center">
          <Button onClick={() => disconnect()} placeholder={undefined}>
            Disconnect from {connector?.name}
          </Button>
          </Grid>
        )}

        {!isConnected && connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <Grid key={x.id} xs={24 / connectors.length} justify="center">
            <Button onClick={() => connect({ connector: x })} placeholder={undefined}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </Button>
            </Grid>
          ))}
      </Grid.Container>
      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  )
}
