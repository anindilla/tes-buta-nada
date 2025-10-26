import React, { useState } from 'react';
import { usePitchDetection } from '../hooks/usePitchDetection';
import * as Tone from 'tone';

const AudioDebugPanel = () => {
  const [testFrequency, setTestFrequency] = useState(440);
  const [isPlaying, setIsPlaying] = useState(false);
  const [oscillator, setOscillator] = useState(null);
  
  const { 
    isRecording, 
    detectedPitch, 
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

  const playTestTone = async () => {
    try {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
      
      if (oscillator) {
        oscillator.stop();
        oscillator.dispose();
      }
      
      const osc = new Tone.Oscillator(testFrequency, 'sine').toDestination();
      osc.volume.value = -6;
      osc.start();
      
      setOscillator(osc);
      setIsPlaying(true);
      
      setTimeout(() => {
        osc.stop();
        osc.dispose();
        setOscillator(null);
        setIsPlaying(false);
      }, 3000);
      
      console.log('Playing test tone:', testFrequency, 'Hz');
    } catch (error) {
      console.error('Error playing test tone:', error);
    }
  };

  const testAnalysis = () => {
    const result = analyzePitch(testFrequency);
    console.log('Test Analysis Result:', result);
    alert(`Reference: ${testFrequency}Hz\nDetected: ${detectedPitch?.toFixed(1)}Hz\nScore: ${result.score}/5\nCategory: ${result.category}\nCents Diff: ${result.centsDiff.toFixed(1)}`);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Audio Debug Panel</h3>
      
      <div className="space-y-4">
        {/* Tone Generator */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-sm mb-2">Test Tone</h4>
          <div className="flex space-x-2">
            <input
              type="number"
              value={testFrequency}
              onChange={(e) => setTestFrequency(Number(e.target.value))}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="440"
            />
            <button
              onClick={playTestTone}
              disabled={isPlaying}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm"
            >
              {isPlaying ? 'Playing' : 'Play'}
            </button>
          </div>
          <div className="flex space-x-1 mt-2">
            {[220, 440, 880].map(freq => (
              <button
                key={freq}
                onClick={() => setTestFrequency(freq)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {freq}Hz
              </button>
            ))}
          </div>
        </div>
        
        {/* Recording Controls */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-sm mb-2">Recording</h4>
          <div className="flex space-x-2">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Start Record
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Stop Record
              </button>
            )}
            
            <button
              onClick={testAnalysis}
              disabled={!detectedPitch}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm"
            >
              Analyze
            </button>
            
            <button
              onClick={reset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Playback */}
        {recordedAudio && (
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-2">Playback</h4>
            <div className="space-y-2">
              <button
                onClick={playRecording}
                disabled={isPlayingRecording}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm"
              >
                {isPlayingRecording ? 'Playing...' : 'Play Recording'}
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = recordedAudio;
                  link.download = 'recording.webm';
                  link.click();
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Download Recording
              </button>
            </div>
          </div>
        )}
        
        {/* Status */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold text-sm mb-2">Status</h4>
          <div className="text-xs space-y-1">
            <p><span className="font-medium">Recording:</span> {isRecording ? 'Yes' : 'No'}</p>
            <p><span className="font-medium">Detected:</span> {detectedPitch ? `${detectedPitch.toFixed(1)} Hz` : 'None'}</p>
            <p><span className="font-medium">Samples:</span> {pitchHistory.length}</p>
            {pitchHistory.length > 0 && (
              <p><span className="font-medium">Average:</span> {(pitchHistory.reduce((sum, p) => sum + p, 0) / pitchHistory.length).toFixed(1)} Hz</p>
            )}
            {recordedAudio && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-green-600 font-medium">✅ Recording Ready</p>
                <p className="text-xs text-gray-500">URL: {recordedAudio.substring(0, 30)}...</p>
              </div>
            )}
            {error && <p className="text-red-600"><span className="font-medium">Error:</span> {error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioDebugPanel;
