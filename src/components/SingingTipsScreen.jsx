import React from 'react';

const SingingTipsScreen = ({ onBack }) => {
  const tips = [
    {
      title: "🎵 Latihan Mendengarkan",
      description: "Dengarkan musik dengan seksama dan coba identifikasi nada-nada yang berbeda. Mulai dengan lagu sederhana dan tingkatkan kesulitannya.",
      details: [
        "Dengarkan satu nada pada satu waktu",
        "Coba nyanyikan nada yang sama dengan musik",
        "Gunakan aplikasi tuner untuk memverifikasi pitch"
      ]
    },
    {
      title: "🎤 Latihan Pernapasan",
      description: "Pernapasan yang baik adalah dasar dari pitch yang akurat. Latih pernapasan diafragma untuk kontrol suara yang lebih baik.",
      details: [
        "Latihan pernapasan dalam 5-10 menit sehari",
        "Bernapas dari perut, bukan dada",
        "Kontrol aliran udara saat bernyanyi"
      ]
    },
    {
      title: "🎶 Latihan Skala",
      description: "Berlatih skala musik secara teratur membantu melatih telinga dan suara untuk mengenali interval nada.",
      details: [
        "Mulai dengan skala mayor sederhana (Do-Re-Mi-Fa-Sol-La-Si-Do)",
        "Gunakan piano atau aplikasi musik sebagai referensi",
        "Berlatih naik dan turun skala dengan perlahan"
      ]
    },
    {
      title: "🎼 Latihan Interval",
      description: "Belajar mengenali jarak antara dua nada (interval) akan membantu Anda menyanyi dengan pitch yang lebih akurat.",
      details: [
        "Latihan interval sederhana (perfect fifth, major third)",
        "Gunakan aplikasi ear training",
        "Berlatih dengan piano atau gitar"
      ]
    },
    {
      title: "🎹 Gunakan Alat Bantu",
      description: "Teknologi modern dapat membantu Anda melatih pitch dengan lebih efektif.",
      details: [
        "Aplikasi tuner untuk memeriksa pitch",
        "Metronome untuk menjaga tempo",
        "Aplikasi ear training untuk latihan interval"
      ]
    },
    {
      title: "🎤 Latihan Harian",
      description: "Konsistensi adalah kunci untuk meningkatkan kemampuan pitch. Luangkan waktu setiap hari untuk berlatih.",
      details: [
        "15-30 menit latihan setiap hari",
        "Mulai dengan latihan pemanasan",
        "Fokus pada satu aspek pada satu waktu"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6 pb-20 md:pb-24 lg:pb-8 animate-fade-in">
      <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-card p-6 sm:p-8 md:p-10 mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">💡</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Tips Meningkatkan Pitch
                </h1>
                <p className="text-gray-600">Panduan untuk meningkatkan kemampuan pitch dalam bernyanyi</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ← Kembali
            </button>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{tip.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{tip.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Cara Praktis:</h4>
                <ul className="space-y-2">
                  {tip.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mt-6 border border-white/20 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">🎯 Ingat!</h3>
          <p className="text-gray-600 leading-relaxed">
            Meningkatkan kemampuan pitch membutuhkan waktu dan kesabaran. 
            Berlatihlah secara konsisten dan jangan berkecil hati jika hasilnya tidak langsung terlihat. 
            Setiap latihan akan membawa Anda lebih dekat ke tujuan!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingingTipsScreen;
