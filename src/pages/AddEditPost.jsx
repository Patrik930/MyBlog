import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Homepage } from './Homepage'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile'
import { BarLoader } from 'react-spinners'
import { addPost, ReadPost, updatePost } from '../utility/crudUtility'
import { CategContext } from '../context/CategContext'
import { CategDropDown } from '../components/CategDropDown'
import { Alerts } from '../components/Alerts'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const AddEditPost = () => {

  const {user} =  useContext(UserContext)
  const {categories} = useContext(CategContext)
  const [loading,setLoading] = useState(false)
  const [photo,setPhoto] = useState(null)
  const [story,setStory] = useState(null)
  const [uploaded,setUploaded] = useState(null)
  const [selCateg,setSelCateg] = useState(null)
  const params = useParams()
  //az deitáláshoz kell
  const [post,setPost] = useState(null)
  console.log(params.id);
  
  useEffect(()=>{
    if(params?.id) ReadPost(params.id,setPost)
  }
  ,[params?.id])

  console.log(post);

  useEffect(()=>{
    if(post){
      setValue("title",post.title)
      setSelCateg(post.category)
      setStory(post.story)
    }
  },[post])
  
  
  const {  register, handleSubmit, formState: { errors }, reset ,setValue} = useForm();

  const onSubmit=async(data)=>{

    if(params.id){
      try {
        updatePost(params.id,{...data,category:selCateg,story})
      } catch (error) {
        console.log('Update',error);
      }finally{
        setLoading(false)
      }
    }else{
      setLoading(true)
      let newPostData={
        ...data,
        story,
        author: user.displayName,
        userId:user.uid,
        category: selCateg,
        likes:[]
      }
      console.log(newPostData);
      
      try {
        const file=data?.file ? data.file[0] : null
        const {url,id} = file ? await uploadFile(file) : null
        delete newPostData.file
  
        newPostData={...newPostData,photo:{url,id}}
        console.log(newPostData);
        addPost(newPostData)
        setUploaded(true)
        reset()
        setPhoto(null)
        setStory(null)
       
        //updateCredentials(data.displayName,url+'/'+id)
      } catch (error) {
        console.log(error);
        }finally{
          setLoading(false)
        }
      
  }
    }



   


  if(!user) return <Homepage/>


  return (
    <div className='mt-40'>
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div><label>A bejegyzés címe</label>
        <input {...register('title', {required:!params.id})}  type='text' />
        <p className='text-danger'>{errors?.title && 'A cím megadása kötelező'}</p>
      </div>
      <CategDropDown categories={categories} setSelCateg={setSelCateg} selCateg={selCateg}/>
      <Story setStory={setStory} uploaded={uploaded} story={story}/>
    <input type="file" disabled={params.id} {...register('file',{
      validate:(value)=>{
        if(!value[0]) return true
        console.log(value[0]);
        const fileExtension = value[0]?.name.split('.').pop().toLowerCase()
        console.log(fileExtension);
        const acceptedFormats = ['jpg','png']
        if(!acceptedFormats.includes(fileExtension)) return 'Nem megfelelő formátum!'
        if(value[0].size>1*1000*1024) return ('Az engedélyezett fájl mérete 1MB')
        return true
      }
      })}  
      onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
      />
      
      <p className="text-danger">{errors?.file?.message}</p>
      <p className='text-danger'>{errors?.file && 'Fotó feltöltése kötelező'}</p>

    <input disabled={!selCateg} type="submit" />
  </form>
  {loading && <BarLoader/>}
  {uploaded && <Alerts txt='Sikeres feltöltés' err={null}/>}
  <img src={post?.photo?.url ? post.photo.url : photo} />
    </div>
    
  </div>
  )
}


