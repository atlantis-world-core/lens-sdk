import { ProfileCreationProxy__factory } from 'types/contracts'
import { useMemo } from 'react'
import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'
import { useSignerOrProvider } from 'hooks'

export const useProfileCreationProxy = () => {
    const signerOrProvider = useSignerOrProvider()
    return useMemo(
        () =>
            ProfileCreationProxy__factory.connect(
                CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]
                    .ProfileCreationProxy,
                signerOrProvider
            ),
        [signerOrProvider]
    )
}
