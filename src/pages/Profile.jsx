import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { uploadFile } from '../utility/uploadFile';
import { BarLoader } from 'react-spinners';
import { Toastify } from '../components/Toastify';
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';




export const Profile = () => {
  const {user,updateCredentials,msg} = useContext(UserContext)
  const [ loading,setLoading] = useState(false)
  const [avatar,setAvatar] = useState(null)


  useEffect(()=>{
      user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
  },[user])








  const {  register, handleSubmit, formState: { errors },  } = useForm({
    defaultValues:{
      displayName:user?.displayName || ''
    }
  });

  const onSubmit=async(data)=>{
        setLoading(true)
        console.log(data);
        try {
          const file=data?.file ? data.file[0] : null
          const {url,id} = file ? await uploadFile(file) : null
         // const photoUrl = await uploadFile(file)
         // photoUrl && console.log(photoUrl);
          updateCredentials(data.displayName,url+'/'+id)
        } catch (error) {
          console.log(error);
          }finally{
            setLoading(false)
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
        onChange={(e)=>setAvatar(URL.createObjectURL(e.target.files[0]))}
        />
        
        <p className="text-danger">{errors?.file?.message}</p>

      <input type="submit" />
    </form>
    {loading && <BarLoader/>}
    {msg && <Toastify {...msg}/>}
    {avatar && <img src={avatar} />}
      </div>
      
    </div>
  )
}

