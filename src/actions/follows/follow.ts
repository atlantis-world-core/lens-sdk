import { BigNumber } from 'ethers'
import { getLensHubContract } from 'actions'

export const follow = async (profileId: BigNumber) => {
    const lensHub = await getLensHubContract()
    const tx = await lensHub.follow([profileId], [[]], {
        gasLimit: 1_000_000,
    })
    const receipt = await tx.wait()
    return receipt
}
