'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selectMission = (type: string) => {
    if (type === 'food') {
      router.push('/veggie-mission');
    } else if (type === 'tips') {
      router.push('/tips-mission');
    } else if (type === 'repair') {
      router.push('/repair-mission');
    } else if (type === 'shopping') {
      router.push('/shopping-mission');
    }
  };

  const selectRadio = (index: number) => {
    setSelectedAnswer(index);
  };

  const submitQuiz = () => {
    if (selectedAnswer === null) return;
    
    const answers = [
      'Flott! Takk for at du er Cultura Bank-kunde. Du får 15 poeng + 20 ekstra Cultura-kundepoeng på alle oppdrag!',
      'Spennende! Utforsk cultura.no for å lære mer om verdibasert banking. Du får 15 poeng for svaret!',
      'Velkommen til å lære om oss! Cultura Bank er Norges mest etiske bank. Du får 15 poeng + bonus-link til cultura.no!'
    ];
    
    alert(answers[selectedAnswer]);
    setQuizSubmitted(true);
  };

  const navigateTo = (page: string) => {
    switch(page) {
      case 'stats':
        router.push('/status');
        break;
      case 'leaderboard':
        router.push('/leaderboard');
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-green-900 to-green-700 text-white min-h-screen overflow-hidden relative flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 text-center bg-black/20">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-300 mb-1">
            OPERASJON GRØNN INNSATS
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-green-200">
            Agent #1247 • 6 oppdrag fullført
          </div>
        </div>

        {/* Quick Status */}
        <div className="bg-green-600/30 rounded-2xl p-3 sm:p-4 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 flex justify-between text-center">
          <div className="flex-1">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-300">190</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 mt-0.5">Poeng</div>
          </div>
          <div className="flex-1">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-300">#18</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 mt-0.5">Plassering</div>
          </div>
          <div className="flex-1">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-300">✅</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 mt-0.5">Kvalifisert</div>
          </div>
        </div>

        {/* Monthly Theme */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 bg-gradient-to-br from-green-600/40 to-green-500/20 border border-green-500 rounded-2xl p-4 sm:p-5 lg:p-6 text-center">
          <div className="text-base sm:text-lg lg:text-xl font-semibold text-green-300 mb-1">
            🎯 Januar utfordring
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            NULL-AVFALL
          </div>
          <div className="bg-green-500 text-green-900 px-3 py-1 rounded-xl text-xs sm:text-sm lg:text-base font-semibold inline-block">
            +5 bonus på alle oppdrag
          </div>
        </div>

        {/* Mission Buttons */}
        <div className="mx-5 sm:mx-6 lg:mx-8 mb-5 sm:mb-6">
          <div className="text-base sm:text-lg lg:text-xl font-semibold text-green-300 mb-3 sm:mb-4">
            📋 Faste oppdrag
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
            <button 
              onClick={() => selectMission('food')}
              className="bg-gradient-to-br from-green-600/40 to-green-500/20 border border-green-500/30 rounded-xl p-4 sm:p-5 lg:p-6 relative transition-transform hover:-translate-y-0.5 text-center"
            >
              <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center text-xs sm:text-sm text-white">
                ✓
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">🥗</div>
              <div className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1">
                Vegetar middag
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Opptil 35 poeng
              </div>
            </button>

            <button 
              onClick={() => selectMission('repair')}
              className="bg-gradient-to-br from-orange-600/40 to-orange-500/20 border border-orange-500/30 rounded-xl p-4 sm:p-5 lg:p-6 relative transition-transform hover:-translate-y-0.5 text-center"
            >
              <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center text-xs sm:text-sm text-white">
                ✓
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">🔧</div>
              <div className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1">
                Reparasjon
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Opptil 40 poeng
              </div>
            </button>

            <button 
              onClick={() => selectMission('shopping')}
              className="bg-gradient-to-br from-blue-600/40 to-blue-500/20 border border-blue-500/30 rounded-xl p-4 sm:p-5 lg:p-6 relative transition-transform hover:-translate-y-0.5 text-center"
            >
              <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center text-xs sm:text-sm text-white">
                ✓
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">🛒</div>
              <div className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1">
                Økologisk handel
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Opptil 35 poeng
              </div>
            </button>

            <button 
              onClick={() => selectMission('tips')}
              className="bg-gradient-to-br from-yellow-600/40 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 sm:p-5 lg:p-6 relative transition-transform hover:-translate-y-0.5 text-center"
            >
              <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center text-xs sm:text-sm text-white">
                ✓
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">💡</div>
              <div className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1">
                Miljøtips
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Opptil 50 poeng
              </div>
            </button>
          </div>
        </div>

        {/* Cultura Quiz */}
        <div className="mx-5 sm:mx-6 lg:mx-8 mb-5 sm:mb-6">
          <div className="text-base sm:text-lg lg:text-xl font-semibold text-green-300 mb-3 sm:mb-4">
            🏦 Cultura Quiz
          </div>
          <div className={`bg-gradient-to-br from-blue-600/30 to-blue-500/20 border border-blue-500 rounded-2xl p-4 sm:p-5 lg:p-6 transition-opacity ${quizSubmitted ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <div className="text-sm sm:text-base lg:text-lg font-semibold text-blue-300">
                Månedens spørsmål
              </div>
              <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs sm:text-sm lg:text-base font-semibold">
                +15 poeng
              </div>
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-white mb-3 sm:mb-4">
              Er du kunde i Cultura Bank?
            </div>
            <div className="flex flex-col gap-2">
              {['Ja, jeg er kunde', 'Nei, men jeg vurderer det', 'Nei, har ikke hørt om Cultura før'].map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectRadio(index)}
                  className="flex items-center p-2 rounded-lg hover:bg-blue-500/10 transition-colors"
                  disabled={quizSubmitted}
                >
                  <div className={`w-4 h-4 border-2 border-blue-300 rounded-full mr-3 relative transition-all ${selectedAnswer === index ? 'bg-blue-500 border-blue-500' : ''}`}>
                    {selectedAnswer === index && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-white">{option}</div>
                </button>
              ))}
            </div>
            <button
              onClick={submitQuiz}
              disabled={selectedAnswer === null || quizSubmitted}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed border-none rounded-lg px-4 py-2 text-white text-xs sm:text-sm lg:text-base font-semibold mt-3 sm:mt-4 transition-colors"
            >
              {quizSubmitted ? 'Takk for svaret!' : 'Send svar'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] sm:h-[80px] lg:h-[90px] bg-black/80 backdrop-blur-sm flex justify-around items-center border-t border-green-500/20 rounded-t-3xl">
        <div className="flex flex-col items-center text-white bg-green-500/30 p-2 sm:p-3 rounded-3xl">
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-green-500/20 rounded-full flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            🏠
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Senter</span>
        </div>
        <button 
          onClick={() => navigateTo('stats')}
          className="flex flex-col items-center text-green-300 p-2 sm:p-3 rounded-3xl hover:bg-green-500/20 transition-colors"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            📊
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Status</span>
        </button>
        <button 
          onClick={() => router.push('/leaderboard')}
          className="flex flex-col items-center text-green-300 p-2 sm:p-3 rounded-3xl hover:bg-green-500/20 transition-colors"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            🏆
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Ledere</span>
        </button>
        <button 
          onClick={() => router.push('/profile')}
          className="flex flex-col items-center text-green-300 p-2 sm:p-3 rounded-3xl hover:bg-green-500/20 transition-colors"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            👤
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Profil</span>
        </button>
      </div>
    </div>
  );
}
