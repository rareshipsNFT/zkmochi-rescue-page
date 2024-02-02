'use client'

import { Grid, Text } from '@geist-ui/core'
import { Account } from '../components/Account'
import { Balance } from '../components/Balance'
import { BlockNumber } from '../components/BlockNumber'
import { Connect } from '../components/Connect'
import { Connected } from '../components/Connected'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { RaresourcesBalances } from '../components/RaresourcesBalances'
import { ReadContract } from '../components/ReadContract'
import { ReadContracts } from '../components/ReadContracts'
import { RescueMochi } from '../components/RescueMochi'
import { SendTransaction } from '../components/SendTransaction'
import { SendTransactionPrepared } from '../components/SendTransactionPrepared'
import { SignMessage } from '../components/SignMessage'
import { SignTypedData } from '../components/SignTypedData'
import { Token } from '../components/Token'
import { WatchContractEvents } from '../components/WatchContractEvents'
import { WatchPendingTransactions } from '../components/WatchPendingTransactions'
import { WriteContract } from '../components/WriteContract'
import { WriteContractPrepared } from '../components/WriteContractPrepared'

export default function Page() {
  return (
    <div>
      <Grid.Container gap={2} justify="center">
        <Grid xs={24} justify="center">
          <Text h1>zkMochi Rescue Site</Text>
        </Grid>
        <Grid xs={24} justify="center">
          <Connect />
        </Grid>
        <Connected>
          <Grid xs={24} justify="center">
            <RaresourcesBalances />
          </Grid>
          <Grid xs={24} justify="center">
            <RescueMochi />
          </Grid>
        </Connected>
                
      </Grid.Container> 
    </div>
  )
}
