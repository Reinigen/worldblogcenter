import { createSlice } from "@reduxjs/toolkit"
import { createComment, deleteAllComments, deleteComment, updateComment } from "./commentActions"

export type CommentState = {
    commentData: any | null,
    commentCount: number,
    loading: boolean,
    error: string | null,
    success: boolean
}

const initialState:CommentState = {
    commentData: null,
    commentCount: 0,
    loading: false,
    error: null,
    success: false
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createComment
            .addCase(createComment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createComment.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(createComment.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
            // updateComment
            .addCase(updateComment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateComment.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(updateComment.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
            // deleteComment
            .addCase(deleteComment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteComment.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(deleteComment.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
            // deleteAllComments
            .addCase(deleteAllComments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteAllComments.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(deleteAllComments.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
    },
})

export default commentSlice.reducer