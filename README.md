# Tes Buta Nada 🎵

A web application to test pitch ability and detect tone deafness using Web Audio API.

## Features

- 🎵 **Pitch Test**: Listen to tones and record your voice
- 🎤 **Pitch Detection**: Accurate analysis using Web Audio API
- 📊 **Scoring**: Score based on pitch accuracy (±50 cents = perfect)
- 📱 **Responsive**: Mobile-friendly design
- 🌈 **Purple Theme**: Modern UI with high accessibility

## How to Play

1. **Start Test**: Click "Mulai Tes" button
2. **Select Gender**: Choose gender to determine tone range
3. **Listen**: Click "Putar Nada" to hear the reference tone
4. **Record**: Click "Rekam Suara" and sing the same tone
5. **Continue**: Get your score and proceed to next round
6. **Results**: Complete 10 rounds to get final results

## Result Categories

- **Pitch Perfect** (45-50): Excellent pitch ability! 🏆
- **Not Tone Deaf** (30-44): Not tone deaf, good musical ability 🎵
- **Questionably Tone Deaf** (20-29): Might have some pitch difficulty 🤔
- **Tone Deaf** (0-19): Possibly tone deaf, but can still learn music! 😅

## Technology Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Audio**: Tone.js + Web Audio API
- **Pitch Detection**: Pitchy library
- **Deployment**: Vercel

## Tone Ranges

- **Male**: E2 - E4 (82-330 Hz)
- **Female**: A3 - A5 (220-880 Hz)

## Browser Requirements

- Chrome, Firefox, Safari, Edge (latest versions)
- Active microphone
- Web Audio API support

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The application is configured for deployment on Vercel. Simply push to GitHub and connect to Vercel.

## Notes

This test is for entertainment purposes only and does not replace professional assessment from music experts or audiologists.