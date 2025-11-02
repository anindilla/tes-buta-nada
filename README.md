# Tes Buta Nada 🎵

> A modern web application to test pitch ability and detect tone deafness using Web Audio API and AI-powered pitch detection.

**Live Demo**: [https://tes-buta-nada.vercel.app](https://tes-buta-nada.vercel.app)

## 🌟 Features

- 🎵 **Pitch Test**: Listen to reference tones and record your voice to match them
- 🎤 **Real-time Pitch Detection**: Accurate pitch analysis using Web Audio API and Pitchy library
- 📊 **Smart Scoring**: Score based on musical cents accuracy (±50 cents = perfect score)
- 📱 **Fully Responsive**: Mobile-first design optimized for all screen sizes
- 🌐 **Cross-browser Support**: Works on Chrome, Firefox, Safari, and mobile browsers
- 💡 **Singing Tips**: Built-in guide to improve your pitch accuracy
- 🎨 **Modern UI/UX**: Beautiful glassmorphism design with smooth animations

## 🎮 How to Play

1. **Start Test**: Click "Mulai Tes Sekarang" button
2. **Select Gender**: Choose your gender to determine the appropriate tone range
3. **Listen**: Click "Putar Nada" to hear the reference tone
4. **Record**: Click "Rekam Suara" and sing/hum the same tone
5. **Continue**: Get your score and proceed to the next round
6. **Results**: Complete all 10 rounds to get your final assessment

## 📊 Result Categories

- **Pitch Perfect (45-50 points)**: Excellent pitch ability! You have a natural talent for music! 🏆
- **Not Tone Deaf (30-44 points)**: Good musical ability, not tone deaf! Keep practicing! 🎵
- **Questionably Tone Deaf (20-29 points)**: Some pitch difficulty detected, but with practice you can improve! 🤔
- **Tone Deaf (0-19 points)**: Possible tone deafness, but don't worry - music can still be enjoyed and learned! 😅

## 🎼 Tone Ranges

The test uses frequency ranges appropriate for each gender:

- **Male**: E2 - E4 (82-330 Hz) - Typical male vocal range
- **Female**: A3 - A5 (220-880 Hz) - Typical female vocal range

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI library
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Tone.js**: Advanced Web Audio synthesis

### Audio Processing
- **Web Audio API**: Browser-native audio processing
- **Pitchy**: Real-time pitch detection library
- **MediaRecorder API**: Cross-browser audio recording with format detection

### Deployment
- **Vercel**: Automatic deployments from GitHub

## 📱 Browser Requirements

- **Desktop**: Chrome 66+, Firefox 60+, Safari 14.1+, Edge 79+
- **Mobile**: iOS Safari 14.5+, Chrome Android 66+
- **Features Required**:
  - Web Audio API support
  - MediaRecorder API support
  - Microphone access (HTTPS required in production)

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anindilla/tes-buta-nada.git
cd tes-buta-nada

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build locally
npm run preview
```

## 📦 Project Structure

```
tes-buta-nada/
├── src/
│   ├── components/       # React components
│   │   ├── WelcomeScreen.jsx
│   │   ├── GenderSelection.jsx
│   │   ├── GameScreen.jsx
│   │   ├── FinalResults.jsx
│   │   ├── SingingTipsScreen.jsx
│   │   └── Footer.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── usePitchDetection.js
│   ├── utils/            # Utility functions
│   │   ├── toneGenerator.js
│   │   └── scoreCalculator.js
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🔧 Key Features Implementation

### Pitch Detection
- Uses autocorrelation algorithm via Pitchy library
- Real-time pitch analysis during recording
- Averages multiple samples for accuracy

### Audio Recording
- Cross-browser format detection (WebM, MP4, OGG, WAV)
- Automatic format selection based on browser support
- iOS Safari compatibility with MP4/M4A format

### Scoring Algorithm
- Musical cents calculation (1200 * log2(frequency/reference))
- Three-tier scoring system:
  - Perfect: ±50 cents (score: 5)
  - Good: ±100 cents (score: 3)
  - Way off: >100 cents (score: 0)

## 🌐 Deployment

The application is automatically deployed to Vercel when changes are pushed to the `main` branch.

### Manual Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically detect Vite configuration
4. Deploy!

## 📝 Development Notes

- Audio context requires user interaction to start (browser security)
- Microphone permissions must be granted
- HTTPS is required for microphone access in production
- Some browsers may require additional permissions

## ⚠️ Disclaimer

This test is for **entertainment purposes only** and does not replace professional assessment from music experts or audiologists. Results should not be used for medical or professional purposes.

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**dilleuh**
- Website: [anindilla.com](https://anindilla.com)
- Vibe-coded with ❤️

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Pitch detection powered by [Pitchy](https://github.com/peterkhayes/pitchy)
- Audio synthesis using [Tone.js](https://tonejs.github.io/)
- Deployed on [Vercel](https://vercel.com)

---

Made with ❤️ and 🎵 for music lovers everywhere!
