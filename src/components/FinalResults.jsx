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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 pb-20 md:pb-24 lg:pb-16 xl:pb-20 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 max-w-2xl md:max-w-3xl lg:max-w-4xl w-full animate-slide-up">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg card-hover">
            <span className="text-3xl sm:text-4xl">🏆</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            Hasil Tes
          </h1>
          <p className="text-gray-600 text-base sm:text-lg px-2">
            Berikut adalah hasil kemampuan pitch kamu
          </p>
        </div>
        
        {/* Main Result Card */}
        <div className={`${category.bgColor} rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 mb-6 sm:mb-8 lg:mb-12 border-2 ${category.color.includes('green') ? 'border-green-200' : category.color.includes('blue') ? 'border-blue-200' : category.color.includes('yellow') ? 'border-yellow-200' : 'border-red-200'}`}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-white/50 rounded-2xl lg:rounded-3xl mb-4 sm:mb-6 lg:mb-8">
              <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                {totalScore >= 45 ? '🏆' : 
                 totalScore >= 30 ? '🎵' : 
                 totalScore >= 20 ? '🤔' : '😅'}
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold ${category.color} mb-2 sm:mb-3 lg:mb-4`}>
              {category.category}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 lg:mb-8 px-2">
              {category.description}
            </p>
            
            {/* Score Display */}
            <div className="bg-white/60 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-md mx-auto">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-2">
                {totalScore}/50
              </div>
              <p className="text-gray-600 font-medium text-sm sm:text-base lg:text-lg">Total Skor</p>
            </div>
          </div>
        </div>
        
        {/* Score Breakdown - Desktop: 10 cols, Mobile: 5 cols */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-center">
            Detail Skor per Round
          </h3>
          <div className="grid grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-3 lg:gap-4">
            {roundScores.map((score, index) => (
              <div 
                key={index}
                className={`${getScoreColor(score)} text-white rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 xl:p-6 text-center shadow-lg transform hover:scale-105 transition-transform card-hover`}
              >
                <div className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold mb-1">{getScoreIcon(score)}</div>
                <div className="text-xs sm:text-sm lg:text-base font-semibold mb-1">Round {index + 1}</div>
                <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">{score}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistics - Desktop: Larger cards, Mobile: Compact */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
              {roundScores.filter(s => s === 5).length}
            </div>
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">Sempurna</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-yellow-600 mb-1 sm:mb-2">
              {roundScores.filter(s => s === 3).length}
            </div>
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">Hampir Tepat</div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-red-600 mb-1 sm:mb-2">
              {roundScores.filter(s => s === 0).length}
            </div>
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">Perlu Latihan</div>
          </div>
        </div>
        
        {/* Action Buttons - Desktop: Side by side, Mobile: Stacked */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-0 lg:space-x-4 lg:flex lg:justify-center">
          <button
            onClick={onRestart}
            className="w-full lg:w-auto btn-primary text-base sm:text-lg lg:px-12 lg:py-6 touch-target"
            aria-label="Main tes lagi"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-lg">🔄</span>
              </div>
              <span>Main Lagi</span>
            </div>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full lg:w-auto btn-secondary text-sm sm:text-base lg:px-12 lg:py-6 touch-target"
            aria-label="Keluar dari aplikasi"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-sm lg:text-base">🚪</span>
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