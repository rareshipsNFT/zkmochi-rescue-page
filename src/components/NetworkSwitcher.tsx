'use client'

import { Button } from '@geist-ui/core'
import { Grid, Text } from '@geist-ui/core'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <div>
      <Grid.Container gap={2}>
      <Grid xs={24} justify="center">
        Connected to {chain?.name ?? chain?.id}
        {chain?.unsupported && ' (unsupported)'}
        {' '}with {address}
      </Grid>
      <br />
      {switchNetwork && (
        <Grid.Container xs={24} justify="center" gap={2}>
          <Grid>
            <Text>Switch to:{' '}</Text>
          </Grid>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <Grid key={x.id}>
              <Button key={x.id} onClick={() => switchNetwork(x.id)} placeholder={undefined}>
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </Button>
              </Grid>
            ),
          )}
        </Grid.Container>        
      )}
      </Grid.Container>

      <div>{error?.message}</div>
    </div>
  )
}
