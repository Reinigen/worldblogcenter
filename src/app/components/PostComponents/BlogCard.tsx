'use client'

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

type CardProps = {
  blog_id: string
  blog: any
}

const BlogCard = ({blog_id, blog}: CardProps) => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="card mx-3 mt-3" style={{ width: "30vw"}}>
            {blog.image_url && (
              <img src={blog.image_url}  className="card-img-top rounded" alt="..." style={{ width: "100%", height: "150px", objectFit: "cover" }}/>
            )}
            <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text text-truncate">{blog.content}</p>
                <button onClick={() => navigate(`/blogs/${blog_id}`)} className="btn btn-primary">Open full blog</button>

                {/* Just open a modal that has the comments HAHAHAHHAHAHAHAHA */}
            </div>
        </div>
    </div>
  )
}

export default BlogCard
