// Game scoring logic
export const calculateTotalScore = (roundScores) => {
  return roundScores.reduce((total, score) => total + score, 0);
};

// Determine category based on total score
export const getScoreCategory = (totalScore) => {
  if (totalScore >= 45) {
    return {
      category: 'Pitch Sempurna',
      description: 'Selamat! Kamu memiliki kemampuan pitch yang sangat baik!',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    };
  } else if (totalScore >= 30) {
    return {
      category: 'Tidak Buta Nada',
      description: 'Bagus! Kamu tidak buta nada dan memiliki kemampuan musik yang baik.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    };
  } else if (totalScore >= 20) {
    return {
      category: 'Mungkin Buta Nada',
      description: 'Hmm, kamu mungkin memiliki kesulitan dengan pitch. Coba latihan lebih banyak!',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    };
  } else {
    return {
      category: 'Buta Nada',
      description: 'Sayangnya, kamu mungkin buta nada. Tapi jangan khawatir, kamu masih bisa belajar musik!',
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
      title: 'Sempurna!',
      message: `Kamu menyanyikan nada dengan sangat akurat! (±${centsDiff.toFixed(0)} cents)`,
      emoji: '🎵'
    },
    'nearly there': {
      title: 'Hampir tepat!',
      message: `Hampir akurat, tapi masih ada sedikit perbedaan. (±${centsDiff.toFixed(0)} cents)`,
      emoji: '🎶'
    },
    'way off': {
      title: 'Coba lagi!',
      message: `Nada yang kamu nyanyikan cukup jauh dari yang diminta. (±${centsDiff.toFixed(0)} cents)`,
      emoji: '🎼'
    }
  };
  
  return messages[category] || messages['way off'];
};
