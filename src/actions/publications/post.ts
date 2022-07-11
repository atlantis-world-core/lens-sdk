import { BigNumber, constants, utils } from 'ethers'
import { DataTypes as LensDataTypes } from 'types/contracts/LensHub'
import {
    getLensHubContract,
    getMyLastPublication,
    getMyProfileId,
} from 'actions'
import { CONTRACT_ADDRESSES, SUPPORTED_CHAIN_IDS } from '../../constants'

export interface PostOptions {
    profileId?: BigNumber | undefined
    contentURI?: string | undefined
}

export const post = async ({ profileId, contentURI }: PostOptions) => {
    const lensHub = await getLensHubContract()

    // WL feature for custom modules
    // await (
    //   await lensHub.whitelistCollectModule(
    //     CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI].FreeCollectModule,
    //     true
    //   )
    // ).wait()
    const postData: LensDataTypes.PostDataStruct = {
        profileId: profileId || (await getMyProfileId()),
        contentURI:
            contentURI ||
            'https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz', // TODO: dynamicaly upload content into IPFS
        collectModule:
            CONTRACT_ADDRESSES[SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]
                .FreeCollectModule, // TODO: custom collect modules
        collectModuleInitData: utils.defaultAbiCoder.encode(['bool'], [true]),
        referenceModule: constants.AddressZero,
        referenceModuleInitData: [],
    }

    const tx = await lensHub.post(postData)
    await tx.wait()

    const newPublication = await getMyLastPublication()
    return newPublication
}
