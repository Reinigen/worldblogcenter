import { createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "../../supabase"


type CommentPayload = {
    blog_id: string,
    content: string,
    image_url: string,
}

type UpdateCommentPayload = {
    commentId: string,
    blog_id: string,
    content: string,
    image_url: string,
}

export const createComment = createAsyncThunk('comment/create', async (comment:CommentPayload,{rejectWithValue}) => {
    const {data: { user } } = await supabase.auth.getUser()

    if (!user) return rejectWithValue("Not logged in")

    const {data, error} = await supabase
    .from('comments')
    .insert([{... comment, user_id: user.id}])
    .select()

    if (error) return rejectWithValue(error.message)
    return data
})

export const updateComment = createAsyncThunk('comment/:commentId/update', async (updateComment:UpdateCommentPayload,{rejectWithValue}) => {
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return rejectWithValue("Not logged in")

    const {data, error} = await supabase
    .from('comments')
    .update({
        blog_id: updateComment.blog_id,
        content: updateComment.content,
        image_url: updateComment.image_url,
        updated_at: new Date().toISOString()

    })
    .eq('id', updateComment.commentId)
    .select()
        
    if (error) return rejectWithValue(error.message)
    return data


})

export const deleteComment = createAsyncThunk('comment/:commentId/delete', async (blogId:string, {rejectWithValue}) => {
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return rejectWithValue("Not logged in")
    
    const {data, error} = await supabase
    .from('comments')
    .delete()
    .eq('id', blogId)
    .select()

    if (error) return rejectWithValue(error.message)
    return data
})

export const deleteAllComments = createAsyncThunk('userId/deleteAll', async (_, {rejectWithValue}) => {
    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return rejectWithValue("Not logged in")

    const {data, error} =await supabase
    .from('comments')
    .delete()
    .eq('user_id', user.id)
    .select()

    if (error) return rejectWithValue(error.message)
    return data
})