import { constants } from 'ethers'
import { getLensHubContract } from 'actions'
import { getAccount } from '@wagmi/core'

export const getProfileIdByAddress = async (
    address: string,
    profileNum?: number
) => {
    const lensHub = await getLensHubContract()
    const profileId = await lensHub.tokenOfOwnerByIndex(
        address,
        profileNum || 0
    )
    return profileId
}

export const getMyProfileId = async (profileNum?: number) => {
    const user = getAccount()
    const lensHub = await getLensHubContract()
    const myProfileId = await lensHub.tokenOfOwnerByIndex(
        user?.address || constants.AddressZero,
        profileNum || 0
    )
    return myProfileId
}

export const getProfileIdByHandle = async (handle: string) => {
    const lensHub = await getLensHubContract()
    const profileId = await lensHub.getProfileIdByHandle(handle)
    return profileId
}

export const getProfileId = async (handleOrAddress: string) => {
    const isHandle =
        handleOrAddress.includes('.lens') || handleOrAddress.includes('.test')
    const profileId = isHandle
        ? await getProfileIdByHandle(handleOrAddress)
        : await getProfileIdByAddress(handleOrAddress)
    return profileId
}
