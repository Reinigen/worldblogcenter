'use client'

import { deleteComment } from "../../../features/comments/commentActions"
import { supabase } from "../../../supabase"
import { useAppDispatch } from "../../hooks"
import { commentApi } from "../../services/comments/commentService"

const DeleteCommentButton = ({commentId, oldImageUrl}:{commentId:string, oldImageUrl: string | null}) => {
    const dispatch = useAppDispatch()

    const deleteCommentFunction = async () => {
        if(!commentId) return

        // delete the old image from the bucket
        if (oldImageUrl) {
            const oldPath = oldImageUrl.split('/WorldCenterBucket/')[1]
            await supabase.storage
                .from('WorldCenterBucket')
                .remove([oldPath])
        }

        dispatch(deleteComment(commentId)).then(() =>{
            dispatch(commentApi.util.invalidateTags(['Comments']))
        })
    }

    return(
        <div className="px-3">
            <button type="button" className="btn btn-danger" onClick={() => {deleteCommentFunction()}}>
                Delete
            </button>
        </div>
    )
}

export default DeleteCommentButton