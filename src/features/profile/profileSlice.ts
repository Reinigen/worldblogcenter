import { createSlice } from "@reduxjs/toolkit"
import { updateProfile } from "./profileActions"

export type ProfileState = {
    profileData: any | null
    loading: boolean
    error: string | null
    success: boolean
}

const initialState: ProfileState = {
    profileData: null,
    loading: false,
    error: null,
    success: false
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.profileData = action.payload
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default profileSlice.reducer
