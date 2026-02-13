'use client'

import { useForm } from "react-hook-form"
import { supabase } from "../../../supabase"
import { commentApi, useGetCommentQuery } from "../../services/comments/commentService"
import { useNavigate, useParams } from "react-router"
import Spinner from "../util/Spinner"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../hooks"
import { updateComment } from "../../../features/comments/commentActions"
import * as bootstrap from "bootstrap"
import { useGetUserDetailsQuery } from "../../services/auth/authService"
import { setCredentials } from "../../../features/auth/authSlice"
import { C } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js"

const UpdateCommentButton = ({commentId, oldImageUrl }: { commentId: string| null,oldImageUrl: string | null }) => {
    const dispatch = useAppDispatch()
    const {data: comment} = useGetCommentQuery({id: commentId!}, {skip:!commentId})
    
    const [removeImage, setRemoveImage] = useState(false)
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm({
        values: {
            blog_id: comment?.blog_id || '',
            content: comment?.content || '',
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
            if(!comment) return
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
            dispatch(updateComment({
                commentId: comment.id,
                content: formData.content,
                image_url: imageUrl
            })).then(() => {
                dispatch(commentApi.util.invalidateTags(['Comments']))
            })
            
            // close the modal
            const modal = document.getElementById('updateComment')
            if (modal) {
                const bsModal = bootstrap.Modal.getOrCreateInstance(modal)
                modal.addEventListener('hidden.bs.modal', () => {
                    // remove any leftover backdrop
                    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
                    document.body.classList.remove('modal-open')
                    document.body.style.removeProperty('overflow')
                    document.body.style.removeProperty('padding-right')
                    navigate(`/blogs/${comment.blog_id}`)
                }, { once: true })
                bsModal.hide()
            } else {
                navigate(`/blogs/${comment.blog_id}`)
            }
        }
    
    return (
        <div>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updateComment">
                Update Blog Comment
            </button>
            <div className="modal fade" id='updateComment' tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Comment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className='flex flex-col pb-4'>
                                <textarea placeholder='Content' className='form-control p-3 mt-3' { ...register('content')} required />
                                <div>
                                    <input type="file" className='form-control p-3 mt-3' { ...register('file')} />
                                    {removeImage 
                                    ? 
                                    <button className="btn btn-warning ms-1"
                                    onClick={(e) =>{
                                        e.preventDefault()
                                        setRemoveImage(false)
                                    }}
                                    >Undo</button>
                                    :
                                    <button type='button' className='btn btn-danger ms-1' onClick={(e)=> {
                                        e.preventDefault()
                                        setRemoveImage(true)
                                        }}>Delete file</button>

                                    }
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">{isFetching ? <Spinner /> : 'Comment'}</button>
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

export default UpdateCommentButton