'use client';
import { getByCategory, getPhots, searchUnsplashPhotos } from "@/lib";
import Sidebar from "@/components/sidebar";
import { accessKey } from "./consonants";
import { useEffect, useState } from "react";
import Card, { Photo } from "@/components/card";
import Navbar from "@/components/navbar";
import { Close } from "@mui/icons-material";

export default function Home() {
  const [photos, setphotos] = useState<Photo | []>([]);
  const [category, setcategory] = useState<string>('');
  const [isOpened, setisOpened] = useState<Boolean>(false);
  const [limit, setlimit] = useState(20);
  const [keyword, setkeyword] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function getData(accessKey: string, limit: number, category = '') {
      try {
        setloading(true);
        const data = await getPhots(accessKey, limit);
        setphotos(data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    }
    getData(accessKey, limit, category);
  }, []);

  useEffect(() => {
    async function getCategoryPhotos(accessKey: string, category: string) {
      if (category) {
        setloading(true);
        const categoryData = await getByCategory(accessKey, category);
        setphotos(categoryData);
        setloading(false);
      }
    }
    getCategoryPhotos(accessKey, category);
  }, [category]);

  const categoryHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const text = target.innerText;
    setcategory(text);
    setisOpened(false);
  };

  const openSideBar = () => setisOpened(prev => !prev);

  const keyWordhandler = (e: React.FormEvent<HTMLFormElement>) => {
    setkeyword(e.currentTarget.value);
  };

  const getPhotosByKeyword = async (keyword: string, limit: number) => {
    if (keyword) {
      try {
        setloading(true);
        const data = await searchUnsplashPhotos(keyword, 1, limit);
        setphotos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    }
  };

  const closeCategoryWord = () => {
    setcategory('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar
        openSideBar={openSideBar}
        keyWordhandler={keyWordhandler}
        searchHanler={getPhotosByKeyword}
        keyword={keyword}
        limit={limit}
      />

      <div className="container mx-auto pt-24 pb-12 px-4">
        {/* Active Category Badge */}
        {category && (
          <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-500/30">
              <span className="font-semibold">{category}</span>
              <button
                onClick={closeCategoryWord}
                className="p-1 hover:bg-white/20 rounded-full transition-colors duration-300"
              >
                <Close className="text-white text-sm" />
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-700">
            {photos.map(photo => (
              <Card photo={photo} key={photo.slug} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && photos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-slate-300 mb-2">No photos found</h3>
            <p className="text-slate-500">Try a different search or category</p>
          </div>
        )}
      </div>

      <Sidebar handler={categoryHandler} isOpened={isOpened} />
    </div>
  );
}