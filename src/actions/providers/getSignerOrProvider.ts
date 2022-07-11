import { getProvider, fetchSigner } from '@wagmi/core'
import { SUPPORTED_CHAIN_IDS } from '../../constants'

export const getSignerOrProvider = async () => {
    const signer = await fetchSigner()
    const provider = getProvider({
        chainId: SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI,
    })
    return signer || provider
}
