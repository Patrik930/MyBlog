import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams,  } from 'react-router-dom'
import { deletePost, readLikes, ReadPost, toggleLike } from '../utility/crudUtility';
import { useState } from 'react';
import parse from 'html-react-parser';
import { FaTrashCan } from "react-icons/fa6"
import { useConfirm } from 'material-ui-confirm';
import { delPhoto } from '../utility/uploadFile';
import { Button } from 'reactstrap';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Alerts } from '../components/Alerts';

export const DetailPost = () => {

    const {user} = useContext(UserContext)

    const  [post,setPost] = useState(null)

    const [txt,setText] = useState(null)

    

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
  
    const handleLikes=async()=>{
        if(!user) setText("Csak bejelentkezett felhasználók likeolhatnak")
        else{
            await toggleLike(user.uid,post.id)
            
      
        } 
    }

  return (
    <div>
      {post && <>
        <img src={post.photo['url']} alt={post.title} style={{maxWidth:'300px'}}  />
        <p>{parse(post.story)}</p>
      </>}
      <button className='btn btn-primary' onClick={()=>navigate('/posts')}> vissza </button>
      <div>
        <button onClick={handleLikes}>👍</button>
     {post && <span>Likes number: {post.likes.length}</span>}
      </div>
     
      {user && post && (user.uid==post.userId) &&
      <>
      <button onClick={handleDelete} className='btn btn-danger'>< FaTrashCan /></button>
      <button onClick={()=>navigate('/update/'+post.id)}>✏️</button>
      <button></button>
      </>
}
      {txt && <Alerts txt={txt} err={false}/>}
    </div>
  )
}


