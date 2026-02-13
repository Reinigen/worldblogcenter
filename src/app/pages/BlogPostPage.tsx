'use client'

import { useNavigate, useParams } from "react-router"
import { useGetPostQuery } from "../services/post/postService"
import UpdateBlogPost from "../components/PostComponents/UpdateBlogPost"
import DeleteBlogPost from "../components/PostComponents/DeleteBlogPost"
import Spinner from "../components/util/Spinner"
import { useGetCommentsQuery } from "../services/comments/commentService"
import Comment from "../components/CommentComponents/Comment"
import CreateCommentForm from "../components/CommentComponents/CreateComment"
import { useAppSelector } from "../hooks"


const BlogPostPage = () => {
  const navigate = useNavigate()
  const { blogId } = useParams()
  const {userInfo} = useAppSelector((state) => state.auth)
  
  // posts
  const { data: post } = useGetPostQuery({id: blogId!}, {skip: !blogId})
  //comments
  const { data: comments } = useGetCommentsQuery({blogId: blogId!}, {skip: !blogId}) 
  if (!post) return <Spinner />
  const postCreatedDate: Date = new Date(post.created_at)
  const postUpdatedDate: Date = new Date(post.updated_at ? post.updated_at: "")

  return (
    <>
      <div className="m-5">
        <nav className="nav justify-between">
          <button type="button" className="btn btn-primary" onClick={() => {navigate('/blogs')}} >Back to Blogs</button>
          { userInfo.id == post.user_id?

            <div className="flex">
              <UpdateBlogPost oldImageUrl={post.image_url}/>
              <DeleteBlogPost oldImageUrl={post.image_url} />
            </div>
            :""
          }
        </nav>
        <div className="m-5">
          {post.image_url && (
            <img src={post.image_url ?? undefined} className="m-3" alt="..." />
          )}
          <h1 className="m-3" >{post.title}</h1>
          <h3>Posted on: {postCreatedDate.toLocaleDateString()}</h3>
          {post.updated_at ? <h3>Updated on: {postUpdatedDate.toLocaleDateString()}</h3>:""}
          <p className="m-5">{post.content}</p>
        </div>
        <div className="m-5">
          <h1>Comments</h1>
          <CreateCommentForm />
          {
            comments && comments.length > 0 
            ? 
              comments.map((comment:any) => (
                
                <Comment key={comment.id} comment={comment}/> 
              ))
            : 
              <h1>No Comments yet! Be the First!</h1>
          }
          
        </div>
      </div>
        
    </>
  )
}

export default BlogPostPage
