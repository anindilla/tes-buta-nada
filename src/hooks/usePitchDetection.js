import { useState, useEffect, useRef } from 'react';
import { PitchDetector } from 'pitchy';

// Scoring thresholds in cents
const SCORE_THRESHOLDS = {
  PERFECT: 50,    // ±50 cents = "on tune" (score: 5)
  GOOD: 100,      // ±100 cents = "nearly there" (score: 3)
  // >100 cents = "way off" (score: 0)
};

// Convert frequency to cents from reference frequency
export const frequencyToCents = (frequency, referenceFrequency) => {
  return 1200 * Math.log2(frequency / referenceFrequency);
};

// Calculate score based on cents difference
export const calculateScore = (userFrequency, referenceFrequency) => {
  const centsDiff = Math.abs(frequencyToCents(userFrequency, referenceFrequency));
  
  if (centsDiff <= SCORE_THRESHOLDS.PERFECT) {
    return { score: 5, category: 'on tune', centsDiff };
  } else if (centsDiff <= SCORE_THRESHOLDS.GOOD) {
    return { score: 3, category: 'nearly there', centsDiff };
  } else {
    return { score: 0, category: 'way off', centsDiff };
  }
};

// Simplified hook for pitch detection
export const usePitchDetection = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedPitch, setDetectedPitch] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pitchHistory, setPitchHistory] = useState([]);
  const [error, setError] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const detectorRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);
  const dataArrayRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  
  // Initialize audio context and detector
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 4096;
        analyserRef.current.smoothingTimeConstant = 0.3;
        
        const bufferSize = analyserRef.current.fftSize;
        detectorRef.current = PitchDetector.forFloat32Array(bufferSize);
        dataArrayRef.current = new Float32Array(bufferSize);
        
        console.log('Audio system initialized');
      } catch (error) {
        console.error('Error initializing audio:', error);
        setError('Failed to initialize audio system');
      }
    };
    
    initAudio();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  const startRecording = async () => {
    try {
      console.log('Starting recording...');
      setError(null);
      setRecordedAudio(null);
      recordedChunksRef.current = [];
      
      // Resume audio context if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      });
      
      streamRef.current = stream;
      
      // Connect microphone to analyser
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      // Set up MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        if (blob.size > 0) {
          const audioUrl = URL.createObjectURL(blob);
          setRecordedAudio(audioUrl);
          console.log('Recording completed, size:', blob.size);
        }
      };
      
      // Start recording
      mediaRecorder.start(100);
      setIsRecording(true);
      setDetectedPitch(null);
      setPitchHistory([]);
      
      // Start pitch detection
      const detectPitch = () => {
        if (!isRecording) return;
        
        try {
          analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);
          const [pitch, clarity] = detectorRef.current.findPitch(
            dataArrayRef.current, 
            audioContextRef.current.sampleRate
          );
          
          if (clarity > 0.6 && pitch > 50 && pitch < 2000) {
            setDetectedPitch(pitch);
            setPitchHistory(prev => {
              const newHistory = [...prev.slice(-9), pitch];
              return newHistory;
            });
          }
          
          animationFrameRef.current = requestAnimationFrame(detectPitch);
        } catch (error) {
          console.error('Error in pitch detection:', error);
        }
      };
      
      detectPitch();
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      setError('Failed to start recording: ' + error.message);
      throw error;
    }
  };
  
  const stopRecording = () => {
    console.log('Stopping recording...');
    setIsRecording(false);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1000);
  };
  
  const playRecording = () => {
    if (!recordedAudio) return;
    
    const audio = new Audio(recordedAudio);
    setIsPlayingRecording(true);
    
    audio.onended = () => {
      setIsPlayingRecording(false);
    };
    
    audio.onerror = () => {
      setIsPlayingRecording(false);
      setError('Failed to play recording');
    };
    
    audio.play().catch(error => {
      console.error('Play failed:', error);
      setIsPlayingRecording(false);
      setError('Failed to play recording: ' + error.message);
    });
  };
  
  const analyzePitch = (referenceFrequency) => {
    if (!detectedPitch && pitchHistory.length === 0) {
      return { score: 0, category: 'way off', centsDiff: 999 };
    }
    
    const avgPitch = pitchHistory.length > 0 
      ? pitchHistory.reduce((sum, pitch) => sum + pitch, 0) / pitchHistory.length
      : detectedPitch;
    
    return calculateScore(avgPitch, referenceFrequency);
  };
  
  const reset = () => {
    setDetectedPitch(null);
    setIsAnalyzing(false);
    setPitchHistory([]);
    setError(null);
    setRecordedAudio(null);
    setIsPlayingRecording(false);
    
    if (recordedAudio) {
      URL.revokeObjectURL(recordedAudio);
    }
  };
  
  return {
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
  };
};