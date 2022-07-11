import { BigNumber } from 'ethers'
import { getLensHubContract } from 'actions'

export const getAddressByProfileId = async (profileId: BigNumber) => {
    const lensHub = await getLensHubContract()
    const address = await lensHub.ownerOf(profileId)
    return address
}
