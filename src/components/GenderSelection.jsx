import React from 'react';

const GenderSelection = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 pb-20">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/20">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">👤</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Pilih Jenis Kelamin
          </h1>
          <p className="text-gray-600">
            Ini akan menentukan range nada yang sesuai untuk kemampuan vokal kamu
          </p>
        </div>
        
        {/* Gender Options */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => onSelect('male')}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-2xl">👨</span>
              </div>
              <div className="text-left">
                <p className="text-lg font-bold">Laki-laki</p>
                <p className="text-blue-100 text-sm">Range: E2 - E4</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">82-330 Hz</p>
            </div>
          </button>
          
          <button
            onClick={() => onSelect('female')}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-6 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-2xl">👩</span>
              </div>
              <div className="text-left">
                <p className="text-lg font-bold">Perempuan</p>
                <p className="text-pink-100 text-sm">Range: A3 - A5</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-pink-100">220-880 Hz</p>
            </div>
          </button>
        </div>
        
        {/* Info */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>Range nada akan disesuaikan dengan kemampuan vokal yang umum untuk setiap jenis kelamin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;