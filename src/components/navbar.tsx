'use client'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { PhotoCamera } from '@mui/icons-material';

export default function Navbar({ openSideBar, keyWordhandler, searchHanler, keyword, limit }: { openSideBar: () => void, keyWordhandler: (e: React.FormEvent<HTMLFormElement>) => void, searchHanler: (keyword: string | null, limit: number) => Promise<void>, keyword: string | null, limit: number }) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await searchHanler(keyword, limit);
    };

    return (
        <nav className='fixed w-full z-50 top-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-lg border-b border-slate-700/50 shadow-2xl'>
            <div className='flex items-center justify-between py-4 md:px-12 px-4 max-w-7xl mx-auto'>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <PhotoCamera className="text-white text-2xl" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Photo<span className='text-slate-400'>Gallery</span>
                    </span>
                </Link>

                {/* Search Panel */}
                <div className="flex-1 max-w-md mx-4 md:mx-8">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
                            <input
                                onChange={e => keyWordhandler(e)}
                                type="text"
                                name="q"
                                id="q"
                                className='bg-transparent w-full px-5 py-2.5 pr-12 text-white placeholder-slate-400 focus:outline-none focus:bg-slate-700/30 rounded-full transition-all duration-300'
                                placeholder='Search photos...'
                            />
                            <Button
                                variant="text"
                                type="submit"
                                className="absolute right-1 top-1/2 -translate-y-1/2"
                            >
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
                                    <SearchIcon className='text-white text-xl' />
                                </div>
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Menu Button */}
                <Button
                    onClick={openSideBar}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl hover:bg-slate-700/50 transition-all duration-300 min-w-0 p-2"
                >
                    <MenuIcon className='text-3xl text-blue-400 hover:text-blue-300 transition-colors duration-300' />
                </Button>
            </div>
        </nav>
    );
}
