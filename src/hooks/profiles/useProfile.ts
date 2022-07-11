import { BigNumber } from 'ethers'
import { useQuery } from 'react-query'
import { getProfile } from 'actions'
import { useProfileId } from 'hooks'

export const useProfile = (
    profileIdOrHandleOrAddress?: BigNumber | string | undefined
) => {
    const { data: profileId } = useProfileId(profileIdOrHandleOrAddress)

    return useQuery(
        ['get-profile', profileId],
        async () => {
            if (!profileId) return
            const profile = await getProfile(profileId)
            return profile
        },
        {
            enabled: !!profileId,
            retry: 0,
            cacheTime: 0,
            refetchOnWindowFocus: false,
        }
    )
}
