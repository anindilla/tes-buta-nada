// Game scoring logic
export const calculateTotalScore = (roundScores) => {
  return roundScores.reduce((total, score) => total + score, 0);
};

// Determine category based on total score
export const getScoreCategory = (totalScore) => {
  if (totalScore >= 45) {
    return {
      category: 'Pitch Perfect',
      description: 'Congratulations! You have excellent pitch ability!',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    };
  } else if (totalScore >= 30) {
    return {
      category: 'Not Tone Deaf',
      description: 'Great! You are not tone deaf and have good musical ability.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    };
  } else if (totalScore >= 20) {
    return {
      category: 'Questionably Tone Deaf',
      description: 'Hmm, you might have some difficulty with pitch. Try practicing more!',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    };
  } else {
    return {
      category: 'Tone Deaf',
      description: 'Unfortunately, you might be tone deaf. But don\'t worry, you can still learn music!',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    };
  }
};

// Game constants
export const GAME_CONFIG = {
  TOTAL_ROUNDS: 10,
  MAX_SCORE_PER_ROUND: 5,
  MAX_TOTAL_SCORE: 50
};

// Round result messages
export const getRoundMessage = (category, centsDiff) => {
  const messages = {
    'on tune': {
      title: 'Perfect!',
      message: `You sang the note very accurately! (±${centsDiff.toFixed(0)} cents)`,
      emoji: '🎵'
    },
    'nearly there': {
      title: 'Almost there!',
      message: `Almost accurate, but there's still a slight difference. (±${centsDiff.toFixed(0)} cents)`,
      emoji: '🎶'
    },
    'way off': {
      title: 'Try again!',
      message: `The note you sang is quite far from what was requested. (±${centsDiff.toFixed(0)} cents)`,
      emoji: '🎼'
    }
  };
  
  return messages[category] || messages['way off'];
};
