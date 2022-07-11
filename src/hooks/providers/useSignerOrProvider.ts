import { SignerOrProvider } from 'types'
import { useMemo } from 'react'
import { useNetwork, useProvider, useSigner } from 'wagmi'

export const useSignerOrProvider = (): SignerOrProvider => {
    const { chain: activeChain } = useNetwork()
    const { data: signer } = useSigner()
    const provider = useProvider({ chainId: activeChain?.id })

    return useMemo<SignerOrProvider>(() => {
        const signerOrProvider = signer || provider
        return signerOrProvider
    }, [signer, provider])
}
