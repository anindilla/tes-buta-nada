import React from 'react';

const WelcomeScreen = ({ onStart, onShowTips }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 pb-20 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 md:p-10 max-w-lg w-full text-center animate-slide-up">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl mb-4 sm:mb-6 shadow-xl border-2 border-gray-200 card-hover">
            <span className="text-gray-800 text-3xl sm:text-4xl">🎵</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            Tes Buta Nada
          </h1>
          <p className="text-gray-600 text-base sm:text-lg font-medium px-2">
            Uji kemampuan pitch kamu dengan teknologi AI
          </p>
        </div>
        
        {/* Features */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-left">
            <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl card-hover border border-blue-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 touch-target">
                <span className="text-white text-base sm:text-lg drop-shadow-sm">👂</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">Dengarkan</p>
                <p className="text-gray-600 text-xs truncate">Nada referensi</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl card-hover border border-green-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 touch-target">
                <span className="text-white text-base sm:text-lg drop-shadow-sm">🎤</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">Rekam</p>
                <p className="text-gray-600 text-xs truncate">Suara kamu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl card-hover border border-purple-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 touch-target">
                <span className="text-white text-base sm:text-lg drop-shadow-sm">📊</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">Analisis</p>
                <p className="text-gray-600 text-xs truncate">AI pitch detection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl card-hover border border-orange-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 touch-target">
                <span className="text-white text-base sm:text-lg drop-shadow-sm">🏆</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">Skor</p>
                <p className="text-gray-600 text-xs truncate">10 rounds</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={onStart}
            className="btn-primary text-base sm:text-lg touch-target"
            aria-label="Mulai tes pitch"
          >
            Mulai Tes Sekarang
          </button>
          
          <button
            onClick={onShowTips}
            className="btn-secondary text-sm sm:text-base touch-target"
            aria-label="Lihat tips meningkatkan pitch"
          >
            💡 Tips Meningkatkan Pitch
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>Mikrofon diperlukan</span>
        </div>
        
        <p className="text-xs text-gray-400 mt-3 sm:mt-4 px-2">
          Pastikan mikrofon kamu sudah aktif dan volume speaker cukup keras
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
