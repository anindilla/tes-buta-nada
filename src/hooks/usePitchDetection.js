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
  const isRecordingRef = useRef(false); // Fix closure bug
  const selectedFormatRef = useRef(null); // Store selected audio format
  
  // Initialize audio context and detector
  useEffect(() => {
    const initAudio = async () => {
      try {
        console.log('🎵 Initializing audio system...');
        
        // Check if AudioContext is supported
        if (!window.AudioContext && !window.webkitAudioContext) {
          throw new Error('AudioContext not supported in this browser');
        }
        
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 4096;
        analyserRef.current.smoothingTimeConstant = 0.3;
        
        const bufferSize = analyserRef.current.fftSize;
        detectorRef.current = PitchDetector.forFloat32Array(bufferSize);
        dataArrayRef.current = new Float32Array(bufferSize);
        
        console.log('✅ Audio system initialized successfully');
        console.log('📊 Audio context state:', audioContextRef.current.state);
        console.log('📊 Sample rate:', audioContextRef.current.sampleRate);
      } catch (error) {
        console.error('❌ Error initializing audio:', error);
        setError('Failed to initialize audio system: ' + error.message);
      }
    };
    
    initAudio();
    
    return () => {
      console.log('🧹 Cleaning up audio resources...');
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
      console.log('🎤 Starting recording process...');
      setError(null);
      setRecordedAudio(null);
      recordedChunksRef.current = [];
      selectedFormatRef.current = null;
      
      // Check if navigator.mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const errorMsg = 'Microphone access not available. Please use a modern browser with HTTPS.';
        console.error('❌', errorMsg);
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Resume audio context if suspended (required for mobile)
      if (audioContextRef.current) {
        if (audioContextRef.current.state === 'suspended') {
          console.log('⏸️ Audio context suspended, resuming...');
          await audioContextRef.current.resume();
          console.log('✅ Audio context resumed, state:', audioContextRef.current.state);
        }
      } else {
        throw new Error('Audio context not initialized');
      }
      
      // Request microphone access with comprehensive error handling
      console.log('📱 Requesting microphone access...');
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        console.log('✅ Microphone access granted');
        console.log('📊 Stream tracks:', stream.getTracks().length);
      } catch (getUserMediaError) {
        console.error('❌ getUserMedia error:', getUserMediaError);
        let errorMessage = 'Failed to access microphone. ';
        
        if (getUserMediaError.name === 'NotAllowedError' || getUserMediaError.name === 'PermissionDeniedError') {
          errorMessage += 'Please allow microphone access and try again.';
        } else if (getUserMediaError.name === 'NotFoundError' || getUserMediaError.name === 'DevicesNotFoundError') {
          errorMessage += 'No microphone found. Please connect a microphone and try again.';
        } else if (getUserMediaError.name === 'NotReadableError' || getUserMediaError.name === 'TrackStartError') {
          errorMessage += 'Microphone is already in use by another application.';
        } else if (getUserMediaError.name === 'OverconstrainedError') {
          errorMessage += 'Microphone settings not supported.';
        } else {
          errorMessage += getUserMediaError.message || 'Unknown error occurred.';
        }
        
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      
      streamRef.current = stream;
      
      // Connect microphone to analyser
      console.log('🔌 Connecting microphone to analyser...');
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      console.log('✅ Microphone connected');
      
      // Detect supported audio format
      console.log('🔍 Detecting supported audio format...');
      const supportedTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
        'audio/wav',
        'audio/aac'
      ];
      
      let selectedType = null;
      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          selectedType = type;
          console.log('✅ Selected audio format:', type);
          break;
        }
      }
      
      // Set up MediaRecorder
      console.log('🎬 Setting up MediaRecorder...');
      let mediaRecorder;
      try {
        if (selectedType) {
          mediaRecorder = new MediaRecorder(stream, { mimeType: selectedType });
          selectedFormatRef.current = selectedType;
        } else {
          // Fallback to browser default
          console.warn('⚠️ No preferred format found, using browser default');
          mediaRecorder = new MediaRecorder(stream);
          // Get the actual format the browser chose
          selectedFormatRef.current = mediaRecorder.mimeType || 'audio/webm';
          console.log('📊 Browser selected format:', selectedFormatRef.current);
        }
        console.log('✅ MediaRecorder created, state:', mediaRecorder.state);
      } catch (recorderError) {
        console.error('❌ MediaRecorder creation failed:', recorderError);
        throw new Error('Failed to create MediaRecorder: ' + recorderError.message);
      }
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.onstart = () => {
        console.log('▶️ MediaRecorder started');
      };
      
      mediaRecorder.ondataavailable = (event) => {
        console.log('📦 Data chunk received:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
          console.log('📊 Total chunks:', recordedChunksRef.current.length);
        }
      };
      
      mediaRecorder.onerror = (event) => {
        console.error('❌ MediaRecorder error:', event.error);
        setError('Recording error: ' + (event.error?.message || 'Unknown error'));
      };
      
      mediaRecorder.onstop = () => {
        console.log('⏹️ MediaRecorder stopped');
        console.log('📊 Final chunks count:', recordedChunksRef.current.length);
        
        // Get format from MediaRecorder if available, otherwise use stored format
        let format = mediaRecorder.mimeType || selectedFormatRef.current || 'audio/webm';
        console.log('📊 Using format for blob:', format);
        
        const blob = new Blob(recordedChunksRef.current, { type: format });
        console.log('💾 Blob created:', blob.size, 'bytes, type:', format);
        
        if (blob.size === 0) {
          console.error('❌ Recording is empty!');
          setError('Recording failed - no audio data captured');
          return;
        }
        
        const audioUrl = URL.createObjectURL(blob);
        console.log('🔗 Audio URL created:', audioUrl);
        setRecordedAudio(audioUrl);
        console.log('✅ Recording processing complete');
      };
      
      // Start recording
      console.log('🎬 Starting MediaRecorder...');
      try {
        mediaRecorder.start(100); // Collect data every 100ms
        console.log('✅ MediaRecorder.start() called, state:', mediaRecorder.state);
        
        // Update format from MediaRecorder if available (some browsers don't expose mimeType until after start)
        if (mediaRecorder.mimeType) {
          selectedFormatRef.current = mediaRecorder.mimeType;
          console.log('📊 Format from MediaRecorder:', mediaRecorder.mimeType);
        }
      } catch (startError) {
        console.error('❌ MediaRecorder.start() failed:', startError);
        throw new Error('Failed to start recording: ' + startError.message);
      }
      
      setIsRecording(true);
      isRecordingRef.current = true; // Fix closure bug
      setDetectedPitch(null);
      setPitchHistory([]);
      
      console.log('🎵 Starting pitch detection...');
      
      // Start pitch detection with fixed closure
      const detectPitch = () => {
        // Use ref instead of state to avoid closure bug
        if (!isRecordingRef.current) {
          console.log('⏹️ Pitch detection stopped (isRecordingRef is false)');
          return;
        }
        
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
          console.error('❌ Error in pitch detection loop:', error);
          isRecordingRef.current = false; // Stop on error
        }
      };
      
      detectPitch();
      console.log('✅ Recording and pitch detection started successfully');
      
    } catch (error) {
      console.error('❌ Error starting recording:', error);
      setIsRecording(false);
      isRecordingRef.current = false;
      
      // Most errors are already handled above with specific error messages via setError()
      // This outer catch is for any unexpected errors that slipped through
      // Ensure we have an error message displayed
      if (error && error.message && !error.message.includes('Failed to')) {
        setError('Failed to start recording: ' + error.message);
      }
      
      throw error;
    }
  };
  
  const stopRecording = () => {
    console.log('⏹️ Stopping recording...');
    setIsRecording(false);
    isRecordingRef.current = false; // Fix closure bug
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (mediaRecorderRef.current) {
      console.log('🎬 MediaRecorder state:', mediaRecorderRef.current.state);
      if (mediaRecorderRef.current.state === 'recording') {
        try {
          mediaRecorderRef.current.stop();
          console.log('✅ MediaRecorder.stop() called');
        } catch (error) {
          console.error('❌ Error stopping MediaRecorder:', error);
        }
      } else {
        console.warn('⚠️ MediaRecorder not in recording state:', mediaRecorderRef.current.state);
      }
    }
    
    if (streamRef.current) {
      console.log('🔌 Stopping media stream...');
      streamRef.current.getTracks().forEach(track => {
        console.log('🔇 Stopping track:', track.kind, track.label);
        track.stop();
      });
      streamRef.current = null;
    }
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      console.log('📊 Analysis complete');
    }, 1000);
    
    console.log('📊 Recording stopped. Final pitch history:', pitchHistory);
  };
  
  const playRecording = () => {
    if (!recordedAudio) {
      console.error('❌ No recording available to play');
      setError('No recording available to play');
      return;
    }
    
    console.log('▶️ Starting playback of recording...');
    console.log('🔗 Audio URL:', recordedAudio);
    
    const audio = new Audio(recordedAudio);
    setIsPlayingRecording(true);
    
    audio.onloadedmetadata = () => {
      console.log('📊 Audio loaded - Duration:', audio.duration, 'seconds');
    };
    
    audio.oncanplay = () => {
      console.log('✅ Audio can start playing');
    };
    
    audio.onplay = () => {
      console.log('▶️ Playback started');
    };
    
    audio.onended = () => {
      console.log('⏹️ Playback ended');
      setIsPlayingRecording(false);
    };
    
    audio.onerror = (e) => {
      console.error('❌ Playback error:', e);
      setIsPlayingRecording(false);
      setError('Failed to play recording: ' + (audio.error?.message || 'Unknown error'));
    };
    
    audio.play().catch(error => {
      console.error('❌ Play failed:', error);
      setIsPlayingRecording(false);
      setError('Failed to play recording: ' + error.message);
    });
  };
  
  const analyzePitch = (referenceFrequency) => {
    console.log('📊 Analyzing pitch...');
    console.log('Reference Frequency:', referenceFrequency);
    console.log('Pitch History:', pitchHistory);
    
    if (!detectedPitch && pitchHistory.length === 0) {
      console.warn('⚠️ No pitch data available for analysis');
      return { score: 0, category: 'way off', centsDiff: 999 };
    }
    
    const avgPitch = pitchHistory.length > 0 
      ? pitchHistory.reduce((sum, pitch) => sum + pitch, 0) / pitchHistory.length
      : detectedPitch;
    
    console.log('📊 Average Detected Pitch:', avgPitch?.toFixed(1));
    
    const result = calculateScore(avgPitch, referenceFrequency);
    console.log('📊 Analysis Result:', result);
    return result;
  };
  
  const reset = () => {
    console.log('🔄 Resetting pitch detection state...');
    setDetectedPitch(null);
    setIsAnalyzing(false);
    setPitchHistory([]);
    setError(null);
    setRecordedAudio(null);
    setIsPlayingRecording(false);
    isRecordingRef.current = false;
    
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
