'use client'
import { useAppSelector } from '../hooks'
import Logout from '../components/AuthComponents/Logout'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { setCredentials } from '../../features/auth/authSlice'
import BlogLayout from '../components/PostComponents/BlogLayout'

const BlogPage = () => {
  const {userInfo} = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()

  const {data, isFetching} = useGetUserDetailsQuery(undefined, {
    pollingInterval: 900000,
  })

  useEffect(() => {
    if(data) dispatch(setCredentials(data))
  }, [data, dispatch])

  return (
    <div className='justify-center align-middle m-4 p-4'>
      <nav className='flex align-middle justify-between'> 
        {isFetching
          ? `Fetching your profile...`
          : userInfo !== null
          ? <h2>Welcome, {userInfo.email}</h2>
          : "You're not logged in"
        }
        <Logout />
      </nav>
      <h1>Welcome to World Center Blog</h1>
      
      <div id='bloglist' className='mt-5'>
        <BlogLayout />
      </div>
    </div>
  )
}

export default BlogPage
