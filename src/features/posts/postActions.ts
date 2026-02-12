import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase";

type PostPayload = {
    title: string,
    content: string,
    image_url: string,
}

type UpdatePostPayload = {
    blog_id: string,
    title: string,
    content: string,
    image_url: string,
}

export const createPost = createAsyncThunk('post/create', async (post:PostPayload,{rejectWithValue}) => {
    const {data: { user } } = await supabase.auth.getUser()

    if (!user) return rejectWithValue("Not logged in")

    const {data, error} = await supabase
    .from('blog_posts')
    .insert([{...post, user_id: user.id}])
    .select()

    if (error) return rejectWithValue(error.message)
    return data
})

export const updatePost = createAsyncThunk('post/:blogId/update', async (updatePost:UpdatePostPayload,{rejectWithValue}) => {
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return rejectWithValue("Not logged in")

    const {data, error} = await supabase
    .from('blog_posts')
    .update({
        title: updatePost.title,
        content: updatePost.content,
        image_url: updatePost.image_url,
        updated_at: new Date().toISOString()
    })
    .eq('id', updatePost.blog_id)
    .select()
        
    if (error) return rejectWithValue(error.message)
    return data


})

export const deletePost = createAsyncThunk('post/:blogId/delete', async (blogId:string, {rejectWithValue}) => {
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return rejectWithValue("Not logged in")
    
    const {data, error} = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', blogId)
    .select()

    if (error) return rejectWithValue(error.message)
    return data
})

export const deleteAllPosts = createAsyncThunk('userId/deleteAll', async (_, {rejectWithValue}) => {
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return rejectWithValue("Not logged in")

    const {data, error} =await supabase
    .from('blog_posts')
    .delete()
    .eq('user_id', user.id)
    .select()

    if (error) return rejectWithValue(error.message)
    return data
})