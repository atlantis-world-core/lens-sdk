import { BigNumber } from 'ethers'
import _ from 'lodash'
import { getFollowNFTContract, getProfile } from 'actions'
import { Profile } from 'types'

export const getFollowerList = async (profileId: BigNumber) => {
    const profile = await getProfile(profileId)
    if (!profile) return

    let followerList: Profile[] = []

    const profileFollowNFT = await getFollowNFTContract(profile.followNFT)
    const totalFollowers = (await profileFollowNFT.totalSupply()).toNumber()

    for (let followerId = 1; followerId <= totalFollowers; followerId++) {
        const followerAddress = await profileFollowNFT.ownerOf(followerId)
        const follower = await getProfile(followerAddress)
        if (!!follower) followerList.push(follower)
    }

    followerList = _.uniqBy(followerList, 'handle')
    return followerList
}
