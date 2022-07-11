import { useMutation } from 'react-query'
import { BigNumber } from 'ethers'
import { follow } from 'actions'
import { useProfileId } from 'hooks'

export const useFollow = (profileIdOrHandleOrAddress: BigNumber | string) => {
    const { data: profileId } = useProfileId(profileIdOrHandleOrAddress)

    return useMutation(['follow', profileId], async () => {
        if (!profileId) return
        const receipt = await follow(profileId)
        return receipt
    })
}
