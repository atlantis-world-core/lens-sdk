import { BigNumber, constants, utils } from 'ethers'
import { DataTypes as LensDataTypes } from 'types/contracts/LensHub'
import {
    getLensHubContract,
    getMyLastPublication,
    getMyProfileId,
} from 'actions'
import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'

export interface CommentOptions {
    authorProfileId: BigNumber
    pubId: BigNumber
    profileId?: BigNumber | undefined
    contentURI?: string | undefined
}

export const comment = async ({
    authorProfileId,
    pubId,
    profileId,
    contentURI,
}: CommentOptions) => {
    const lensHub = await getLensHubContract()

    // WL feature for custom modules
    // await (
    //   await lensHub.whitelistCollectModule(
    //     CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI].FreeCollectModule,
    //     true
    //   )
    // ).wait()

    const commentData: LensDataTypes.CommentDataStruct = {
        profileId: profileId || (await getMyProfileId()),
        contentURI:
            contentURI ||
            'https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz',
        profileIdPointed: authorProfileId,
        pubIdPointed: pubId,
        collectModule:
            CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]
                .FreeCollectModule,
        collectModuleInitData: utils.defaultAbiCoder.encode(['bool'], [true]),
        referenceModule: constants.AddressZero,
        referenceModuleInitData: [],
        referenceModuleData: [],
    }

    const tx = await lensHub.comment(commentData, {
        gasLimit: 1_000_000,
    })
    await tx.wait()

    const newComment = await getMyLastPublication()
    return newComment
}
