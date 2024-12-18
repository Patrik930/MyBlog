import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams,  } from 'react-router-dom'
import { deletePost, ReadPost } from '../utility/crudUtility';
import { useState } from 'react';
import parse from 'html-react-parser';
import { FaTrashCan } from "react-icons/fa6"
import { useConfirm } from 'material-ui-confirm';
import { delPhoto } from '../utility/uploadFile';

export const DetailPost = () => {

    const  [post,setPost] = useState(null)

    const params = useParams()

    const confirm = useConfirm()

    const navigate = useNavigate()
        
    console.log(params.id);
    

    useEffect(()=>{
        ReadPost(params.id,setPost)
    },[])

    const handleDelete = async()=>{
      try {
        await confirm({
          description: 'Ez egy visszavonhatatlan művelet!',
          confirmationText: 'Igen',
          cancellationText: 'Mégsem',
          title: 'Biztosan ki szeretnéd törölni a felhasználói fiókodat?'
  
      })
      deletePost(post.id)
      delPhoto(post.photo.id)
      navigate('/posts')
      } catch (error) {
        console.log(error);
        
      }
    }
  
    

  return (
    <div>
      {post && <>
        <img src={post.photo['url']} alt={post.title} style={{maxWidth:'300px'}}  />
        <p>{parse(post.story)}</p>
      </>}
      <button className='btn btn-primary' onClick={()=>navigate('/posts')}> vissza </button>
      <button onClick={handleDelete} className='btn btn-danger'>< FaTrashCan /></button>
    </div>
  )
}


