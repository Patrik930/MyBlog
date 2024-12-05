import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { uploadFile } from '../utility/uploadFile';









export const Profile = () => {
  const {user,updateCredentials} = useContext(UserContext)
  const [photo,setPhoto] = useState(null)
  const {  register, handleSubmit, formState: { errors },  } = useForm({
    defaultValues:{
      displayName:user?.displayName || ''
    }
  });

  const onSubmit=async(data)=>{
        console.log(data);
        try {
          const file=data?.file ? data.file[0] : null
          const photoUrl = await uploadFile(file)
          photoUrl && console.log(photoUrl);
          
          //updateCredentials(data.displayName)
        } catch (error) {
          console.log(error);
          
        }
        
  }


  return (
    <div className='mt-10'>
      <div>
      <h3>Felhasználói fiók beállítása</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div><label>Felhasználónév</label>
          <input {...register('displayName')} placeholder='Felhasználónév' type='text' />
        </div>  
      <input type="file" {...register('file',{
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
        
      <input type="submit" />
    </form>
    {photo && <img src={photo} className='img-thumbnail'/>}
      </div>
      
    </div>
  )
}

