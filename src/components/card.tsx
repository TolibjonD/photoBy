import { Favorite, OpenInNew, CalendarMonth, Download } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Phot {
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
  };
}

export default function Card({ photo }: { photo: Phot }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const formatDate = (date: string) => {
    const now = new Date();
    const photoDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - photoDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  return (
    <div className="group relative w-full md:w-[300px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-700/50">
      {/* Image Container */}
      <div
        className="relative h-[320px] overflow-hidden cursor-pointer bg-gradient-to-br from-slate-700 to-slate-800"
        onClick={() => window.open(photo.url, '_blank')}
      >
        {/* Beautiful Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Spinning Ring Loader */}
                <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            {/* Animated Wave Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-wave" />
          </div>
        )}

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="text-5xl mb-3 opacity-50">📷</div>
            <p className="text-slate-400 text-sm">Failed to load</p>
          </div>
        )}

        {/* Image */}
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          priority={true}
          className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
            }`}
          onLoadingComplete={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />

        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-300 ${imageLoaded ? 'opacity-60 group-hover:opacity-40' : 'opacity-0'
          }`} />

        {/* Hover Action Icon */}
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${!imageLoaded && 'pointer-events-none'
          }`}>
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <OpenInNew className="text-white text-3xl" />
          </div>
        </div>

        {/* Likes Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Favorite className="text-pink-400" sx={{ fontSize: 18 }} />
          <span className="text-white text-sm font-semibold">{photo.likes.toLocaleString()}</span>
        </div>

        {/* Color Tag */}
        <div className="absolute top-3 left-3">
          <div
            className="w-10 h-10 rounded-full border-2 border-white/80 shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: photo?.color || '#334155' }}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <h3
          className="text-white font-semibold text-lg line-clamp-2 leading-tight hover:text-blue-400 transition-colors duration-200 cursor-pointer min-h-[3.5rem]"
          title={photo.title}
          onClick={() => window.open(photo.url, '_blank')}
        >
          {photo.title}
        </h3>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar
              src={photo?.user?.url}
              alt={photo.user?.name}
              sx={{
                width: 40,
                height: 40,
                border: '2px solid #3b82f6'
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-200 font-medium text-sm truncate">
              {photo.user?.name || 'Anonymous'}
            </p>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <CalendarMonth sx={{ fontSize: 14 }} />
              <span>{formatDate(photo.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => window.open(photo.url, '_blank')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105"
          >
            <OpenInNew sx={{ fontSize: 18 }} />
            <span className="text-sm">View</span>
          </button>

          {photo.download && (
            <button
              onClick={() => window.open(photo.download, '_blank')}
              className="flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              title="Download"
            >
              <Download sx={{ fontSize: 18 }} />
            </button>
          )}
        </div>
      </div>

      {/* Decorative Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500 pointer-events-none" />
    </div>
  );
}