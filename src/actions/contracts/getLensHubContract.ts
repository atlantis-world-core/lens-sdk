import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'
import { LensHub__factory } from 'types/contracts'
import { getSignerOrProvider } from 'actions'

export const getLensHubContract = async () =>
    LensHub__factory.connect(
        CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]?.LensHub,
        await getSignerOrProvider()
    )
