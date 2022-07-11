import { useQuery } from 'react-query'
import { BigNumber } from 'ethers'
import { getPublication } from 'actions'
import { useProfileId } from 'hooks'

/**
 *
 * @param profileIdOrHandleOrAddress author's profile identificator or undefined of it's owned by you
 * @param pubId id of publication
 * @returns Publication class entity or undefined
 */
export const usePublication = (
    pubId: BigNumber,
    profileIdOrHandleOrAddress?: BigNumber | string | undefined
) => {
    const { data: profileId } = useProfileId(profileIdOrHandleOrAddress)

    return useQuery(
        ['get-publication', profileId, pubId],
        async () => {
            if (!profileId) return
            const publication = await getPublication(profileId, pubId)
            return publication
        },
        {
            enabled: !!profileId,
            retry: 0,
            cacheTime: 0,
            refetchOnWindowFocus: false,
        }
    )
}
