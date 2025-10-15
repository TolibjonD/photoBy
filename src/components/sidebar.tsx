import { unsplashTopics } from '@/app/consonants';
import { Button } from '@mui/material';
import { Close, Category } from '@mui/icons-material';

export default function Sidebar({ handler, isOpened }) {
  const clickHandler = (e) => {
    handler(e);
  };

  return (
    <>
      {/* Overlay */}
      {isOpened && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={clickHandler}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-l border-slate-700/50 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isOpened ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <Category className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Categories
              </h2>
            </div>
            <button
              onClick={clickHandler}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
            >
              <Close className="text-slate-400 hover:text-white transition-colors duration-300" />
            </button>
          </div>

          {/* Random Photos Button */}
          <button
            onClick={e => clickHandler(e)}
            className="w-full mb-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
          >
            🎲 Random Photos
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-800 px-3 text-sm text-slate-400">Browse Topics</span>
            </div>
          </div>

          {/* Category Buttons */}
          <div className="space-y-3">
            {unsplashTopics.map(topic => (
              <button
                key={topic.slug}
                onClick={e => clickHandler(e)}
                className="w-full px-6 py-3 bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700/50 hover:border-blue-500/50 text-gray-200 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-left group"
              >
                <span className="group-hover:text-blue-400 transition-colors duration-300">
                  {topic.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}