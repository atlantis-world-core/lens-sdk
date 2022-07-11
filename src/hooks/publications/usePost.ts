import { useMutation } from 'react-query'
import { post, PostOptions } from 'actions'

export const usePost = () =>
    useMutation(['post'], async (options: PostOptions) => {
        const newPublication = await post(options)
        return newPublication
    })
