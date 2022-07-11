import { useQuery } from 'react-query'
import { BigNumber } from 'ethers'
import { getPublicationList } from 'actions'
import { useProfileId } from 'hooks'

export const usePublicationList = (
    profileIdOrHandleOrAddress?: BigNumber | string | undefined
) => {
    const { data: profileId } = useProfileId(profileIdOrHandleOrAddress)

    return useQuery(
        ['get-publication-list', profileId],
        async () => {
            if (!profileId) return
            const publicationList = await getPublicationList(profileId)
            return publicationList
        },
        {
            enabled: !!profileId,
            retry: 0,
            cacheTime: 0,
            refetchOnWindowFocus: false,
        }
    )
}
