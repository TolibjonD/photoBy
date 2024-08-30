'use client'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function Navbar({openSideBar, keyWordhandler, searchHanler, keyword, limit}) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior
        await searchHanler(keyword, limit);
      };
    
  return (
    <div className='flex fixed w-[100%] z-50 top-0 items-center justify-between py-3 md:px-[50px] px-[5px] bg-slate-900'>
        <Link href="/" className="logo text-2xl">
        Photo<span className='text-slate-500'>By</span>
        </Link>
        <div className="search_panel border-b-2 border-slate-500 h-[40px] w-[140px] md:w-[250px] flex items-center ">
            <form onSubmit={handleSubmit} className="flex items-center justify-between">
                <input onChange={e => keyWordhandler(e)} type="text" name="q" id="q" className='bg-transparent border-none focus:bg-slate-700 outline-none md:w-[100%] w-[100px]' placeholder='Search...' />
                <Button variant="text" type="submit">
                    <SearchIcon className='text-slate-300' />
                </Button>
            </form>
            <i className="fa-brands fa-twitter"></i>
        </div>
        <div className="links">
            <Button onClick={openSideBar}>
            <MenuIcon className='text-3xl text-slate-500' />
            </Button>
        </div>
    </div>
  )
}
