import { BigNumber } from 'ethers'
import { getLensHubContract } from 'actions'

export const getHandle = async (profileId: BigNumber) => {
    const lensHub = await getLensHubContract()
    const handle = await lensHub.getHandle(profileId)
    return handle
}
