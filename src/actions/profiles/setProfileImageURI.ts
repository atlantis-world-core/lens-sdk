import { BigNumber } from 'ethers'
import { getLensHubContract } from 'actions'

export const setProfileImageURI = async (
    profileId: BigNumber,
    imageURI: string
) => {
    const lensHub = await getLensHubContract()
    const tx = await lensHub.setProfileImageURI(profileId, imageURI)
    const receipt = await tx.wait()
    return receipt
}
