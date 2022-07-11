import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'
import { ProfileCreationProxy__factory } from 'types/contracts'
import { getSignerOrProvider } from 'actions'

export const getProfileCreationProxyContract = async () =>
    ProfileCreationProxy__factory.connect(
        CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]
            ?.ProfileCreationProxy,
        await getSignerOrProvider()
    )
