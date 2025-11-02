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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 pb-20">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-white/20">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">{currentRound}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Round {currentRound}</h1>
                <p className="text-sm text-gray-500">dari 10 rounds</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <p className="text-lg font-bold text-purple-600">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">⚠️</span>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {/* Game Content */}
        {!showResult ? (
          <>
            {/* Play Tone Section */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Dengarkan nada ini
                </h2>
                <p className="text-gray-600">Klik tombol di bawah untuk memutar nada referensi</p>
              </div>
              
              <button
                onClick={handlePlayTone}
                disabled={isPlaying}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:shadow-none"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    {isPlaying ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="text-lg">▶️</span>
                    )}
                  </div>
                  <span className="text-lg">
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
              <div className="mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Sekarang rekam suara kamu
                  </h2>
                  <p className="text-gray-600">Nyanyikan nada yang sama dengan yang baru saja kamu dengar</p>
                </div>
                
                {!isRecording ? (
                  <button
                    onClick={handleRecord}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
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
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
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
                  <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border-2 border-red-200">
                    <div className="flex items-start space-x-3">
                      <div className="text-red-500 text-xl">⚠️</div>
                      <div className="flex-1">
                        <p className="font-semibold text-red-800 mb-2">Error Rekaman</p>
                        <p className="text-sm text-red-700 mb-3">{error}</p>
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
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-800">Pitch Terdeteksi</p>
                        <p className="text-green-600 font-bold">{detectedPitch.toFixed(1)} Hz</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Sampel</p>
                        <p className="text-gray-600">{pitchHistory.length} readings</p>
                      </div>
                    </div>
                    {pitchHistory.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-green-200">
                        <p className="text-xs text-gray-600">
                          Rata-rata: {(pitchHistory.reduce((sum, p) => sum + p, 0) / pitchHistory.length).toFixed(1)} Hz
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Recording Playback */}
                {recordedAudio && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">Recording Berhasil!</p>
                        <p className="text-sm text-gray-600">Klik untuk memutar ulang</p>
                      </div>
                      <button
                        onClick={playRecording}
                        disabled={isPlayingRecording}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {isPlayingRecording ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Playing...</span>
                          </>
                        ) : (
                          <>
                            <span>▶️</span>
                            <span>Play</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Continue Button */}
            {hasRecorded && !isAnalyzing && (
              <button
                onClick={handleContinue}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <span className="text-lg">📊</span>
                  </div>
                  <span className="text-lg">Analisis & Lanjut</span>
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