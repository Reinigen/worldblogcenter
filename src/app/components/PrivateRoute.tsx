'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { setCredentials } from '../../features/auth/authSlice'

const PrivateRoute = ({children}:{ children: React.ReactNode }) => {
    const {userInfo} = useAppSelector((state) => state.auth)
    const dispatch = useDispatch()

    const {data, isFetching} = useGetUserDetailsQuery(undefined, {
        pollingInterval: 900000,
    })

    useEffect(() => {
        if(data) dispatch(setCredentials(data))
    }, [data, dispatch])
    return (
        <div>
            {/* <span>
                {isFetching
                    ? `Fetching your profile...`
                    : userInfo !== null
                    ? `Logged in as ${userInfo.email}`
                    : "You're not logged in"
                }
            </span> */}
            {children}
        </div>
    )
}

export default PrivateRoute;