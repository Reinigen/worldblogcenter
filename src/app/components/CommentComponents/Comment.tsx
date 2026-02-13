'use client'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useGetUserDetailsQuery } from '../../services/auth/authService'
import DeleteCommentButton from './DeleteComment'
import UpdateCommentButton from './UpdateComment'
import { useGetProfileQuery } from '../../services/auth/profileService'


type CommentProps = {
  comment: any
}
const Comment = ({comment}:CommentProps) => {
  const commentid:string = comment.id
  //Can update to use Profile table but it's too much to set up right
  const {data: profile } = useGetProfileQuery({userId: comment.user_id})
  const {userInfo} = useAppSelector((state) => state.auth)
  if(!commentid) return

  return (
    <div>
      <div className="flex justify-around card mx-3 my-3 w-full" >
        <div className='d-block'>
          {comment.image_url && (
            <img src={comment.image_url}  className="card-img-bottom rounded" alt="..." style={{ width: "100%", height: "150px", objectFit: "cover" }}/>
          )}
          <h3 className='ms-3 mt-3'>Commented by: {profile?.username || profile?.email || "Unknown"}</h3>
          <div className="card-body w-full">
              <p className="card-text text-truncate">{comment.content}</p>
          </div>
        </div>
        {comment.user_id === userInfo?.id ?
          <div className='flex justify-evenly mb-3 px-3'>
            <UpdateCommentButton commentId={commentid} oldImageUrl={comment.image_url}/>
            <DeleteCommentButton commentId={commentid} oldImageUrl={comment.image_url} />
          </div>:""
        }
      </div>
    </div>
  )
}

export default Comment
