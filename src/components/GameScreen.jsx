import React, { useState, useEffect } from 'react';
import { useToneGenerator } from '../utils/toneGenerator';
import { usePitchDetection } from '../hooks/usePitchDetection';

const GameScreen = ({ gender, currentRound, onRoundComplete, onFinish }) => {
  const [currentTone, setCurrentTone] = useState(null);
  const [hasPlayedTone, setHasPlayedTone] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  
  const { playRandomTone, isPlaying } = useToneGenerator();
  const { 
    isRecording, 
    detectedPitch, 
    isAnalyzing, 
    pitchHistory,
    error,
    recordedAudio,
    isPlayingRecording,
    startRecording, 
    stopRecording, 
    playRecording,
    analyzePitch,
    reset 
  } = usePitchDetection();
  
  const handlePlayTone = async () => {
    const tone = await playRandomTone(gender);
    if (tone) {
      setCurrentTone(tone);
      setHasPlayedTone(true);
    }
  };
  
  const handleRecord = async (e) => {
    e.preventDefault(); // Prevent any form submission
    e.stopPropagation(); // Stop event bubbling
    
    if (!hasPlayedTone) return;
    
    try {
      console.log('🎤 Starting recording from GameScreen...');
      await startRecording();
      console.log('✅ Recording started successfully');
    } catch (error) {
      console.error('❌ Error in handleRecord:', error);
      alert('Error starting recording: ' + error.message);
    }
  };
  
  const handleStopRecord = () => {
    stopRecording();
    setHasRecorded(true);
  };
  
  const handleContinue = () => {
    if (!hasRecorded) return;
    
    const result = analyzePitch(currentTone.frequency);
    setRoundResult(result);
    setShowResult(true);
  };
  
  const handleNextRound = () => {
    onRoundComplete(roundResult.score);
    reset();
    setCurrentTone(null);
    setHasPlayedTone(false);
    setHasRecorded(false);
    setShowResult(false);
    setRoundResult(null);
  };
  
  const handleFinish = () => {
    onFinish();
  };
  
  const progressPercentage = (currentRound / 10) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 pb-20 md:pb-24 lg:pb-8 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 max-w-lg md:max-w-xl lg:max-w-2xl w-full animate-slide-up">
        {/* Header with Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-base">{currentRound}</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Round {currentRound}</h1>
                <p className="text-xs sm:text-sm text-gray-500">dari 10 rounds</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-xs sm:text-sm text-gray-500">Progress</p>
              <p className="text-base sm:text-lg font-bold text-purple-600">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl animate-slide-up">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
              <p className="text-red-700 text-xs sm:text-sm flex-1">{error}</p>
            </div>
          </div>
        )}
        
        {/* Game Content */}
        {!showResult ? (
          <>
            {/* Desktop: Two-column layout, Mobile: Stacked */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8 space-y-8 lg:space-y-0">
              {/* Play Tone Section */}
              <div className="lg:mb-0">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 lg:mb-3">
                    Dengarkan nada ini
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Klik tombol di bawah untuk memutar nada referensi</p>
                </div>
              
              <button
                onClick={handlePlayTone}
                disabled={isPlaying}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 sm:py-6 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:shadow-none touch-target active:scale-95"
                aria-label={isPlaying ? 'Memutar nada' : 'Putar nada referensi'}
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    {isPlaying ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="text-lg">▶️</span>
                    )}
                  </div>
                  <span className="text-base sm:text-lg">
                    {isPlaying ? 'Memutar...' : 'Putar Nada'}
                  </span>
                </div>
              </button>
              
              {currentTone && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">Nada: {currentTone.note}</p>
                      <p className="text-sm text-gray-600">{currentTone.frequency.toFixed(1)} Hz</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">🎵</span>
                    </div>
                  </div>
                </div>
              )}
              </div>
              
              {/* Record Section */}
              {hasPlayedTone && (
                <div>
                  {!isRecording ? (
                  <button
                    onClick={handleRecord}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 sm:py-6 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl touch-target active:scale-95"
                    aria-label="Mulai rekam suara"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="text-lg">🎤</span>
                      </div>
                      <span className="text-lg">Rekam Suara</span>
                    </div>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border-2 border-red-200">
                      <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-600 font-bold text-lg">Sedang merekam...</span>
                      <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <button
                      onClick={handleStopRecord}
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-5 sm:py-6 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl touch-target active:scale-95"
                      aria-label="Stop rekam suara"
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <span className="text-lg">⏹️</span>
                        </div>
                        <span className="text-lg">Stop Rekam</span>
                      </div>
                    </button>
                  </div>
                  )}
                  
                    {/* Error Display */}
                  {error && (
                    <div className="mt-4 lg:mt-6 p-4 lg:p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border-2 border-red-200">
                      <div className="flex items-start space-x-3">
                        <div className="text-red-500 text-xl lg:text-2xl flex-shrink-0">⚠️</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-red-800 mb-2 text-sm lg:text-base">Error Rekaman</p>
                          <p className="text-xs sm:text-sm lg:text-base text-red-700 mb-3 break-words">{error}</p>
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            reset();
                            try {
                              await handleRecord(e);
                            } catch (err) {
                              // Error will be displayed automatically
                              console.error('Retry failed:', err);
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Coba Lagi
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Pitch Detection Display */}
                  {detectedPitch && (
                    <div className="mt-4 lg:mt-6 p-4 lg:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 text-sm lg:text-base">
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">Pitch Terdeteksi</p>
                          <p className="text-green-600 font-bold text-lg lg:text-xl">{detectedPitch.toFixed(1)} Hz</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">Sampel</p>
                          <p className="text-gray-600 text-lg lg:text-xl">{pitchHistory.length} readings</p>
                        </div>
                        {pitchHistory.length > 0 && (
                          <div className="lg:col-span-1">
                            <p className="font-semibold text-gray-800 mb-1">Rata-rata</p>
                            <p className="text-gray-700 font-bold text-lg lg:text-xl">
                              {(pitchHistory.reduce((sum, p) => sum + p, 0) / pitchHistory.length).toFixed(1)} Hz
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Recording Playback */}
                  {recordedAudio && (
                    <div className="mt-4 lg:mt-6 p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm lg:text-base">Recording Berhasil!</p>
                          <p className="text-xs sm:text-sm lg:text-base text-gray-600">Klik untuk memutar ulang</p>
                        </div>
                      <button
                        onClick={playRecording}
                        disabled={isPlayingRecording}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {isPlayingRecording ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm lg:text-base">Playing...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg">▶️</span>
                            <span className="text-sm lg:text-base">Play</span>
                          </>
                        )}
                      </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Continue Button - Full Width */}
            {hasRecorded && !isAnalyzing && (
              <button
                onClick={handleContinue}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-5 sm:py-6 lg:py-6 px-6 sm:px-8 lg:px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl touch-target active:scale-95"
                aria-label="Analisis dan lanjut ke hasil"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <span className="text-lg">📊</span>
                  </div>
                  <span className="text-base sm:text-lg lg:text-xl">Analisis & Lanjut</span>
                </div>
              </button>
            )}
            
            {/* Analyzing State */}
            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
                  <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Menganalisis...</h3>
                <p className="text-gray-600">AI sedang memproses pitch kamu</p>
              </div>
            )}
          </>
        ) : (
          /* Result Display */
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                <span className="text-4xl">
                  {roundResult.category === 'on tune' ? '🎵' : 
                   roundResult.category === 'nearly there' ? '🎶' : '🎼'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {roundResult.category === 'on tune' ? 'Sempurna!' :
                 roundResult.category === 'nearly there' ? 'Hampir tepat!' : 'Coba lagi!'}
              </h2>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-xl">
                  <p className="text-sm text-gray-600">Skor</p>
                  <p className="text-2xl font-bold text-purple-600">{roundResult.score}/5</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-xl">
                  <p className="text-sm text-gray-600">Perbedaan</p>
                  <p className="text-lg font-bold text-gray-700">±{roundResult.centsDiff.toFixed(0)} cents</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Button */}
            <button
              onClick={currentRound < 10 ? handleNextRound : handleFinish}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <span className="text-lg">
                    {currentRound < 10 ? '➡️' : '🏆'}
                  </span>
                </div>
                <span className="text-lg">
                  {currentRound < 10 ? 'Round Berikutnya' : 'Lihat Hasil Akhir'}
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;