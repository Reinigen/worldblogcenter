'use client'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { userLogin } from '../../../features/auth/authActions'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import Spinner from '../util/Spinner'


const Login = () => {
    const {loading, userInfo, error} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    //redirect once authenticated
    useEffect(() => {
        if(userInfo){
            navigate('blogs')
        }
    }, [navigate, userInfo])

    const submitForm = (data:any) => {
        dispatch(userLogin(data))
    }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} className='max-w-md m-auto pt-5'>
        <h2 className="font-bold pb-2">Log in Now!</h2>
        <div className='flex flex-col py-4'>
            <input placeholder="Email" className='form-input p-3 mt-6' type="email" { ...register('email')} required/>
            <input placeholder="Password" className='form-input p-3 mt-6' type="password" { ...register('password')} required />
            
            <button type='submit' disabled={loading} className='mt-5 w-full'>
                {loading ? <Spinner /> : 'Log in'}
            </button>
        </div>
      </form>
    </div>
  )
}

export default Login