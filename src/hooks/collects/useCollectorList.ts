import { useQuery } from 'react-query'
import { BigNumber } from 'ethers'
import { getCollectorList } from 'actions'
import { useProfileId } from 'hooks'

export const useCollectorList = (
    pubId: BigNumber,
    profileIdOrHandleOrAddress?: BigNumber | string | undefined
) => {
    const { data: profileId } = useProfileId(profileIdOrHandleOrAddress)

    return useQuery(
        ['get-collector-list', profileId],
        async () => {
            if (!profileId) return
            const collectorList = await getCollectorList(profileId, pubId)
            return collectorList
        },
        {
            enabled: !!profileId,
            retry: 0,
            cacheTime: 0,
            refetchOnWindowFocus: false,
        }
    )
}
