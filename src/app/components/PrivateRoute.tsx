'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { setCredentials } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router'
import Spinner from './util/Spinner'

const PrivateRoute = ({children}:{ children: React.ReactNode }) => {
    const {userInfo} = useAppSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    console.log('Prior: ',userInfo)
    const {data, isFetching} = useGetUserDetailsQuery(undefined, {
        pollingInterval: 900000,
    })
    
    useEffect(() => {
        if(data) {
            dispatch(setCredentials(data))
            console.log('after: ',userInfo)
        }
        
    }, [data, dispatch])
    useEffect(() => {
        if(!isFetching && ! data){
            navigate('/')
        }
    }, [isFetching, data, navigate])
    if (isFetching) return <Spinner />
    if (!data) return null
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