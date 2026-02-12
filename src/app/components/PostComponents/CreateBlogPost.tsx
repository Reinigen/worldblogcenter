'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks'
import { useGetUserDetailsQuery } from '../../services/auth/authService'
import { setCredentials } from '../../../features/auth/authSlice'
import { useForm } from 'react-hook-form'
import { createPost } from '../../../features/posts/postActions'
import Spinner from '../util/Spinner'
import { supabase } from '../../../supabase'
import { useNavigate } from 'react-router'
import { postApi } from '../../services/post/postService'
import * as bootstrap from 'bootstrap'

const CreateBlogPost = () => {
    const dispatch = useAppDispatch()
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()


    const {data, isFetching} = useGetUserDetailsQuery(undefined, {
        pollingInterval: 900000,
    })

    useEffect(() => {
        if(data) dispatch(setCredentials(data))
    }, [data, dispatch])
    const submitForm = async (formData:any) => {
        let fileString: string | null = null 
        if(formData.file && formData.file.length > 0){
            const file = formData.file[0]
            const fileName = `${Date.now()}-${file.name}`
    
            const { data: uploadData, error: uploadError } = await supabase.storage
            .from('WorldCenterBucket')
            .upload(`posts/${fileName}`, file)
    
            if (uploadError) {
                console.error(uploadError)
                return
            }
    
            const { data: urlData } = supabase.storage
            .from('WorldCenterBucket')
            .getPublicUrl(`posts/${fileName}`)

            fileString = urlData.publicUrl
        }


        dispatch(createPost({
            title: formData.title,
            content: formData.content,
            image_url: fileString ? fileString : ""
        })).then(() => {
            dispatch(postApi.util.invalidateTags(['Posts']))
        })

        // close the modal
        const modal = document.getElementById('createBlog')
        if (modal) {
            const bsModal = bootstrap.Modal.getOrCreateInstance(modal)
            modal.addEventListener('hidden.bs.modal', () => {
                // remove any leftover backdrop
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
                document.body.classList.remove('modal-open')
                document.body.style.removeProperty('overflow')
                document.body.style.removeProperty('padding-right')
                navigate(`/blogs`)
            }, { once: true })
            bsModal.hide()
        } else {
            navigate(`/blogs`)
        }
    } 

  return (
    <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createBlog">
            Create Blog Post
        </button>
        <div className="modal fade" id='createBlog' tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add a Blog Post</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className='flex flex-col pb-4'>
                            <input type="text" placeholder='Title' className='form-control p-3 mt-3' { ...register('title')} required />
                            <textarea placeholder='Content' className='form-control p-3 mt-3' { ...register('content')} required />
                            <button>
                                <input type="file" className='form-control p-3 mt-3' { ...register('file')} />
                            </button>
                            <button type="submit" className="btn btn-primary mt-3">{isFetching ? <Spinner /> : 'Post'}</button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default CreateBlogPost
