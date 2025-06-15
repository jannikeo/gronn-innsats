'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function RepairMission() {
  const router = useRouter();
  const { isCulturaCustomer, monthlyBonusPoints } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selfieBonus, setSelfieBonus] = useState(false);
  const [wasteReduction, setWasteReduction] = useState(false);

  const categories = [
    { id: 'klær', icon: '👕', name: 'Klær' },
    { id: 'elektronikk', icon: '📱', name: 'Elektronikk' },
    { id: 'møbler', icon: '🪑', name: 'Møbler' },
    { id: 'verktøy', icon: '🔨', name: 'Verktøy' },
    { id: 'sykkel', icon: '🚲', name: 'Sykkel' },
    { id: 'annet', icon: '⚙️', name: 'Annet' }
  ];

  // Calculate points
  const calculatePoints = () => {
    let points = 15; // Base (10) + January bonus (5)
    const breakdown = ['Grunnoppdrag (10)', 'Januar-bonus (5)'];

    // Add monthly Cultura customer bonus
    if (isCulturaCustomer) {
      points += monthlyBonusPoints;
      breakdown.push(`Cultura-kunde månedlig bonus (${monthlyBonusPoints})`);
    }

    if (hasPhoto) {
      points += 10;
      breakdown.push('Dokumentasjon (10)');
    }

    if (selfieBonus) {
      points += 10;
      breakdown.push('Mesterhåndverker (10)');
    }

    if (tips.length > 10) {
      points += 10;
      breakdown.push('Tips (10)');
    }

    if (wasteReduction) {
      points += 5;
      breakdown.push('Miljøpåvirkning (5)');
    }

    return { points, breakdown: breakdown.join(' + ') };
  };

  const handlePhotoUpload = () => {
    alert('📷 Foto-funksjon kommer snart!');
    setHasPhoto(true);
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      alert('Vennligst velg hva du reparerte.');
      return;
    }

    if (description.length < 10) {
      alert('Vennligst beskriv reparasjonen din med minst 10 tegn.');
      return;
    }

    const { points, breakdown } = calculatePoints();
    const params = new URLSearchParams({
      type: 'repair',
      category: selectedCategory,
      description: description,
      tips: tips,
      hasPhoto: hasPhoto.toString(),
      points: points.toString(),
      breakdown: breakdown
    });

    router.push(`/mission-complete?${params.toString()}`);
  };

  const { points, breakdown } = calculatePoints();

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-orange-900 to-red-900 text-white min-h-screen overflow-hidden relative flex flex-col">
      {/* Floating Tool Icons */}
      <div className="absolute top-8 right-8 text-lg opacity-20 text-orange-300 animate-bounce" style={{animationDelay: '0s'}}>🔨</div>
      <div className="absolute top-20 left-6 text-lg opacity-20 text-orange-300 animate-bounce" style={{animationDelay: '1s'}}>🔧</div>
      <div className="absolute bottom-52 right-6 text-lg opacity-20 text-orange-300 animate-bounce" style={{animationDelay: '2s'}}>⚙️</div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 bg-black/30 flex items-center justify-between">
          <Link href="/dashboard" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-orange-500/20 border border-orange-500 rounded-full flex items-center justify-center text-orange-300 text-lg sm:text-xl lg:text-2xl hover:bg-orange-500/30 transition-colors">
            ←
          </Link>
          <div className="flex-1 text-center text-lg sm:text-xl lg:text-2xl font-semibold text-orange-300">
            OPPDRAGSRAPPORT
          </div>
          <div className="w-10 sm:w-12 lg:w-14"></div>
        </div>

        {/* Mission Header */}
        <div className="bg-gradient-to-br from-orange-600/30 to-red-500/20 border border-orange-500 rounded-2xl p-5 sm:p-6 lg:p-8 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
          
          <div className="w-15 h-15 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl sm:text-4xl lg:text-5xl shadow-lg shadow-orange-500/40 relative z-10">
            🔧
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 relative z-10">
            Reparasjonsoppdrag
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-orange-200 mb-3 relative z-10">
            Grunnoppdrag: 10 poeng
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-orange-900 px-3 py-1 rounded-xl text-xs sm:text-sm lg:text-base font-semibold inline-block relative z-10">
            +5 Januar-bonus
          </div>
        </div>

        {/* Form Container */}
        <div className="px-5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Category Selection */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">🎯</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-orange-300 flex-1">
                Hva reparerte du?
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-orange-200 bg-orange-600/20 px-2 py-1 rounded-lg">
                Påkrevd
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-3 sm:p-4 rounded-xl text-xs sm:text-sm lg:text-base text-center transition-all border ${
                    selectedCategory === category.id
                      ? 'bg-orange-600/30 border-orange-500 text-white'
                      : 'bg-orange-600/15 border-orange-600/30 text-orange-200 hover:bg-orange-600/25'
                  }`}
                >
                  <div className="text-lg sm:text-xl mb-1">{category.icon}</div>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">📝</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-orange-300 flex-1">
                Beskriv reparasjonen
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-orange-200 bg-orange-600/20 px-2 py-1 rounded-lg">
                Påkrevd
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-orange-600/15 border border-orange-600/30 rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg min-h-[120px] sm:min-h-[140px] placeholder-orange-200 resize-none focus:outline-none focus:border-orange-500 focus:bg-orange-600/25 transition-colors"
              placeholder="Beskriv hva som var ødelagt og hvordan du fikset det..."
            />
          </div>

          {/* Photo Upload */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">📸</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-orange-300 flex-1">
                Før/etter-bilder
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-orange-200 bg-orange-600/20 px-2 py-1 rounded-lg">
                +10 poeng
              </span>
            </div>
            <button
              onClick={handlePhotoUpload}
              className="w-full bg-orange-600/15 border-2 border-dashed border-orange-600/50 rounded-xl p-8 sm:p-10 lg:p-12 text-center hover:bg-orange-600/25 hover:border-orange-500 transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 opacity-80 text-orange-500">
                {hasPhoto ? '✅' : '🔍'}
              </div>
              <div className="text-base sm:text-lg lg:text-xl text-orange-300 font-semibold mb-2">
                {hasPhoto ? 'Bilder lastet opp!' : 'Dokumenter reparasjonen'}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-orange-200">
                Før, under eller etter
              </div>
            </button>
          </div>

          {/* Masterhåndverker Bonus */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">🤳</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-orange-300">
                Mesterhåndverker-bonus
              </span>
            </div>
            <label className="flex items-center cursor-pointer">
              <div
                onClick={() => setSelfieBonus(!selfieBonus)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all ${
                  selfieBonus
                    ? 'bg-orange-500 border-orange-500 text-orange-900'
                    : 'bg-orange-600/15 border-orange-600/50'
                }`}
              >
                {selfieBonus && '✓'}
              </div>
              <span className="text-sm sm:text-base lg:text-lg text-white">
                Vis deg i aksjon (+10 poeng)
              </span>
            </label>
          </div>

          {/* Tips */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">💡</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-orange-300 flex-1">
                Del dine reparasjonstips
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-orange-200 bg-orange-600/20 px-2 py-1 rounded-lg">
                +10 poeng
              </span>
            </div>
            <textarea
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              className="w-full bg-orange-600/15 border border-orange-600/30 rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg min-h-[120px] sm:min-h-[140px] placeholder-orange-200 resize-none focus:outline-none focus:border-orange-500 focus:bg-orange-600/25 transition-colors"
              placeholder="Hvilke verktøy brukte du? Tips til andre som har samme problem?"
            />
          </div>

          {/* Environmental Impact */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">♻️</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-orange-300">
                Miljøpåvirkning
              </span>
            </div>
            <label className="flex items-center cursor-pointer">
              <div
                onClick={() => setWasteReduction(!wasteReduction)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all ${
                  wasteReduction
                    ? 'bg-orange-500 border-orange-500 text-orange-900'
                    : 'bg-orange-600/15 border-orange-600/50'
                }`}
              >
                {wasteReduction && '✓'}
              </div>
              <span className="text-sm sm:text-base lg:text-lg text-white">
                Denne tingen ville blitt kastet (+5 poeng)
              </span>
            </label>
          </div>
        </div>

        {/* Points Preview */}
        <div className="bg-orange-600/20 border border-orange-500 rounded-xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center">
          <div className="text-sm sm:text-base lg:text-lg text-orange-300 mb-2">
            Estimerte poeng for dette oppdraget
          </div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            {points}
          </div>
          <div className="text-xs sm:text-sm lg:text-base text-orange-200">
            {breakdown}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-5 sm:px-6 lg:px-8 pb-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-br from-orange-500 to-red-500 text-orange-900 font-bold text-lg sm:text-xl lg:text-2xl py-4 sm:py-5 lg:py-6 rounded-2xl hover:from-orange-400 hover:to-red-400 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-orange-500/40"
          >
            ⚒️ SEND REPARASJONSRAPPORT
          </button>
        </div>
      </div>
    </div>
  );
}