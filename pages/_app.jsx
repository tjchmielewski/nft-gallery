import '../styles/globals.css'
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { connectors } from '../utils/Connectors'
import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)
 
const client = createClient({
  connectors,
  provider,
  webSocketProvider,
});

console.log('client', client)

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
