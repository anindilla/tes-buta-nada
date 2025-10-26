import React from 'react';
import { calculateTotalScore, getScoreCategory } from '../utils/scoreCalculator';

const FinalResults = ({ roundScores, onRestart }) => {
  const totalScore = calculateTotalScore(roundScores);
  const category = getScoreCategory(totalScore);
  
  const getScoreColor = (score) => {
    if (score === 5) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (score === 3) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };
  
  const getScoreIcon = (score) => {
    if (score === 5) return '🎵';
    if (score === 3) return '🎶';
    return '🎼';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">🏆</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Hasil Tes
          </h1>
          <p className="text-gray-600 text-lg">
            Berikut adalah hasil kemampuan pitch kamu
          </p>
        </div>
        
        {/* Main Result Card */}
        <div className={`${category.bgColor} rounded-3xl p-8 mb-8 border-2 ${category.color.includes('green') ? 'border-green-200' : category.color.includes('blue') ? 'border-blue-200' : category.color.includes('yellow') ? 'border-yellow-200' : 'border-red-200'}`}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/50 rounded-2xl mb-4">
              <span className="text-5xl">
                {totalScore >= 45 ? '🏆' : 
                 totalScore >= 30 ? '🎵' : 
                 totalScore >= 20 ? '🤔' : '😅'}
              </span>
            </div>
            <h2 className={`text-3xl font-bold ${category.color} mb-3`}>
              {category.category}
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              {category.description}
            </p>
            
            {/* Score Display */}
            <div className="bg-white/60 rounded-2xl p-6">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {totalScore}/50
              </div>
              <p className="text-gray-600 font-medium">Total Skor</p>
            </div>
          </div>
        </div>
        
        {/* Score Breakdown */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Detail Skor per Round
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {roundScores.map((score, index) => (
              <div 
                key={index}
                className={`${getScoreColor(score)} text-white rounded-xl p-3 text-center shadow-lg transform hover:scale-105 transition-transform`}
              >
                <div className="text-lg font-bold mb-1">{getScoreIcon(score)}</div>
                <div className="text-sm font-semibold">Round {index + 1}</div>
                <div className="text-lg font-bold">{score}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {roundScores.filter(s => s === 5).length}
            </div>
            <div className="text-sm text-gray-600">Sempurna</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {roundScores.filter(s => s === 3).length}
            </div>
            <div className="text-sm text-gray-600">Hampir Tepat</div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {roundScores.filter(s => s === 0).length}
            </div>
            <div className="text-sm text-gray-600">Perlu Latihan</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-lg">🔄</span>
              </div>
              <span className="text-lg">Main Lagi</span>
            </div>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-sm">🚪</span>
              </div>
              <span>Keluar</span>
            </div>
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Tes ini hanya untuk hiburan dan tidak menggantikan penilaian profesional dari ahli musik atau audiologis
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalResults;