import { BigNumber, BytesLike } from 'ethers'
import { getLensHubContract } from 'actions'
export interface CollectOptions {
    profileId: BigNumber
    pubId: BigNumber
    collectModuleData?: BytesLike | undefined
}

export const collect = async ({
    profileId,
    pubId,
    collectModuleData,
}: CollectOptions) => {
    const lensHub = await getLensHubContract()
    const tx = await lensHub.collect(
        profileId,
        pubId,
        collectModuleData || [],
        {
            gasLimit: 1_000_000,
        }
    )
    const receipt = await tx.wait()
    return receipt
}
