'use client'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../../features/auth/authActions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import Spinner from '../util/Spinner'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Signup = () => {
    const {loading, userInfo, error, success} = useAppSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {register, handleSubmit} = useForm()
    
    useEffect(() => {
        if (success) navigate('/blogs')
    }, [success, navigate])
    const submitForm = (data:any) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            alert('Password mismatch')
            return
        }
        data.email = data.email.toLowerCase()
        dispatch(registerUser(data))
    }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} className='max-w-md m-auto pt-5'>
        <h2 className="font-bold pb-2">Sign up today!</h2>
        <div className='flex flex-col py-4'>
            <input placeholder="Email" className='form-input p-3 mt-6' type="email" { ...register('email')} required/>
            <input placeholder="Password" className='form-input p-3 mt-6' type="password" { ...register('password')} required />
            <input placeholder="Confirm Password" className='form-input p-3 mt-6' type="password" { ...register('confirmPassword')} required />
            {error && <p className="text-danger">{error}</p>}

            <button type='submit' disabled={loading} className='mt-5 w-full'>
                {loading ? <Spinner /> : 'Sign up'}
            </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
