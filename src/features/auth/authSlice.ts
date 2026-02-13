import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";
import { stat } from "fs";
import { supabase } from "../../supabase";

export type AuthState = {
    loading: boolean
    userInfo: any | null
    userToken: string | null
    error: string | null
    success: boolean
    
}

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null

const initialState:AuthState = {
    loading: false,
    userInfo: null, // for user object
    userToken: userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const logoutUser = async () => {
    await supabase.auth.signOut()
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken'),
            logoutUser(),
            state.loading = false,
            state.userInfo = null,
            state.userToken = null,
            state.error = null
        },
        setCredentials: (state, {payload}) => {
            state.userInfo = payload
        }
    },
    extraReducers(builder) {
        builder
            //register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, payload) => {
                state.loading = false
                state.success = true // registration successful
            })
            .addCase(registerUser.rejected || userLogin.rejected, (state, payload) => {
                state.loading = false
                state.error = payload.error.message ? payload.error.message : "undefined"
            })
            //login user
            .addCase(userLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userLogin.fulfilled, (state, payload) => {
                state.loading = false,
                state.userInfo = payload.payload.user,
                state.userToken = payload.payload.session.access_token
            })
    },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer