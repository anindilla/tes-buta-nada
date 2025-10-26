import { useState, useEffect } from 'react';
import * as Tone from 'tone';

// Tone ranges for male and female
const MALE_RANGE = {
  min: 82, // E2
  max: 330 // E4
};

const FEMALE_RANGE = {
  min: 220, // A3
  max: 880 // A5
};

// Generate random frequency within the specified range
export const generateRandomTone = (gender) => {
  const range = gender === 'male' ? MALE_RANGE : FEMALE_RANGE;
  const minFreq = range.min;
  const maxFreq = range.max;
  
  // Generate random frequency within range
  const frequency = Math.random() * (maxFreq - minFreq) + minFreq;
  
  return {
    frequency,
    note: frequencyToNote(frequency)
  };
};

// Convert frequency to note name (simplified)
export const frequencyToNote = (frequency) => {
  const A4 = 440; // A4 = 440 Hz
  const semitone = Math.log2(frequency / A4) * 12;
  const noteNumber = Math.round(semitone) + 69; // 69 = A4 MIDI number
  
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(noteNumber / 12) - 1;
  const note = notes[noteNumber % 12];
  
  return `${note}${octave}`;
};

// Play tone using Tone.js
export const playTone = async (frequency, duration = 2) => {
  try {
    // Start Tone.js context if not already started
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
    
    console.log('Playing tone:', frequency, 'Hz');
    
    // Create oscillator with better settings
    const oscillator = new Tone.Oscillator(frequency, 'sine').toDestination();
    oscillator.volume.value = -6; // Reduce volume to prevent distortion
    
    // Play tone
    oscillator.start();
    
    // Stop after duration
    setTimeout(() => {
      oscillator.stop();
      oscillator.dispose(); // Clean up oscillator
    }, duration * 1000);
    
    return true;
  } catch (error) {
    console.error('Error playing tone:', error);
    return false;
  }
};

// Hook for tone generation
export const useToneGenerator = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const playRandomTone = async (gender) => {
    if (isPlaying) return null;
    
    setIsPlaying(true);
    const tone = generateRandomTone(gender);
    const success = await playTone(tone.frequency);
    
    setTimeout(() => setIsPlaying(false), 2000);
    
    return success ? tone : null;
  };
  
  return {
    playRandomTone,
    isPlaying
  };
};
