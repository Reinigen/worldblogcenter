'use client'

import { useState } from "react"
import PageItem from "../util/PageItem"
import CreateBlogPost from "./CreateBlogPost"

import { useGetPostCountQuery, useGetPostsQuery } from "../../services/post/postService"
import BlogCard from "./BlogCard"


const BlogLayout = () => {
    // need to add the array to redux so it can update on the pageItem thingo
    const [page, setPage] = useState(0)
    const postsPerPage = 9

    const start = page * postsPerPage
    const end = start + postsPerPage - 1

    const { data: posts, isFetching } = useGetPostsQuery({start, end})
    const { data: totalPosts } = useGetPostCountQuery(undefined)

    const totalPages = totalPosts ? Math.ceil(totalPosts/postsPerPage) : 1
    const pages: number[] = []
    for (let i = 0; i < totalPages; i++){
        pages.push(i)
    }

    
  return (
    <>
        <div className="card w-full h-auto p-3">
            {isFetching && <p>Loading posts</p>}
            <nav className="w-full mt-3" aria-label="Page navigation example">
                <CreateBlogPost />
            </nav>
            <div className="row row-cols-1 row-cols-md-3 my-5 g-3">
                {posts?.map((post: any) => (
                    <BlogCard key ={post.id} blog={post} blog_id={post.id} />
                ))}
            </div>
            <PageItem page={page} pageNumbers={pages} totalPages={totalPages} onPageClick={(pageNum) => setPage(pageNum)}/>
        </div>
    </>
  )
}

export default BlogLayout
