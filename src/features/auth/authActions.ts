import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase';

type UserPayload = {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk('auth/signup', async ({ email, password }:UserPayload, {rejectWithValue}) => {
   
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if(error){
        console.error("There was a problem signing up: ", error);
        return rejectWithValue({success: false, error})
    }
    return data
    
})

export const userLogin = createAsyncThunk('auth/login', async ({email, password}:UserPayload, {rejectWithValue} ) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if(error){
        console.error("Unable to login: ", error)
        return rejectWithValue({success: false, error})
    }
    localStorage.setItem('userToken', data.session.access_token)
    return data
})
