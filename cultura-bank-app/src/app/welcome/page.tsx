'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();
  const [logoAnimation, setLogoAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimation(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const startRegistration = () => {
    router.push('/register');
  };

  const showLogin = () => {
    // For now, simulate login by going to dashboard
    router.push('/dashboard');
  };

  const showTerms = () => {
    alert('Åpner vilkår for bruk...\n\nInkluderer:\n• Regler for konkurranser\n• Poengberegning\n• Innholdspolicy\n• Brukeroppførsel');
  };

  const showPrivacy = () => {
    alert('Åpner personvernregler...\n\nGDPR-kompatibel informasjon om:\n• Datainnsamling\n• Cookies\n• Bildehåndtering\n• Rett til sletting');
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-green-900 to-green-700 text-white min-h-screen overflow-hidden relative flex flex-col">
      {/* Floating Elements */}
      <div className="absolute top-20 left-8 text-2xl opacity-30 text-green-400 animate-bounce" style={{animationDelay: '0s', animationDuration: '8s'}}>🌱</div>
      <div className="absolute top-32 right-10 text-2xl opacity-30 text-green-400 animate-bounce" style={{animationDelay: '2s', animationDuration: '8s'}}>🏆</div>
      <div className="absolute top-52 left-12 text-2xl opacity-30 text-green-400 animate-bounce" style={{animationDelay: '4s', animationDuration: '8s'}}>🥗</div>
      <div className="absolute top-64 right-8 text-2xl opacity-30 text-green-400 animate-bounce" style={{animationDelay: '6s', animationDuration: '8s'}}>🔧</div>
      <div className="absolute bottom-52 left-10 text-2xl opacity-30 text-green-400 animate-bounce" style={{animationDelay: '1s', animationDuration: '8s'}}>🛒</div>
      <div className="absolute bottom-42 right-12 text-2xl opacity-30 text-green-400 animate-bounce" style={{animationDelay: '3s', animationDuration: '8s'}}>💡</div>

      {/* Beta Indicator */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-green-900 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold uppercase z-10">
        Beta
      </div>

      {/* Status Bar */}
      <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
        <span>9:41</span>
        <span>🔋 100%</span>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-5 sm:px-8 lg:px-12 text-center relative">
        {/* Logo */}
        <div className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 shadow-xl shadow-green-500/40 transition-all duration-1000 ${
          logoAnimation ? 'animate-pulse' : ''
        }`}>
          🌍
        </div>
        
        {/* App Title */}
        <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-300 mb-2 sm:mb-3 leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
          OPERASJON<br />GRØNN INNSATS
        </div>
        
        {/* Subtitle */}
        <div className="text-lg sm:text-xl lg:text-2xl text-green-200 mb-6 sm:mb-8 leading-relaxed">
          Gjør en forskjell. Tjen poeng. Vinn premier.
        </div>
        
        {/* Description */}
        <div className="text-base sm:text-lg lg:text-xl text-white leading-relaxed mb-8 sm:mb-10 max-w-sm sm:max-w-md lg:max-w-lg text-center">
          Delta i Norges største miljøkonkurranse! Fullfør enkle miljøoppdrag, sammenlign deg med andre og kvalifiser for månedlige trekninger.
        </div>

        {/* Feature Highlights */}
        <div className="flex justify-center gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-10">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">🎯</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 font-semibold">Enkle oppdrag</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">🏆</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 font-semibold">Konkurranser</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">🎁</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 font-semibold">Premier</div>
          </div>
        </div>
      </div>

      {/* Cultura Partnership */}
      <div className="bg-gradient-to-br from-green-600/40 to-green-500/20 border border-green-500 rounded-2xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 text-center">
        <div className="text-xl sm:text-2xl lg:text-3xl mb-2">🏦</div>
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-green-300 mb-1">
          I samarbeid med Cultura Bank
        </div>
        <div className="text-xs sm:text-sm lg:text-base text-green-200">
          Cultura Bank-kunder får 20 ekstra poeng per oppdrag
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4">
        <button
          onClick={startRegistration}
          className="w-full bg-gradient-to-br from-green-500 to-green-400 text-green-900 font-bold text-lg sm:text-xl lg:text-2xl py-4 sm:py-5 lg:py-6 rounded-2xl hover:from-green-400 hover:to-green-300 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-green-500/40"
        >
          🚀 BEGYNN REISEN
        </button>
        
        <button
          onClick={showLogin}
          className="w-full bg-transparent border border-green-400 text-green-300 font-semibold text-base sm:text-lg lg:text-xl py-4 sm:py-5 lg:py-6 rounded-2xl hover:bg-green-600/20 hover:text-white transition-all"
        >
          Har du allerede konto? Logg inn
        </button>
        
        {/* Terms Text */}
        <div className="text-xs sm:text-sm lg:text-base text-green-200 text-center mt-2 leading-relaxed">
          Ved å fortsette godtar du våre{' '}
          <button onClick={showTerms} className="text-green-300 underline hover:text-white transition-colors">
            vilkår
          </button>
          {' '}og{' '}
          <button onClick={showPrivacy} className="text-green-300 underline hover:text-white transition-colors">
            personvernregler
          </button>
        </div>
      </div>
    </div>
  );
}