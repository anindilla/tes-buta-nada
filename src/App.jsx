import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GenderSelection from './components/GenderSelection';
import GameScreen from './components/GameScreen';
import FinalResults from './components/FinalResults';
import SingingTipsScreen from './components/SingingTipsScreen';
import Footer from './components/Footer';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [gender, setGender] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundScores, setRoundScores] = useState([]);
  
  const handleStart = () => {
    setCurrentScreen('gender');
  };
  
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setCurrentScreen('game');
  };
  
  const handleRoundComplete = (score) => {
    setRoundScores(prev => [...prev, score]);
    setCurrentRound(prev => prev + 1);
  };
  
  const handleFinish = () => {
    setCurrentScreen('results');
  };
  
  const handleRestart = () => {
    setCurrentScreen('welcome');
    setGender(null);
    setCurrentRound(1);
    setRoundScores([]);
  };
  
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} onShowTips={() => setCurrentScreen('tips')} />;
      case 'gender':
        return <GenderSelection onSelect={handleGenderSelect} />;
      case 'game':
        return (
          <GameScreen
            gender={gender}
            currentRound={currentRound}
            onRoundComplete={handleRoundComplete}
            onFinish={handleFinish}
          />
        );
      case 'results':
        return <FinalResults roundScores={roundScores} onRestart={handleRestart} />;
      case 'tips':
        return <SingingTipsScreen onBack={() => setCurrentScreen('welcome')} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };
  
  return (
    <div className="App relative min-h-screen pb-0 lg:pb-6 xl:pb-8">
      {renderScreen()}
      <Footer />
    </div>
  );
}

export default App;