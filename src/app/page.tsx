'use client';
import { getByCategory, getPhots, searchUnsplashPhotos } from "@/lib";;
import Sidebar from "@/components/sidebar";
import { accessKey } from "./consonants";
import { ReactHTMLElement, ReactNode, useEffect, useState } from "react";
import Card, { Photo } from "@/components/card";
import Navbar from "@/components/navbar";
import { Close } from "@mui/icons-material";

export default function Home() {
  const [photos, setphotos] = useState<Photo | []>([])
  const [category, setcategory] = useState<string>('')
  const [isOpened, setisOpened] = useState<Boolean>(false)
  const [limit, setlimit] = useState(20)
  const [keyword, setkeyword] = useState(null)
  useEffect(() => {
    async function getData(accessKey: string, limit: number, category='') {
      try {
        const data = await getPhots(accessKey, limit);
        setphotos(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData(accessKey, limit, category);
  }, [])

  useEffect(() => {
    async function getCategoryPhotos(accessKey: string, category: string) {
      if (category) {
        const categoryData = await getByCategory(accessKey, category);
        setphotos(categoryData)
      }
    }
    getCategoryPhotos(accessKey, category);
  }, [category])
  
  const categoryHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const text = target.innerText
    setcategory(text);
  }
  
  const openSideBar = () => setisOpened(prev => !prev);

  const keyWordhandler = (e: React.FormEvent<HTMLFormElement>) => {
    setkeyword(e.currentTarget.value);
  }

  const getPhotosByKeyword =async(keyword: string, limit: number) => {
    if(keyword) {
      try {
        const data = await searchUnsplashPhotos(keyword, 1, limit);
        setphotos(data);
      } catch (error) {
        
      }
    }
  }
  const closeCategoryWord = () => {
    setcategory('');
  }
    
  return (
   <div>
    <Navbar openSideBar={openSideBar} keyWordhandler={keyWordhandler} searchHanler={getPhotosByKeyword} keyword={keyword} limit={limit} />
     <div className="container flex mt-[70px] mx-auto">
    {category && <p className="bg-white text-slate-600 rounded z-50 fixed px-2 left-1">
      <span onClick={closeCategoryWord} className="cursor-pointer"><Close /></span>
      {category}
    </p> }
      <div className="flex flex-wrap items-center justify-center mx-auto gap-2 mt-5 p-1">
        {photos.map(photo => (
          <Card photo={photo} key={photo.slug} /> 
        ))}
    </div>
    <Sidebar handler={categoryHandler} isOpened={isOpened} />
    </div>
   </div>
    
  )
}
