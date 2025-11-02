import React from 'react';

const WelcomeScreen = ({ onStart, onShowTips }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 pb-20 md:pb-24 lg:pb-8 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl w-full text-center animate-slide-up">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white rounded-3xl mb-4 sm:mb-6 shadow-xl border-2 border-gray-200 card-hover">
            <span className="text-gray-800 text-3xl sm:text-4xl lg:text-5xl">🎵</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-4">
            Tes Buta Nada
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium px-2 max-w-2xl mx-auto">
            Uji kemampuan pitch kamu dengan teknologi AI
          </p>
        </div>
        
        {/* Features - Mobile: 2x2 grid, Desktop: Horizontal row with full text */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          {/* Mobile: 2x2 Grid */}
          <div className="grid grid-cols-2 lg:hidden gap-3 sm:gap-4 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl card-hover border border-blue-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 touch-target">
                <span className="text-white text-base sm:text-lg drop-shadow-sm">👂</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">Dengarkan</p>
                <p className="text-gray-600 text-xs">Nada referensi</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl card-hover border border-green-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 touch-target">
                <span className="text-white text-base sm:text-lg drop-shadow-sm">🎤</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">Rekam</p>
                <p className="text-gray-600 text-xs">Suara kamu</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl card-hover border border-purple-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 touch-target">
                <span className="text-white text-base sm:text-lg drop-shadow-sm">📊</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">Analisis</p>
                <p className="text-gray-600 text-xs">AI pitch detection</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl card-hover border border-orange-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 touch-target">
                <span className="text-white text-base sm:text-lg drop-shadow-sm">🏆</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">Skor</p>
                <p className="text-gray-600 text-xs">10 rounds</p>
              </div>
            </div>
          </div>
          
          {/* Desktop: Horizontal row with full text, no truncation */}
          <div className="hidden lg:grid grid-cols-4 gap-4 xl:gap-6">
            <div className="flex flex-col items-center text-center p-6 xl:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl card-hover border border-blue-100 space-y-4">
              <div className="w-16 h-16 xl:w-20 xl:h-20 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl xl:text-4xl drop-shadow-sm">👂</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-base xl:text-lg mb-1">Dengarkan</p>
                <p className="text-gray-600 text-sm xl:text-base">Nada referensi</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 xl:p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl card-hover border border-green-100 space-y-4">
              <div className="w-16 h-16 xl:w-20 xl:h-20 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl xl:text-4xl drop-shadow-sm">🎤</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-base xl:text-lg mb-1">Rekam</p>
                <p className="text-gray-600 text-sm xl:text-base">Suara kamu</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 xl:p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl card-hover border border-purple-100 space-y-4">
              <div className="w-16 h-16 xl:w-20 xl:h-20 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl xl:text-4xl drop-shadow-sm">📊</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-base xl:text-lg mb-1">Analisis</p>
                <p className="text-gray-600 text-sm xl:text-base">AI pitch detection</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 xl:p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl card-hover border border-orange-100 space-y-4">
              <div className="w-16 h-16 xl:w-20 xl:h-20 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl xl:text-4xl drop-shadow-sm">🏆</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-base xl:text-lg mb-1">Skor</p>
                <p className="text-gray-600 text-sm xl:text-base">10 rounds</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons - Mobile: Stacked, Desktop: Side by side */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-0 lg:space-x-4 lg:flex lg:justify-center mb-6 sm:mb-8 lg:mb-12">
          <button
            onClick={onStart}
            className="btn-primary text-base sm:text-lg lg:w-auto lg:px-12 lg:py-4 touch-target"
            aria-label="Mulai tes pitch"
          >
            Mulai Tes Sekarang
          </button>
          
          <button
            onClick={onShowTips}
            className="btn-secondary text-sm sm:text-base lg:w-auto lg:px-12 lg:py-4 touch-target"
            aria-label="Lihat tips meningkatkan pitch"
          >
            💡 Tips Meningkatkan Pitch
          </button>
        </div>
        
        {/* Footer Info */}
        <div className="mt-6 sm:mt-8 lg:mt-12 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm lg:text-base text-gray-500">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
            <span>Mikrofon diperlukan</span>
          </div>
          
          <p className="text-xs sm:text-sm lg:text-base text-gray-400 px-2 max-w-xl mx-auto">
            Pastikan mikrofon kamu sudah aktif dan volume speaker cukup keras
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
