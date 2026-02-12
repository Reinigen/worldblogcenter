'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate } from 'react-router'
import { logout } from '../../../features/auth/authSlice'

const Logout = () => {
  const {loading, userInfo, error} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const signout = () => {
    if(userInfo){
      dispatch(logout())
      navigate('/')
    }
  }

  return (
    <div>
      <button onClick={signout} className="bg-primary text-zinc-50 p-3 rounded">
          Sign out
        </button>
    </div>
  )
}

export default Logout
