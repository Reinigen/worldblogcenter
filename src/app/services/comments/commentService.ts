import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../supabase";

export const commentApi = createApi({
    reducerPath:'commentApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({
        getComments: builder.query({
            async queryFn({ blogId }: { blogId: string }) {
                    console.log("Getting Comments")
                    const {data, error} = await supabase
                    .from('comments')
                    .select('*')
                    .eq('blog_id', blogId)
                if (error) return {error};
                return {data: data}
            },
            providesTags: ['Comments']
        }),
        getCommentCount: builder.query({
            async queryFn(){
                const {count, error} =await supabase
                .from('comments')
                .select('*', {count: 'exact', head: true})
                if (error) return {error}
                return {data:count}
            },
            providesTags: ['Comments']
        }),
        getComment: builder.query({
            async queryFn({id}:{id:string}){
                console.log("Getting Comments")
                const {data, error} = await supabase
                .from('comments')
                .select('*')
                .eq('id',id)
                .single()
                if (error) return {error};
                return {data: data}
            },
            providesTags: ['Comments']
        }),   
    }),
})

export const {useGetCommentQuery, useGetCommentsQuery, useGetCommentCountQuery} = commentApi