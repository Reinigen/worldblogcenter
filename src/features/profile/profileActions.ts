import { createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "../../supabase"

type UpdateProfilePayload = {
    username: string
}

export const updateProfile = createAsyncThunk('profile/update', async (profile: UpdateProfilePayload, { rejectWithValue }) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return rejectWithValue("Not logged in")

    const { data, error } = await supabase
        .from('profiles')
        .update({
            username: profile.username
        })
        .eq('id', user.id)
        .select()
        .single()

    if (error) return rejectWithValue(error.message)
    return data
})
