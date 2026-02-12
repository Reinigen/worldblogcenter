import { createSlice } from "@reduxjs/toolkit";
import { createPost, deleteAllPosts, deletePost, updatePost } from "./postActions";

export type PostState = {
    postData: any | null,
    postCount: number,
    loading: boolean,
    error: string | null,
    success: boolean
}

const initialState:PostState = {
    postData: null,
    postCount: 0,
    loading: false,
    error: null,
    success: false
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createPost
            .addCase(createPost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createPost.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(createPost.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
            // updatePost
            .addCase(updatePost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePost.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(updatePost.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
            // deletePost
            .addCase(deletePost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deletePost.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(deletePost.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
            // deleteAllPosts
            .addCase(deleteAllPosts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteAllPosts.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(deleteAllPosts.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
    },
})

export default postSlice.reducer