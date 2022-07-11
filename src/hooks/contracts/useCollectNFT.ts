import { CollectNFT__factory } from 'types/contracts'
import { useMemo } from 'react'
import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'
import { useSignerOrProvider } from 'hooks'

export const useCollectNFT = (address?: string | undefined) => {
    const signerOrProvider = useSignerOrProvider()
    return useMemo(
        () =>
            CollectNFT__factory.connect(
                address ||
                    CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]
                        .CollectNFT,
                signerOrProvider
            ),
        [address, signerOrProvider]
    )
}
