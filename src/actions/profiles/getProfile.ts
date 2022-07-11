import { BigNumber } from 'ethers'
import {
    getLensHubContract,
    getAddressByProfileId,
    getProfileIdByHandle,
    getMyProfileId,
    getProfileIdByAddress,
} from 'actions'
import { Profile } from 'types'

export const getProfileByProfileId = async (profileId: BigNumber) => {
    const lensHub = await getLensHubContract()
    const profileAddress = await getAddressByProfileId(profileId)
    const profileData = await lensHub.getProfile(profileId)
    const profile = new Profile(
        profileId,
        profileAddress,
        profileData.pubCount,
        profileData.followModule,
        profileData.followNFT,
        profileData.handle,
        profileData.imageURI,
        profileData.followNFTURI
    )
    return profile
}

export const getProfileByAddress = async (address: string) => {
    const lensHub = await getLensHubContract()
    const profileId = await getProfileIdByAddress(address)
    const profileData = await lensHub.getProfile(profileId)
    const profile = new Profile(
        profileId,
        address,
        profileData.pubCount,
        profileData.followModule,
        profileData.followNFT,
        profileData.handle,
        profileData.imageURI,
        profileData.followNFTURI
    )
    return profile
}

export const getProfileByHandle = async (handle: string) => {
    const lensHub = await getLensHubContract()
    const profileId = await getProfileIdByHandle(handle)
    const profileAddress = await getAddressByProfileId(profileId)
    const profileData = await lensHub.getProfile(profileId)
    const profile = new Profile(
        profileId,
        profileAddress,
        profileData.pubCount,
        profileData.followModule,
        profileData.followNFT,
        profileData.handle,
        profileData.imageURI,
        profileData.followNFTURI
    )
    return profile
}

export const getMyProfile = async () => {
    const lensHub = await getLensHubContract()
    const myProfileId = await getMyProfileId()
    const myProfileData = await lensHub.getProfile(myProfileId)
    return myProfileData
}

export const getProfile = async (
    profileIdOrHandleOrAddress: BigNumber | string
) => {
    let isHandle, isAddress, isProfileId
    if (typeof profileIdOrHandleOrAddress === 'string') {
        isHandle =
            profileIdOrHandleOrAddress.includes('.lens') ||
            profileIdOrHandleOrAddress.includes('.test')
        isAddress = !isHandle && profileIdOrHandleOrAddress.includes('0x')
    } else {
        isProfileId = true
    }
    const profile = isHandle
        ? await getProfileByHandle(profileIdOrHandleOrAddress as string)
        : isAddress
        ? await getProfileByAddress(profileIdOrHandleOrAddress as string)
        : isProfileId
        ? await getProfileByProfileId(profileIdOrHandleOrAddress as BigNumber)
        : undefined
    return profile
}
