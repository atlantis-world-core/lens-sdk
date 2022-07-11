import { LensHub__factory } from 'types/contracts'
import { useMemo } from 'react'
import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'
import { useSignerOrProvider } from 'hooks'

export const useLensHub = () => {
    const signerOrProvider = useSignerOrProvider()
    return useMemo(
        () =>
            LensHub__factory.connect(
                CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]?.LensHub,
                signerOrProvider
            ),
        [signerOrProvider]
    )
}
