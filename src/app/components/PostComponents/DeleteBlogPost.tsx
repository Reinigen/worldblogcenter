'use client'

import { useAppDispatch } from "../../hooks"
import { useNavigate, useParams } from "react-router"
import { deletePost } from "../../../features/posts/postActions"
import { setCredentials } from "../../../features/auth/authSlice"
import { useEffect } from "react"
import { useGetUserDetailsQuery } from "../../services/auth/authService"
import { postApi } from "../../services/post/postService"
import { supabase } from "../../../supabase"

const DeleteBlogPost = ({ oldImageUrl }: { oldImageUrl: string | null }) => {
    const dispatch = useAppDispatch()
    const {blogId} = useParams()
    const navigate = useNavigate()

    const {data} = useGetUserDetailsQuery(undefined, {
            pollingInterval: 900000,
    })

    useEffect(() => {
        if(data) dispatch(setCredentials(data))
    }, [data, dispatch])

    const deletePostFunction = async () => {
        if(!blogId) return
         
        // delete the old image from the bucket
        if (oldImageUrl) {
            const oldPath = oldImageUrl.split('/WorldCenterBucket/')[1]
            await supabase.storage
                .from('WorldCenterBucket')
                .remove([oldPath])
        }
 
        dispatch(deletePost(blogId)).then(() => {
            dispatch(postApi.util.invalidateTags(['Posts']))
        })

        navigate("/blogs")
    } 
  return (
    <div className="px-3">
        <button type="button" className="btn btn-danger" onClick={() => {deletePostFunction()}}>
            Delete Blog Post
        </button>
    </div>
  )
}

export default DeleteBlogPost
