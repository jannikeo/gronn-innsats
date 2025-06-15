'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MissionComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [animateRank, setAnimateRank] = useState(false);
  const [currentRank, setCurrentRank] = useState(15);
  
  // Get data from URL parameters
  const missionType = searchParams.get('type') || 'veggie';
  const mealDescription = searchParams.get('description') || 'Ingen beskrivelse oppgitt';
  const tipContent = searchParams.get('tip') || 'Ingen tips oppgitt';
  const tipCategory = searchParams.get('category') || 'annet';
  const background = searchParams.get('background') || '';
  const hasPhoto = searchParams.get('hasPhoto') === 'true';
  const earnedPoints = parseInt(searchParams.get('points') || '35');
  
  // New mission type data
  const repairCategory = searchParams.get('category') || '';
  const repairDescription = searchParams.get('description') || 'Ingen beskrivelse oppgitt';
  const repairTips = searchParams.get('tips') || '';
  const shoppingStore = searchParams.get('store') || '';
  const shoppingProducts = searchParams.get('products') || '';
  const shoppingTips = searchParams.get('tips') || '';

  useEffect(() => {
    // Simulate rank update after 3 seconds
    const timer = setTimeout(() => {
      setCurrentRank(14);
      setAnimateRank(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const goToMissions = () => {
    router.push('/dashboard');
  };

  const shareMission = () => {
    alert('📤 Deling-funksjon kommer snart!');
  };

  const newVeggieMission = () => {
    router.push('/veggie-mission');
  };

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      'energi': 'Energisparing',
      'transport': 'Transport',
      'mat': 'Mat & forbruk',
      'gjenbruk': 'Gjenbruk',
      'avfall': 'Avfall',
      'vann': 'Vannsparing',
      'annet': 'Annet',
      // Repair categories
      'klær': 'Klær',
      'elektronikk': 'Elektronikk',
      'møbler': 'Møbler',
      'verktøy': 'Verktøy',
      'sykkel': 'Sykkel'
    };
    return categories[category] || 'Ukjent kategori';
  };

  const isVeggieMission = missionType === 'veggie';
  const isTipsMission = missionType === 'tips';
  const isRepairMission = missionType === 'repair';
  const isShoppingMission = missionType === 'shopping';

  // Get mission-specific data and styling
  const getMissionConfig = () => {
    if (isVeggieMission) {
      return {
        icon: '🥗',
        title: 'Mat-Mester!',
        subtitle: 'Din vegetariske middag er registrert og bidrar til en grønnere planet. Takk for at du velger bærekraftig mat!',
        missionName: 'Vegetarmiddag',
        category: 'Bærekraftig mat',
        content: mealDescription,
        contentLabel: '🍽️ Din registrerte middag:',
        colors: {
          bg: 'from-green-900 to-green-700',
          gradient: 'from-green-600/40 to-green-500/20 border-green-500',
          text: 'text-green-300',
          accent: 'text-green-200'
        }
      };
    } else if (isTipsMission) {
      return {
        icon: '💡',
        title: 'Kunnskaps-Agent!',
        subtitle: 'Ditt miljøtips er godkjent og tilgjengelig for alle andre agenter. Takk for at du deler kunnskap som gjør verden grønnere!',
        missionName: 'Del Miljøtips',
        category: getCategoryName(tipCategory),
        content: tipContent,
        contentLabel: '📝 Ditt registrerte tips:',
        colors: {
          bg: 'from-yellow-900 to-yellow-700',
          gradient: 'from-yellow-600/40 to-yellow-500/20 border-yellow-500',
          text: 'text-yellow-300',
          accent: 'text-yellow-200'
        }
      };
    } else if (isRepairMission) {
      return {
        icon: '🔧',
        title: 'Reparasjon-Mester!',
        subtitle: 'Din reparasjon er registrert og inspirerer andre til å fikse i stedet for å kaste. Takk for at du bidrar til sirkulærøkonomi!',
        missionName: 'Reparasjonsoppdrag',
        category: getCategoryName(repairCategory),
        content: repairDescription,
        contentLabel: '🔧 Din reparasjon:',
        colors: {
          bg: 'from-orange-900 to-red-900',
          gradient: 'from-orange-600/40 to-red-500/20 border-orange-500',
          text: 'text-orange-300',
          accent: 'text-orange-200'
        }
      };
    } else if (isShoppingMission) {
      return {
        icon: '🛒',
        title: 'Øko-Handels-Agent!',
        subtitle: 'Din økologiske handlerunde er registrert og viser veien til bærekraftig forbruk. Takk for at du velger miljøvennlige alternativer!',
        missionName: 'Økologisk Handlerunde',
        category: `Butikk: ${shoppingStore}`,
        content: shoppingProducts,
        contentLabel: '🛒 Dine økologiske produkter:',
        colors: {
          bg: 'from-blue-900 to-blue-700',
          gradient: 'from-blue-600/40 to-blue-500/20 border-blue-500',
          text: 'text-blue-300',
          accent: 'text-blue-200'
        }
      };
    }
    
    return {
      icon: '🥗',
      title: 'Oppdrag Fullført!',
      subtitle: 'Takk for ditt bidrag til en grønnere verden!',
      missionName: 'Ukjent oppdrag',
      category: 'Generelt',
      content: 'Ingen detaljer tilgjengelig',
      contentLabel: '📝 Oppdrag:',
      colors: {
        bg: 'from-green-900 to-green-700',
        gradient: 'from-green-600/40 to-green-500/20 border-green-500',
        text: 'text-green-300',
        accent: 'text-green-200'
      }
    };
  };

  const config = getMissionConfig();

  return (
    <div className={`w-full max-w-6xl mx-auto bg-gradient-to-br ${config.colors.bg} text-white min-h-screen overflow-hidden relative flex flex-col`}>
      {/* Floating Elements */}
      {isVeggieMission ? (
        <>
          <div className="absolute top-32 left-8 text-2xl opacity-20 text-green-300 animate-bounce" style={{animationDelay: '0s'}}>🥗</div>
          <div className="absolute top-64 right-8 text-2xl opacity-20 text-green-300 animate-bounce" style={{animationDelay: '2s'}}>🌱</div>
          <div className="absolute top-96 left-12 text-2xl opacity-20 text-green-300 animate-bounce" style={{animationDelay: '4s'}}>🍅</div>
        </>
      ) : isTipsMission ? (
        <>
          <div className="absolute top-32 left-8 text-2xl opacity-20 text-yellow-300 animate-bounce" style={{animationDelay: '0s'}}>💡</div>
          <div className="absolute top-64 right-8 text-2xl opacity-20 text-yellow-300 animate-bounce" style={{animationDelay: '2s'}}>🧠</div>
          <div className="absolute top-96 left-12 text-2xl opacity-20 text-yellow-300 animate-bounce" style={{animationDelay: '4s'}}>📚</div>
        </>
      ) : isRepairMission ? (
        <>
          <div className="absolute top-32 left-8 text-2xl opacity-20 text-orange-300 animate-bounce" style={{animationDelay: '0s'}}>🔧</div>
          <div className="absolute top-64 right-8 text-2xl opacity-20 text-orange-300 animate-bounce" style={{animationDelay: '2s'}}>🔨</div>
          <div className="absolute top-96 left-12 text-2xl opacity-20 text-orange-300 animate-bounce" style={{animationDelay: '4s'}}>⚙️</div>
        </>
      ) : (
        <>
          <div className="absolute top-32 left-8 text-2xl opacity-20 text-blue-300 animate-bounce" style={{animationDelay: '0s'}}>🛒</div>
          <div className="absolute top-64 right-8 text-2xl opacity-20 text-blue-300 animate-bounce" style={{animationDelay: '2s'}}>🥕</div>
          <div className="absolute top-96 left-12 text-2xl opacity-20 text-blue-300 animate-bounce" style={{animationDelay: '4s'}}>📋</div>
        </>
      )}

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 bg-black/30 text-center">
          <div className={`text-lg sm:text-xl lg:text-2xl font-semibold ${config.colors.text}`}>
            {config.icon} OPPDRAG FULLFØRT
          </div>
        </div>

        {/* Success Animation */}
        <div className="text-center p-8 sm:p-10 lg:p-12">
          <div className={`w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br ${
            isVeggieMission ? 'from-green-500 to-green-400 shadow-green-500/50' :
            isTipsMission ? 'from-yellow-500 to-yellow-400 shadow-yellow-500/50' :
            isRepairMission ? 'from-orange-500 to-red-500 shadow-orange-500/50' :
            'from-blue-500 to-blue-400 shadow-blue-500/50'
          } rounded-full flex items-center justify-center mx-auto mb-5 text-4xl sm:text-5xl lg:text-6xl animate-pulse shadow-xl`}>
            ✅
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-lg">
            {config.title}
          </div>
          <div className={`text-base sm:text-lg lg:text-xl ${config.colors.accent} leading-relaxed max-w-md mx-auto`}>
            {config.subtitle}
          </div>
        </div>

        {/* Mission Summary */}
        <div className={`bg-gradient-to-br ${config.colors.gradient} border rounded-2xl p-5 sm:p-6 lg:p-8 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 relative overflow-hidden`}>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
          
          <div className="text-center mb-5 relative z-10">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${
              isVeggieMission ? 'from-green-500 to-green-400' :
              isTipsMission ? 'from-yellow-500 to-yellow-400' :
              isRepairMission ? 'from-orange-500 to-red-500' :
              'from-blue-500 to-blue-400'
            } rounded-full flex items-center justify-center mx-auto mb-3 text-2xl sm:text-3xl lg:text-4xl`}>
              {config.icon}
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-1">
              {config.missionName}
            </div>
            <div className={`text-sm sm:text-base lg:text-lg ${config.colors.accent}`}>
              Kategori: {config.category}
            </div>
          </div>

          {/* Content Preview */}
          <div className={`${
            isVeggieMission ? 'bg-green-600/20 border-green-500/50' :
            isTipsMission ? 'bg-yellow-600/20 border-yellow-500/50' :
            isRepairMission ? 'bg-orange-600/20 border-orange-500/50' :
            'bg-blue-600/20 border-blue-500/50'
          } border rounded-xl p-4 sm:p-5 lg:p-6 mb-5 relative z-10`}>
            <div className={`text-sm sm:text-base lg:text-lg ${config.colors.text} font-semibold mb-2 uppercase tracking-wider`}>
              {config.contentLabel}
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-white italic leading-relaxed">
              "{config.content}"
            </div>
          </div>

          {/* Points Earned */}
          <div className={`${isVeggieMission ? 'bg-green-500/30 border-green-400' : 'bg-yellow-500/30 border-yellow-400'} border-2 rounded-2xl p-5 sm:p-6 lg:p-8 text-center mb-5 relative z-10`}>
            <div className={`text-sm sm:text-base lg:text-lg ${isVeggieMission ? 'text-green-200' : 'text-yellow-200'} mb-2 uppercase tracking-widest`}>
              Poeng Opptjent
            </div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-2 drop-shadow-lg">
              {earnedPoints}
            </div>
            <div className={`text-xs sm:text-sm lg:text-base ${isVeggieMission ? 'text-green-200' : 'text-yellow-200'} leading-relaxed`}>
              {isVeggieMission ? 'Grunnoppdrag (30) + Januar-bonus (5)' : searchParams.get('breakdown') || 'Poeng beregnet'}
            </div>
          </div>

        </div>

        {/* Achievement Badge */}
        <div className={`bg-gradient-to-br ${isVeggieMission ? 'from-green-500/40 to-green-400/30 border-green-400 shadow-green-400/30' : 'from-yellow-500/40 to-yellow-400/30 border-yellow-400 shadow-yellow-400/30'} border rounded-2xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center animate-pulse shadow-lg`}>
          <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">
            {isVeggieMission ? '🥗' : '🎓'}
          </div>
          <div className={`text-base sm:text-lg lg:text-xl font-semibold ${isVeggieMission ? 'text-green-400' : 'text-yellow-400'} mb-1`}>
            {isVeggieMission ? 'Mat-Mester' : 'Visdoms-Deler'}
          </div>
          <div className={`text-xs sm:text-sm lg:text-base ${isVeggieMission ? 'text-green-300' : 'text-yellow-300'}`}>
            {isVeggieMission ? 'Tredje vegetarmiddag denne måneden!' : 'Første miljøtips publisert!'}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-br from-green-500/30 to-green-400/20 border border-green-400 rounded-2xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center">
          <div className="text-sm sm:text-base lg:text-lg text-green-400 font-semibold mb-3 sm:mb-4">
            {isVeggieMission ? '🌍 Miljøpåvirkning denne måneden' : '🌍 Potensielt miljøpåvirkning av ditt tips'}
          </div>
          <div className="flex justify-around">
            {isVeggieMission ? (
              <>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">~15 kg</div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-300 mt-1">CO2 spart</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">75%</div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-300 mt-1">av månedsmål</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">1</div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-300 mt-1">middag igjen</div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">156</div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-300 mt-1">Agenter ser tipset</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">~78</div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-300 mt-1">Kan følge rådet</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">343kWh</div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-300 mt-1">Årlig sparing</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Monthly Status Update */}
        <div className={`${isVeggieMission ? 'bg-green-600/20 border-green-500/50' : 'bg-yellow-600/20 border-yellow-500/50'} border rounded-2xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 space-y-3 sm:space-y-4`}>
          <div className="flex justify-between items-center">
            <span className={`text-sm sm:text-base lg:text-lg ${isVeggieMission ? 'text-green-200' : 'text-yellow-200'}`}>Totale poeng denne måned:</span>
            <span className="text-base sm:text-lg lg:text-xl font-semibold text-white">225</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm sm:text-base lg:text-lg ${isVeggieMission ? 'text-green-200' : 'text-yellow-200'}`}>Din plassering:</span>
            <span className={`text-base sm:text-lg lg:text-xl font-semibold transition-colors duration-500 ${animateRank ? (isVeggieMission ? 'text-green-300' : 'text-yellow-300') : 'text-white'}`}>
              Agent #1247 - plass #{currentRank} av 156
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm sm:text-base lg:text-lg ${isVeggieMission ? 'text-green-200' : 'text-yellow-200'}`}>Status:</span>
            <span className={`bg-gradient-to-r ${isVeggieMission ? 'from-green-500 to-green-400 text-green-900' : 'from-yellow-500 to-yellow-400 text-yellow-900'} px-3 py-1 rounded-xl text-xs sm:text-sm lg:text-base font-semibold`}>
              🌱 TOPP 25%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm sm:text-base lg:text-lg ${isVeggieMission ? 'text-green-200' : 'text-yellow-200'}`}>
              {isVeggieMission ? 'Vegetarmiddager denne måned:' : 'Fullførte oppdrag:'}
            </span>
            <span className="text-base sm:text-lg lg:text-xl font-semibold text-white">
              {isVeggieMission ? '3 av 4' : '6 av 8'}
            </span>
          </div>
        </div>

        {/* Next Mission Hint */}
        <div className={`${isVeggieMission ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'} border border-dashed rounded-xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center`}>
          <div className={`text-sm sm:text-base lg:text-lg ${isVeggieMission ? 'text-green-200' : 'text-yellow-200'} mb-2`}>
            Neste anbefalte oppdrag:
          </div>
          <div className={`text-base sm:text-lg lg:text-xl font-semibold ${isVeggieMission ? 'text-green-300' : 'text-yellow-300'}`}>
            🔧 Reparer en ting
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 sm:p-6 lg:p-8 flex gap-3 sm:gap-4">
          <button
            onClick={isVeggieMission ? newVeggieMission : () => router.push('/tips-mission')}
            className={`flex-2 bg-gradient-to-br ${isVeggieMission ? 'from-green-500 to-green-400 text-green-900' : 'from-yellow-500 to-yellow-400 text-yellow-900'} font-bold text-base sm:text-lg lg:text-xl py-4 sm:py-5 lg:py-6 px-4 sm:px-6 rounded-2xl hover:scale-105 transition-all transform`}
          >
            {isVeggieMission ? '🥗 NY VEGETARMIDDAG' : '💡 FLERE TIPS'}
          </button>
          <button
            onClick={shareMission}
            className={`flex-1 ${isVeggieMission ? 'bg-green-500/20 border-green-400 text-green-300 hover:bg-green-500/30' : 'bg-yellow-500/20 border-yellow-400 text-yellow-300 hover:bg-yellow-500/30'} border font-semibold text-base sm:text-lg lg:text-xl py-4 sm:py-5 lg:py-6 px-4 sm:px-6 rounded-2xl transition-all`}
          >
            📤 DEL
          </button>
        </div>
      </div>
    </div>
  );
}