import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../supabase";



export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            async queryFn({start, end}: {start:number, end:number}) {
                console.log("Getting Posts")
                const {data, error} = await supabase
                .from('blog_posts')
                .select('*')
                .range(start,end)
                if (error) return {error};
                return {data: data}
            },
            providesTags: ['Posts']
        }),
        getPostCount: builder.query({
            async queryFn(){
                const {count, error} =await supabase
                .from('blog_posts')
                .select('*', {count: 'exact', head: true})
                if (error) return {error}
                return {data:count}
            },
            providesTags: ['Posts']
        }),
        getPost: builder.query({
            async queryFn({id}:{id:string}){
                console.log("Getting Post")
                const {data, error} = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id',id)
                .single()
                if (error) return {error};
                return {data: data}
            },
            providesTags: ['Posts']
        }),
        getPostImage: builder.query({
            async queryFn({image_url}:{image_url:string}){
                const {data, error} = await supabase
                .from('blog_posts')
                .select('*')
                .eq('image_url',image_url)
                .single()
                if (error) return {error};
                return {data: data}
            },
            providesTags: ['Posts']
        })
    }),
})

export const {useGetPostsQuery, useGetPostCountQuery, useGetPostQuery} = postApi