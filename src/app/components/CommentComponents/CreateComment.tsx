'use client'

import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../hooks"
import { useEffect } from "react"
import { useGetUserDetailsQuery } from "../../services/auth/authService"
import { setCredentials } from "../../../features/auth/authSlice"
import { createComment } from "../../../features/comments/commentActions"
import { supabase } from "../../../supabase"
import { useParams } from "react-router"
import Spinner from "../util/Spinner"
import { commentApi } from "../../services/comments/commentService"


const CreateCommentForm = () => {
  const dispatch = useAppDispatch()
  const {blogId} = useParams()
  const {register, handleSubmit} = useForm()

  const { data, isFetching} = useGetUserDetailsQuery(undefined, {
    pollingInterval: 90000,
  })

  useEffect(() => {
    if(data)dispatch(setCredentials(data))
  }, [data, dispatch])

  const submitForm = async (formData:any) => {
    if(!blogId) return
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
    console.log(fileString)
    dispatch(createComment({
      blog_id: blogId,
      content: formData.content,
      image_url: fileString ? fileString : ""
    })).then(() => {
      dispatch(commentApi.util.invalidateTags(['Comments']))
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <h2>Write a Comment!</h2>
          <textarea placeholder='Add a Comment' className='form-control p-3 mt-3' { ...register('content')} required />
          <button>
              <input id="file" type="file" className='form-control p-3 mt-3' { ...register('file')} />
          </button>
        </div>
          <button type="submit" className="btn btn-primary mt-3">{isFetching ? <Spinner /> : 'Comment'}</button>
      </form>
    </div>
  )
}

export default CreateCommentForm
