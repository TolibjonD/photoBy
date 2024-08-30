import { Favorite } from '@mui/icons-material';
import { Avatar, Divider, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from 'react'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Link from 'next/link';

export interface Photo {
    url: string;
    title: string;
    slug: string;
    created_at: string;
    likes: number;
    download?: string;
    color?: string;
    user?: {
        name?: string;
        url?: string;
    },
};

export default function Card({photo}: {photo: Photo}) {
  return (
    <div className="card bg-slate-900 rounded min-h-[400px] md:w-[280px] w-[90%] mx-auto md:mx-0 overflow-hidden relative">
        <div className="photo w-[100%] min-h-[200px] h-auto relative bg-gray-700" style={{backgroundImage: 'url(/images/coming-soon.jpg)', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'}}>
        <Image src={photo.url} alt={photo.title} fill priority={true} />
        <p className='flex items-center gap-1 top-2 left-2 bg-slate-700 rounded p-1 absolute'>
                <Favorite className='text-white' />
                <span className='text-slate-300 text-sm'>{photo.likes}</span>
            </p>
        </div>
        <div className="content mt-1 p-2">
          <p className="text-sm text-center rounded" style={{backgroundColor: photo?.color}}>{ photo.title.slice(0,35) }...</p>
            
            <div className='my-3 flex gap-2 items-center'>
                <Avatar src={photo?.user?.url} alt={photo.user?.name} />
                <Typography className='text-gray-300'>
                    {photo.user?.name}
                </Typography>
            </div>
            <Link href={photo.download} legacyBehavior>
            <div className='flex items-center gap-2 p-2 bg-gray-700 justify-center rounded cursor-pointer'>
            <a download={photo.download}>
                <DownloadForOfflineIcon className='text-slate-300' />
                <span className='text-sm text-gray-300'>Download</span>
            </a>
            </div>
            </Link>
          <div className="absolute left-0 right-0 bottom-0 p-2">
          <Divider className="bg-gray-700" />
          <p className="text-sm text-center text-gray-500 flex items-center justify-center mt-2 gap-2">
            <CalendarMonthIcon />
            {moment(photo.created_at).fromNow()}</p>
          </div>
        </div>
      </div>
  )
}
