import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'
import { CollectNFT__factory } from 'types/contracts'
import { getSignerOrProvider } from 'actions'

export const getCollectNFTContract = async (address?: string | undefined) =>
    CollectNFT__factory.connect(
        address ||
            CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]?.CollectNFT,
        await getSignerOrProvider()
    )
