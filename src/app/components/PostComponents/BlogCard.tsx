'use client'

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useGetUserDetailsQuery } from "../../services/auth/authService"
import { useGetProfileQuery } from "../../services/auth/profileService"

type CardProps = {
  blog_id: string
  blog: any
}

const BlogCard = ({blog_id, blog}: CardProps) => {
  const navigate = useNavigate()
  const {data} = useGetProfileQuery({userId:blog.user_id}, {skip: !blog.user_id})
  return (
    <div className="col">
      <div className="card h-100 mt-3">
            {blog.image_url && (
              <img src={blog.image_url}  className="card-img-top rounded" alt="..." style={{ width: "100%", height: "150px", objectFit: "cover" }}/>
            )}
            <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <h6>Posted by: {data?.username}</h6>
                <p className="card-text text-truncate">{blog.content}</p>


                {/* Just open a modal that has the comments HAHAHAHHAHAHAHAHA */}
            </div>
            <div className="card-footer">
              <button onClick={() => navigate(`/blogs/${blog_id}`)} className="btn btn-primary">Open full blog</button>
            </div>
        </div>
    </div>
  )
}

export default BlogCard
