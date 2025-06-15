'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function TipsMission() {
  const router = useRouter();
  const { isCulturaCustomer, monthlyBonusPoints } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tipContent, setTipContent] = useState('');
  const [background, setBackground] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // Checkboxes
  const [testedSelf, setTestedSelf] = useState(false);
  const [measurable, setMeasurable] = useState(false);
  const [shareConsent, setShareConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [photoConsent, setPhotoConsent] = useState(false);

  // Quality indicators
  const [qualityIndicators, setQualityIndicators] = useState({
    concrete: false,
    actionable: false,
    original: false,
    detailed: false
  });

  const categories = [
    { id: 'energi', icon: '⚡', name: 'Energisparing' },
    { id: 'transport', icon: '🚗', name: 'Transport' },
    { id: 'mat', icon: '🍽️', name: 'Mat & forbruk' },
    { id: 'gjenbruk', icon: '♻️', name: 'Gjenbruk' },
    { id: 'avfall', icon: '🗑️', name: 'Avfall' },
    { id: 'vann', icon: '💧', name: 'Vannsparing' },
    { id: 'annet', icon: '🌱', name: 'Annet' }
  ];

  const exampleTips = [
    'Bruk termokrus i stedet for engangskopper',
    'Slå av ladere når de ikke er i bruk',
    'Planlegg handletur for å unngå matsvinn',
    'Bruk sykkel på korte turer under 5 km',
    'Lag nye ting av gamle klær',
    'Gjenbruk glass som oppbevaring'
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

    if (tipContent.length >= 100) {
      points += 5;
      breakdown.push('Detaljert tips (5)');
    }

    if (hasPhoto) {
      points += 10;
      breakdown.push('Illustrasjon (10)');
    }

    if (background.length > 20) {
      points += 10;
      breakdown.push('Bakgrunn (10)');
    }

    if (testedSelf) {
      points += 5;
      breakdown.push('Testet selv (5)');
    }

    if (measurable) {
      points += 5;
      breakdown.push('Målbart (5)');
    }

    if (marketingConsent) {
      points += 5;
      breakdown.push('Markedsføring-tillatelse (5)');
    }

    if (hasPhoto && photoConsent) {
      points += 5;
      breakdown.push('Foto-samtykke (5)');
    }

    return { points, breakdown: breakdown.join(' + ') };
  };

  // Update quality indicators
  useEffect(() => {
    const content = tipContent.toLowerCase();
    const words = tipContent.trim().split(/\s+/).filter(word => word.length > 0);

    const concreteWords = ['bruk', 'gjør', 'sett', 'ta', 'velg', 'unngå', 'bytt'];
    const actionWords = ['kan', 'skal', 'må', 'bør', 'start', 'prøv'];

    setQualityIndicators({
      concrete: concreteWords.some(word => content.includes(word)),
      actionable: actionWords.some(word => content.includes(word)),
      original: tipContent.length > 50,
      detailed: words.length > 15
    });
  }, [tipContent]);

  const handlePhotoUpload = () => {
    alert('📷 Foto-funksjon kommer snart!');
    setHasPhoto(true);
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      alert('Vennligst velg en kategori for tipset ditt.');
      return;
    }

    if (tipContent.length < 20) {
      alert('Tipset ditt må være minst 20 tegn langt for å være nyttig for andre.');
      return;
    }

    if (!shareConsent) {
      alert('Du må godkjenne deling av tipset for at det skal kunne publiseres for andre brukere.');
      return;
    }

    const { points, breakdown } = calculatePoints();
    const params = new URLSearchParams({
      type: 'tips',
      category: selectedCategory,
      tip: tipContent,
      background: background,
      hasPhoto: hasPhoto.toString(),
      points: points.toString(),
      breakdown: breakdown
    });

    router.push(`/mission-complete?${params.toString()}`);
  };

  const { points, breakdown } = calculatePoints();

  const getLengthIndicator = () => {
    const length = tipContent.length;
    if (length < 20) {
      return { text: `Skriv minst 20 tegn for et godt tips (${length}/20)`, className: '' };
    } else if (length < 100) {
      return { text: `Bra lengde! (${length} tegn)`, className: 'text-green-400' };
    } else {
      return { text: `Utmerket detaljnivå! (${length} tegn)`, className: 'text-yellow-400 font-semibold' };
    }
  };

  const lengthIndicator = getLengthIndicator();

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-yellow-900 to-yellow-700 text-white min-h-screen overflow-hidden relative flex flex-col">
      {/* Floating Knowledge Icons */}
      <div className="absolute top-8 right-8 text-lg opacity-20 text-yellow-300 animate-bounce" style={{animationDelay: '0s'}}>💡</div>
      <div className="absolute top-20 left-6 text-lg opacity-20 text-yellow-300 animate-bounce" style={{animationDelay: '2s'}}>🧠</div>
      <div className="absolute bottom-52 right-6 text-lg opacity-20 text-yellow-300 animate-bounce" style={{animationDelay: '4s'}}>📚</div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 bg-black/30 flex items-center justify-between">
          <Link href="/dashboard" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-yellow-500/20 border border-yellow-500 rounded-full flex items-center justify-center text-yellow-300 text-lg sm:text-xl lg:text-2xl hover:bg-yellow-500/30 transition-colors">
            ←
          </Link>
          <div className="flex-1 text-center text-lg sm:text-xl lg:text-2xl font-semibold text-yellow-300">
            OPPDRAGSRAPPORT
          </div>
          <div className="w-10 sm:w-12 lg:w-14"></div>
        </div>

        {/* Mission Header */}
        <div className="bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 border border-yellow-500 rounded-2xl p-5 sm:p-6 lg:p-8 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
          
          <div className="w-15 h-15 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl sm:text-4xl lg:text-5xl shadow-lg shadow-yellow-500/40 relative z-10">
            💡
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 relative z-10">
            Del Miljøtips
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-yellow-200 mb-3 relative z-10">
            Grunnoppdrag: 10 poeng
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-yellow-900 px-3 py-1 rounded-xl text-xs sm:text-sm lg:text-base font-semibold inline-block relative z-10">
            +5 Januar-bonus
          </div>
        </div>

        {/* Form Container */}
        <div className="px-5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Category Selection */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">🎯</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300 flex-1">
                Kategori for tipset ditt
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-yellow-200 bg-yellow-600/20 px-2 py-1 rounded-lg">
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
                      ? 'bg-yellow-600/30 border-yellow-500 text-white'
                      : 'bg-yellow-600/15 border-yellow-600/30 text-yellow-200 hover:bg-yellow-600/25'
                  }`}
                >
                  <div className="text-lg sm:text-xl mb-1">{category.icon}</div>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tip Content */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">📝</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300 flex-1">
                Ditt miljøtips
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-yellow-200 bg-yellow-600/20 px-2 py-1 rounded-lg mr-2">
                Påkrevd
              </span>
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="text-xs sm:text-sm lg:text-base text-yellow-200 bg-yellow-600/20 px-2 py-1 rounded-lg hover:bg-yellow-600/30 transition-colors"
              >
                💡 Inspirasjon
              </button>
            </div>
            
            {showExamples && (
              <div className="bg-yellow-600/10 border border-dashed border-yellow-600/30 rounded-xl p-4 sm:p-5 mb-4">
                <div className="text-sm sm:text-base lg:text-lg text-yellow-300 font-semibold mb-3">
                  💡 Inspirasjon til gode tips:
                </div>
                {exampleTips.map((tip, index) => (
                  <div key={index} className="text-xs sm:text-sm lg:text-base text-yellow-200 mb-2 pl-6 relative">
                    <span className="absolute left-0 text-xs">💡</span>
                    {tip}
                  </div>
                ))}
              </div>
            )}

            <textarea
              value={tipContent}
              onChange={(e) => setTipContent(e.target.value)}
              className="w-full bg-yellow-600/15 border border-yellow-600/30 rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg min-h-[120px] sm:min-h-[140px] placeholder-yellow-200 resize-none focus:outline-none focus:border-yellow-500 focus:bg-yellow-600/25 transition-colors"
              placeholder="Del ditt beste miljøtips! Skriv konkret og praktisk så andre kan følge rådet ditt..."
            />
            
            <div className={`bg-yellow-600/10 rounded-lg p-2 sm:p-3 mt-2 text-xs sm:text-sm lg:text-base text-center ${lengthIndicator.className}`}>
              {lengthIndicator.text}
            </div>
          </div>

          {/* Quality Indicators */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">🏆</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300">
                Kvalitetsindikatorer
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {Object.entries(qualityIndicators).map(([key, active]) => (
                <div
                  key={key}
                  className={`p-3 sm:p-4 rounded-xl text-xs sm:text-sm lg:text-base text-center transition-all border ${
                    active
                      ? 'bg-yellow-600/30 border-yellow-500 text-white'
                      : 'bg-yellow-600/15 border-yellow-600/30 text-yellow-200'
                  }`}
                >
                  {key === 'concrete' && 'Konkret'}
                  {key === 'actionable' && 'Handlingsbar'}
                  {key === 'original' && 'Original'}
                  {key === 'detailed' && 'Detaljert'}
                </div>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">📸</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300 flex-1">
                Illustrer tipset ditt
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-yellow-200 bg-yellow-600/20 px-2 py-1 rounded-lg">
                +10 poeng
              </span>
            </div>
            <button
              onClick={handlePhotoUpload}
              className="w-full bg-yellow-600/15 border-2 border-dashed border-yellow-600/50 rounded-xl p-8 sm:p-10 lg:p-12 text-center hover:bg-yellow-600/25 hover:border-yellow-500 transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 opacity-80 text-yellow-500">
                {hasPhoto ? '✅' : '📷'}
              </div>
              <div className="text-base sm:text-lg lg:text-xl text-yellow-300 font-semibold mb-2">
                {hasPhoto ? 'Bilde lastet opp!' : 'Vis tipset i praksis'}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-yellow-200">
                Bilde som illustrerer hvordan tipset fungerer
              </div>
            </button>
          </div>

          {/* Background */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">📊</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300 flex-1">
                Bakgrunn og erfaring
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-yellow-200 bg-yellow-600/20 px-2 py-1 rounded-lg">
                +10 poeng
              </span>
            </div>
            <textarea
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full bg-yellow-600/15 border border-yellow-600/30 rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg min-h-[80px] sm:min-h-[100px] placeholder-yellow-200 resize-none focus:outline-none focus:border-yellow-500 focus:bg-yellow-600/25 transition-colors"
              placeholder="Hvor kommer tipset fra? Hvor mye sparer det? Egen erfaring?"
            />
          </div>

          {/* Bonus Quality Checkboxes */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">⭐</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300">
                Bonus-kvalitet
              </span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <label className="flex items-center cursor-pointer">
                <div
                  onClick={() => setTestedSelf(!testedSelf)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all ${
                    testedSelf
                      ? 'bg-yellow-500 border-yellow-500 text-yellow-900'
                      : 'bg-yellow-600/15 border-yellow-600/50'
                  }`}
                >
                  {testedSelf && '✓'}
                </div>
                <span className="text-sm sm:text-base lg:text-lg text-white">
                  Jeg har testet dette selv (+5 poeng)
                </span>
              </label>

              <label className="flex items-center cursor-pointer">
                <div
                  onClick={() => setMeasurable(!measurable)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all ${
                    measurable
                      ? 'bg-yellow-500 border-yellow-500 text-yellow-900'
                      : 'bg-yellow-600/15 border-yellow-600/50'
                  }`}
                >
                  {measurable && '✓'}
                </div>
                <span className="text-sm sm:text-base lg:text-lg text-white">
                  Tipset har målbare resultater (+5 poeng)
                </span>
              </label>
            </div>
          </div>

          {/* Sharing and Publishing Consent */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">📢</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300">
                Publisering og deling
              </span>
            </div>
            
            {/* Primary sharing consent - required for publication */}
            <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-xl p-4 sm:p-5 mb-4">
              <div className="text-sm sm:text-base lg:text-lg text-yellow-300 font-semibold mb-3">
                📋 Obligatorisk for å publisere tips
              </div>
              <label className="flex items-start cursor-pointer">
                <div
                  onClick={() => setShareConsent(!shareConsent)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all mt-0.5 flex-shrink-0 ${
                    shareConsent
                      ? 'bg-yellow-500 border-yellow-500 text-yellow-900'
                      : 'bg-yellow-600/15 border-yellow-600/50'
                  }`}
                >
                  {shareConsent && '✓'}
                </div>
                <div className="flex-1">
                  <span className="text-sm sm:text-base lg:text-lg text-white leading-relaxed font-medium">
                    Jeg tillater at mitt miljøtips deles med andre brukere i appen
                  </span>
                  <div className="text-xs sm:text-sm lg:text-base text-yellow-200 mt-1 leading-relaxed">
                    Ditt tips vil være synlig for alle andre agenter i Operasjon Grønn Innsats. Tipset vil gå gjennom automatisk kvalitetskontroll før publisering.
                  </div>
                </div>
              </label>
            </div>

            {/* Additional marketing consent */}
            <div className="space-y-3 sm:space-y-4">
              <div className="text-sm sm:text-base lg:text-lg text-yellow-300 font-semibold mb-2">
                🎁 Valgfritt - ekstra bonuspoeng
              </div>
              
              <label className="flex items-start cursor-pointer">
                <div
                  onClick={() => setMarketingConsent(!marketingConsent)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all mt-0.5 flex-shrink-0 ${
                    marketingConsent
                      ? 'bg-yellow-500 border-yellow-500 text-yellow-900'
                      : 'bg-yellow-600/15 border-yellow-600/50'
                  }`}
                >
                  {marketingConsent && '✓'}
                </div>
                <div className="flex-1">
                  <span className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                    Cultura Bank kan bruke mitt tips i markedsføring (+5 poeng)
                  </span>
                  <div className="text-xs sm:text-sm lg:text-base text-yellow-200 mt-1">
                    Nettsider, sosiale medier, brosjyrer osv.
                  </div>
                </div>
              </label>

              {hasPhoto && (
                <label className="flex items-start cursor-pointer">
                  <div
                    onClick={() => setPhotoConsent(!photoConsent)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all mt-0.5 flex-shrink-0 ${
                      photoConsent
                        ? 'bg-yellow-500 border-yellow-500 text-yellow-900'
                        : 'bg-yellow-600/15 border-yellow-600/50'
                    }`}
                  >
                    {photoConsent && '✓'}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                      Alle på bildet samtykker til publisering (+5 poeng)
                    </span>
                    <div className="text-xs sm:text-sm lg:text-base text-yellow-200 mt-1">
                      Påkrevd ved bruk av foto med personer
                    </div>
                  </div>
                </label>
              )}
            </div>
          </div>

        </div>

        {/* Points Preview */}
        <div className="bg-yellow-600/20 border border-yellow-500 rounded-xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center">
          <div className="text-sm sm:text-base lg:text-lg text-yellow-300 mb-2">
            Estimerte poeng for dette oppdraget
          </div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            {points}
          </div>
          <div className="text-xs sm:text-sm lg:text-base text-yellow-200">
            {breakdown}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-5 sm:px-6 lg:px-8 pb-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-br from-yellow-500 to-yellow-400 text-yellow-900 font-bold text-lg sm:text-xl lg:text-2xl py-4 sm:py-5 lg:py-6 rounded-2xl hover:from-yellow-400 hover:to-yellow-300 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-yellow-500/40"
          >
            💡 SEND KUNNSKAP
          </button>
        </div>
      </div>
    </div>
  );
}