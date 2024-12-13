import React from 'react'
import { useEffect } from 'react';
import { useParams,  } from 'react-router-dom'
import { ReadPost } from '../utility/crudUtility';
import { useState } from 'react';

export const DetailPost = () => {

    const  [post,setPost] = useState(null)

    const params = useParams()
        
    console.log(params.id);
    

    useEffect(()=>{
        ReadPost(params.id,setPost)
    },[])

    post && console.log(post);
    

  return (
    <div>
      <button> vissza </button>
    </div>
  )
}


