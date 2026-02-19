import { fakeBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../../supabase";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Profiles'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            async queryFn({ userId }: { userId: string }) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single()
                if (error) return { error }
                return { data }
            },
            providesTags: ['Profiles']
        })
    })
})

export const {useGetProfileQuery} = profileApi