import { BigNumber } from 'ethers'
import { getLensHubContract } from 'actions'

export const checkIfProfileExists = async (
    profileId: BigNumber
): Promise<Boolean> => {
    const lensHub = await getLensHubContract()
    const handle = await lensHub.getHandle(profileId)
    return handle !== ''
}
