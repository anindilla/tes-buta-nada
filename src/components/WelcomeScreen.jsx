import React from 'react';

const WelcomeScreen = ({ onStart, onShowTips }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-white/20">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl mb-4 shadow-xl border-2 border-gray-200">
            <span className="text-gray-800 text-4xl">🎵</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Tes Buta Nada
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Uji kemampuan pitch kamu dengan teknologi AI
          </p>
        </div>
        
        {/* Features */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-sm drop-shadow-sm">👂</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Dengarkan</p>
                <p className="text-gray-600 text-xs">Nada referensi</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-sm drop-shadow-sm">🎤</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Rekam</p>
                <p className="text-gray-600 text-xs">Suara kamu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-sm drop-shadow-sm">📊</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Analisis</p>
                <p className="text-gray-600 text-xs">AI pitch detection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-sm drop-shadow-sm">🏆</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Skor</p>
                <p className="text-gray-600 text-xs">10 rounds</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="space-y-4">
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg shadow-lg"
          >
            Mulai Tes Sekarang
          </button>
          
          <button
            onClick={onShowTips}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-base shadow-lg"
          >
            💡 Tips Meningkatkan Pitch
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>Mikrofon diperlukan</span>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          Pastikan mikrofon kamu sudah aktif dan volume speaker cukup keras
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;