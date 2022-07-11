import { useMutation } from 'react-query'
import { comment, CommentOptions } from 'actions'

export const useComment = () =>
    useMutation(['comment'], async (options: CommentOptions) => {
        const newComment = await comment(options)
        return newComment
    })
