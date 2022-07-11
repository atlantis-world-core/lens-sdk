import { FollowNFT__factory } from 'types/contracts'
import { useMemo } from 'react'
import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'
import { useSignerOrProvider } from 'hooks'

export const useFollowNFT = (address?: string | undefined) => {
    const signerOrProvider = useSignerOrProvider()
    return useMemo(
        () =>
            FollowNFT__factory.connect(
                address ||
                    CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]
                        .FollowNFT,
                signerOrProvider
            ),
        [address, signerOrProvider]
    )
}
