import React from 'react';

const GenderSelection = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 pb-20 md:pb-24 lg:pb-8 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 max-w-md md:max-w-lg lg:max-w-xl w-full text-center animate-slide-up">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg card-hover">
            <span className="text-2xl sm:text-3xl">👤</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            Pilih Jenis Kelamin
          </h1>
          <p className="text-gray-600 text-sm sm:text-base px-2">
            Ini akan menentukan range nada yang sesuai untuk kemampuan vokal kamu
          </p>
        </div>
        
        {/* Gender Options - Desktop: Side by side, Mobile: Stacked */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8 mb-6 sm:mb-8">
          <button
            onClick={() => onSelect('male')}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-5 sm:py-6 lg:py-8 xl:py-10 px-4 sm:px-6 lg:px-8 xl:px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3 lg:gap-6 touch-target active:scale-95"
            aria-label="Pilih Laki-laki"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:text-left text-center gap-3 lg:gap-4 flex-1">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0 touch-target">
                <span className="text-3xl sm:text-4xl lg:text-5xl">👨</span>
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">Laki-laki</p>
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg mt-1">Range: E2 - E4</p>
                <p className="text-blue-100 text-xs sm:text-sm lg:text-base mt-1">82-330 Hz</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => onSelect('female')}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-5 sm:py-6 lg:py-8 xl:py-10 px-4 sm:px-6 lg:px-8 xl:px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3 lg:gap-6 touch-target active:scale-95"
            aria-label="Pilih Perempuan"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:text-left text-center gap-3 lg:gap-4 flex-1">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0 touch-target">
                <span className="text-3xl sm:text-4xl lg:text-5xl">👩</span>
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">Perempuan</p>
                <p className="text-pink-100 text-sm sm:text-base lg:text-lg mt-1">Range: A3 - A5</p>
                <p className="text-pink-100 text-xs sm:text-sm lg:text-base mt-1">220-880 Hz</p>
              </div>
            </div>
          </button>
        </div>
        
        {/* Info */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-200">
          <div className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4 text-xs sm:text-sm lg:text-base text-gray-600">
            <span className="w-2 h-2 lg:w-3 lg:h-3 bg-blue-400 rounded-full mt-1.5 lg:mt-2 flex-shrink-0"></span>
            <span className="text-left">
              Range nada akan disesuaikan dengan kemampuan vokal yang umum untuk setiap jenis kelamin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;
