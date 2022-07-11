import { useMutation } from 'react-query'
import { CreateProfileOptions, createProfile } from 'actions'

export const useCreateProfile = () =>
    useMutation(
        ['create-profile'],
        async ({ handle, imageURI }: CreateProfileOptions) => {
            const profile = await createProfile({ handle, imageURI })
            return profile
        }
    )
