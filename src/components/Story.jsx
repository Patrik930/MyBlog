import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';


export const Story=({setStory,uploaded})=> {
  const [html, setHtml] = useState('Írj');
  

  return (
    <Editor value={html} onChange={(e)=>setHtml(e.target.value)} onBlur={()=>setStory(html)} />
  );
}