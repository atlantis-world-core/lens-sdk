import { useQuery } from 'react-query'
import { BigNumber } from 'ethers'
import { getFollowerList } from 'actions'
import { useProfileId } from 'hooks'

export const useFollowerList = (
    profileIdOrHandleOrAddress?: BigNumber | string | undefined
) => {
    const { data: profileId } = useProfileId(profileIdOrHandleOrAddress)

    return useQuery(
        ['get-follower-list', profileId],
        async () => {
            if (!profileId) return
            const followerList = await getFollowerList(profileId)
            return followerList
        },
        {
            enabled: !!profileId,
            retry: 0,
            cacheTime: 0,
            refetchOnWindowFocus: false,
        }
    )
}
