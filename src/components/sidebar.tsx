import { unsplashTopics } from '@/app/consonants'
import { Button } from '@mui/material'
import { useState } from 'react';

export default function Sidebar({handler, isOpened}) {
    const [category, setcategory] = useState(null)
    const clickHandler = (e) => {
        handler(e);
    } 
    
  return (
<div className={`div ${isOpened ? 'flex' : 'hidden'} flex-col bg-slate-800 h-auto items-start justify-center gap-2 p-3 fixed top-13 right-0`}>
<p className="text-xl mb-3 w-[100%]">Categories</p>
<Button onClick={e => clickHandler(e)} variant="contained" className="w-[100%] text-white bg-slate-700"> 
  Random Photos
  </Button>
{unsplashTopics.map(topic => (
  <Button key={topic.slug} onClick={e => clickHandler(e)} variant="outlined" className="w-[100%] text-gray-200 border-1 border-slate-500"> 
  {topic.name}
  </Button>
  
) )}
</div>
)
}
