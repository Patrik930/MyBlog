import { useEffect } from 'react';
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';


export const Story=({setStory,uploaded,story})=> {
  const [html, setHtml] = useState('Írj');


  useEffect(()=>{
      setHtml(story)
  },[story])
  

  return (
    <Editor value={html} onChange={(e)=>setHtml(e.target.value)} onBlur={()=>setStory(html)} />
  );
}