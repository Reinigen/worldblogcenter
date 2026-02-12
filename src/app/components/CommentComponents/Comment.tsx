'use client'

import React from 'react'
import { useAppDispatch } from '../../hooks'
import { useGetUserDetailsQuery } from '../../services/auth/authService'
import DeleteCommentButton from './DeleteComment'

type CommentProps = {
  comment: any
}
const Comment = ({comment}:CommentProps) => {
  const dispatch = useAppDispatch()
  const commentid:string = comment.id
  const {data, isFetching} = useGetUserDetailsQuery(comment.user_id)
  
  if(!commentid) return
  if(!data) return
  return (
    <div>
      <div className="flex justify-around card mx-3 mt-3 w-full" >
        <div className='d-block'>
          {comment.image_url && (
            <img src={comment.image_url}  className="card-img-bottom rounded" alt="..." style={{ width: "100%", height: "150px", objectFit: "cover" }}/>
          )}
          <h3 className='ms-3 mt-3'>Commented by: {data.email}</h3>
          <div className="card-body w-full">
              <p className="card-text text-truncate">{comment.content}</p>
          </div>

        </div>
        <div className='flex'>
          <DeleteCommentButton commentId={commentid} />
        </div>
      </div>
    </div>
  )
}

export default Comment
