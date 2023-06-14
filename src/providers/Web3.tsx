import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { publicProvider } from 'wagmi/providers/public'
import { ETH_CHAINS, SITE_NAME } from 'utils/config'
import { useColorMode } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const { provider, webSocketProvider } = configureChains(ETH_CHAINS, [publicProvider()])

const client = createClient(
  getDefaultClient({
    appName: SITE_NAME,
    autoConnect: true,
    chains:ETH_CHAINS,
    provider,
    webSocketProvider,
  })
)

export function Web3Provider(props: Props) {
  const { colorMode } = useColorMode()

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider mode={colorMode}>{props.children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
