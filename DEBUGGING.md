# Pitch Detection Debugging Guide

## Issues Fixed

### 1. **Critical Syntax Errors in `usePitchDetection.js`**
- Fixed missing function signatures
- Fixed broken useEffect hooks
- Fixed incomplete return statements

### 2. **Pitch Detection Algorithm Issues**
- **Problem**: Using `getFloatFrequencyData()` instead of `getFloatTimeDomainData()`
- **Fix**: Pitchy library requires time domain data, not frequency domain data
- **Impact**: This was causing complete failure of pitch detection

### 3. **Audio Context State Management**
- **Problem**: Not handling suspended audio context
- **Fix**: Added `audioContext.resume()` when context is suspended
- **Impact**: Prevents "AudioContext was not allowed to start" errors

### 4. **Microphone Settings Optimization**
- **Problem**: Echo cancellation and noise suppression interfering with pitch detection
- **Fix**: Disabled `echoCancellation`, `noiseSuppression`, and `autoGainControl`
- **Impact**: Cleaner audio signal for better pitch detection

### 5. **Pitch Stability Improvements**
- **Problem**: Single pitch reading was unreliable
- **Fix**: Implemented pitch history averaging (last 10 readings)
- **Impact**: More stable and accurate pitch detection

### 6. **Better Debugging Information**
- Added console logging for reference frequencies
- Added pitch history display
- Added average pitch calculation
- Added test components for debugging

## Testing Instructions

### Step 1: Test Tone Generation
1. Open browser console (F12)
2. Use the "Test Tone Generator" component
3. Play a 440Hz tone and verify it plays correctly
4. Check console for "Playing test tone: 440 Hz" message

### Step 2: Test Pitch Detection
1. Use the "Pitch Detection Test" component
2. Set reference frequency to 440Hz
3. Click "Start Recording"
4. Sing or hum a 440Hz tone (A4 note)
5. Check if pitch is detected and displayed
6. Click "Test Analysis" to see scoring

### Step 3: Debug Common Issues

#### Issue: No pitch detected
- **Check**: Microphone permissions granted
- **Check**: Audio context is running (not suspended)
- **Check**: Console for error messages
- **Try**: Sing louder or closer to microphone

#### Issue: Wrong pitch detected
- **Check**: Background noise levels
- **Check**: Microphone quality
- **Try**: Sing more clearly and sustained notes
- **Try**: Different frequency ranges

#### Issue: Inconsistent results
- **Check**: Pitch history readings (should be > 5)
- **Check**: Average pitch vs single reading
- **Try**: Sing longer sustained notes

## Expected Behavior

### For 440Hz Reference:
- **Perfect match**: Detected pitch should be 440Hz ± 10Hz
- **Score**: Should be 5/5 (within 50 cents)
- **Cents difference**: Should be < 50 cents

### For Other Frequencies:
- **220Hz**: Should detect around 220Hz
- **880Hz**: Should detect around 880Hz
- **Any frequency**: Should be within ±100Hz for reasonable scoring

## Console Debugging

Open browser console and look for:
```
Playing tone: 440 Hz
Reference frequency: 440
Detected pitch: 442.3
Pitch history: [440.1, 441.2, 442.3, 441.8, 440.9]
Test result: {score: 5, category: 'on tune', centsDiff: 12.5}
```

## Troubleshooting

### If still getting 0/5 scores:
1. **Check microphone permissions**: Browser should ask for mic access
2. **Check audio context**: Should not be suspended
3. **Check pitch detection**: Should show detected frequencies
4. **Check frequency range**: Sing within 50-2000Hz range
5. **Check clarity threshold**: Pitchy requires clarity > 0.7

### If pitch detection is inconsistent:
1. **Increase FFT size**: Already set to 4096 for better resolution
2. **Adjust clarity threshold**: Currently set to 0.7 (try 0.5-0.8)
3. **Use pitch averaging**: Already implemented with 10-sample history
4. **Check audio quality**: Use good microphone, quiet environment

## Next Steps

1. **Test with known frequencies**: Use the test components
2. **Verify pitch detection accuracy**: Compare detected vs actual frequencies
3. **Test scoring algorithm**: Ensure cents calculation is correct
4. **Remove debug components**: Once working, remove test components from production

## Production Cleanup

After debugging is complete:
1. Remove `PitchTestComponent` from App.jsx
2. Remove `FrequencyGenerator` from App.jsx
3. Remove console.log statements
4. Optimize clarity threshold based on testing results
