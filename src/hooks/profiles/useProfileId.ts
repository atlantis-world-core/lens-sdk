import { useQuery } from 'react-query'
import { BigNumber } from 'ethers'
import { getMyProfileId, getProfileId } from 'actions'

/**
 * Hook converts any of possible profile identificators to profileId. As well as return your own profile id if param is undefined. Useful to use inside other hooks.
 * @param profileIdOrHandleOrAddress identificators of user or undefined to get own profile id.
 * @returns profileId of user or yours to use with other hooks and actions.
 */
export const useProfileId = (
    profileIdOrHandleOrAddress?: BigNumber | string | undefined
) =>
    useQuery(['get-profile-id', profileIdOrHandleOrAddress], async () => {
        let profileId: BigNumber
        if (!profileIdOrHandleOrAddress) {
            profileId = await getMyProfileId()
        } else {
            const isProfileId =
                typeof profileIdOrHandleOrAddress !== 'string' ||
                /^\d+$/.test(profileIdOrHandleOrAddress)
            profileId = isProfileId
                ? profileIdOrHandleOrAddress === 'string'
                    ? BigNumber.from(profileIdOrHandleOrAddress)
                    : (profileIdOrHandleOrAddress as BigNumber)
                : await getProfileId(profileIdOrHandleOrAddress as string)
        }
        return profileId
    })
