import { constants } from 'ethers'
import { DataTypes as LensDataTypes } from 'types/contracts/LensHub'
import { getAccount } from '@wagmi/core'
import {
    // getLensHubContract,
    getProfileCreationProxyContract,
    getProfile,
} from 'actions'

export interface CreateProfileOptions {
    handle: string
    imageURI?: string | undefined
}

export const createProfile = async ({
    handle,
    imageURI,
}: CreateProfileOptions) => {
    const user = getAccount()
    if (!user?.address) return

    // const lensHub = await getLensHubContract()
    const profileCreationProxy = await getProfileCreationProxyContract()

    const createProfileData: LensDataTypes.CreateProfileDataStruct = {
        to: user.address,
        handle: handle,
        imageURI:
            imageURI ||
            'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
        followModule: constants.AddressZero,
        followModuleInitData: [],
        followNFTURI: '',
    }

    // ONLY FOR WL USERS YET
    // const whitelistTx = await lensHub.whitelistProfileCreator(
    //   user.address,
    //   true
    // )
    // await whitelistTx.wait()
    // const createProfileTx = await lensHub.createProfile(createProfileData)

    // using whitelisted proxy instead
    const tx = await profileCreationProxy.proxyCreateProfile(
        createProfileData,
        {
            gasLimit: 1_000_000,
        }
    )
    await tx.wait()

    const profile = await getProfile(handle)
    return profile
}
