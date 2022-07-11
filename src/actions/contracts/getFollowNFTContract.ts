import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'
import { FollowNFT__factory } from 'types/contracts'
import { getSignerOrProvider } from 'actions'

export const getFollowNFTContract = async (address?: string | undefined) =>
    FollowNFT__factory.connect(
        address ||
            CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]?.FollowNFT,
        await getSignerOrProvider()
    )
