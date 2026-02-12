import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../supabase";
import { User } from "@supabase/supabase-js";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getUserDetails: builder.query<User | null, void>({
            async queryFn() {
                console.log('Pulling')
                const {data, error} = await supabase.auth.getUser()
                if (error) return {error};
                return { data: data.user }
            }
        })
  }),
})

export const {useGetUserDetailsQuery}  = authApi