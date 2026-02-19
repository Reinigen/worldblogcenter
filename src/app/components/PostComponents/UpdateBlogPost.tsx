'use client'

import * as bootstrap from 'bootstrap'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Spinner from '../util/Spinner'
import { useAppDispatch } from '../../hooks'
import { useGetUserDetailsQuery } from '../../services/auth/authService'
import { setCredentials } from '../../../features/auth/authSlice'
import { supabase } from '../../../supabase'
import { useNavigate, useParams } from 'react-router'
import { updatePost } from '../../../features/posts/postActions'
import { postApi, useGetPostQuery } from '../../services/post/postService'

const UpdateBlogPost = ({ oldImageUrl }: { oldImageUrl: string | null }) => {
    const dispatch = useAppDispatch()
    const {blogId} = useParams()
    const navigate = useNavigate()
    const {data: post} = useGetPostQuery({id: blogId!}, {skip:!blogId})
    const [removeImage, setRemoveImage] = useState(false)
    const {register,handleSubmit} = useForm({
        values: {
            title: post?.title || '',
            content: post?.content || '',
            file: null
        }
    })

    const {data, isFetching} = useGetUserDetailsQuery(undefined, {
            pollingInterval: 900000,
    })
    
    
    useEffect(() => {
        if(data) dispatch(setCredentials(data))
        }, [data, dispatch])
    
    const deleteImage = async () => {
        // delete the old image from the bucket
            if (oldImageUrl) {
                const oldPath = oldImageUrl.split('/WorldCenterBucket/')[1]
                await supabase.storage
                    .from('WorldCenterBucket')
                    .remove([oldPath])
            }
    }

    const submitForm = async (formData:any) => {
        if(!blogId) return

        let imageUrl = oldImageUrl || null
        if(imageUrl && removeImage == true){
            await deleteImage()
            imageUrl=null
        }
        if(formData.file && formData.file.length > 0){
            const file = formData.file[0]
            const fileName = `${Date.now()}-${file.name}`
            
            await deleteImage()
    
            const { error: uploadError } = await supabase.storage
                .from('WorldCenterBucket')
                .upload(`posts/${fileName}`, file)
    
            if (uploadError) {
                console.error(uploadError)
                return
            }
            const { data: urlData } = supabase.storage
            .from('WorldCenterBucket')
            .getPublicUrl(`posts/${fileName}`)

            imageUrl = urlData.publicUrl
        }
        
        await dispatch(updatePost({
            blog_id: blogId,
            title: formData.title,
            content: formData.content,
            image_url: imageUrl
        }))
        dispatch(postApi.util.invalidateTags(['Posts']))

        // close the modal
        const modal = document.getElementById('updateBlog')
        if (modal) {
            const bsModal = bootstrap.Modal.getOrCreateInstance(modal)
            modal.addEventListener('hidden.bs.modal', () => {
                // remove any leftover backdrop
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
                document.body.classList.remove('modal-open')
                document.body.style.removeProperty('overflow')
                document.body.style.removeProperty('padding-right')
                navigate(`/blogs/${blogId}`)
            }, { once: true })
            bsModal.hide()
        } else {
            navigate(`/blogs/${blogId}`)
        }


    } 

  return (
    <div className='px-3'>
        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updateBlog">
            Update Blog Post
        </button>
        <div className="modal fade" id='updateBlog' tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update Post</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className='flex flex-col pb-4'>
                            <input type="text" placeholder='Title' className='form-control p-3 mt-3' { ...register('title')} required />
                            <textarea placeholder='Content' className='form-control p-3 mt-3' { ...register('content')} required />
                            <div>
                                {oldImageUrl && (removeImage
                                    ?
                                    <div>
                                        <input type="file" className='form-control p-3 mt-3' { ...register('file')} />
                                        <button type='button' className="btn btn-warning ms-1"
                                        onClick={(e) =>{
                                            e.preventDefault()
                                            setRemoveImage(false)
                                        }}
                                        >Undo</button>
                                    </div>
                                    :
                                    <button type='button' className='btn btn-danger ms-1' onClick={(e)=> {
                                        e.preventDefault()
                                        setRemoveImage(true)
                                        }}>Delete file</button>
                                    )}
                                    {!oldImageUrl ?
                                    <input type="file" className='form-control p-3 mt-3' { ...register('file')} />
                                    : <></>
                                    }
                            </div>
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

export default UpdateBlogPost
