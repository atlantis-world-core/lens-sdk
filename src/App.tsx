import { ChakraProvider } from '@chakra-ui/react'
import { LensPlayground } from 'components'
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains(
    [chain.polygon, chain.polygonMumbai],
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
})

const App = () => (
    <WagmiConfig client={client}>
        <ChakraProvider>
            <LensPlayground />
        </ChakraProvider>
    </WagmiConfig>
)

export default App
