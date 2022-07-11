import { useMutation } from 'react-query'
import { collect, CollectOptions } from 'actions'

export const useCollect = () =>
    useMutation(['collect'], async (options: CollectOptions) => {
        const receipt = await collect(options)
        return receipt
    })
