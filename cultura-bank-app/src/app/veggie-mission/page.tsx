'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VeggieMission() {
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!description.trim()) {
      alert('Vennligst beskriv middagen din før du sender rapporten!');
      return;
    }
    
    // Send data via URL parameters
    const params = new URLSearchParams({
      description: description,
      hasPhoto: hasPhoto.toString()
    });
    
    router.push(`/mission-complete?${params.toString()}`);
  };

  const handlePhotoUpload = () => {
    alert('📷 Foto-funksjon kommer snart!');
    setHasPhoto(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-green-900 to-green-700 text-white min-h-screen overflow-hidden relative flex flex-col">
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 bg-black/20 flex items-center justify-between">
          <Link href="/dashboard" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center text-green-300 text-lg sm:text-xl lg:text-2xl hover:bg-green-500/30 transition-colors">
            ←
          </Link>
          <div className="flex-1 text-center text-lg sm:text-xl lg:text-2xl font-semibold text-green-300">
            OPPDRAGSRAPPORT
          </div>
          <div className="w-10 sm:w-12 lg:w-14"></div>
        </div>

        {/* Mission Header */}
        <div className="bg-gradient-to-br from-green-600/40 to-green-500/20 border border-green-500 rounded-2xl p-5 sm:p-6 lg:p-8 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center">
          <div className="w-15 h-15 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl sm:text-4xl lg:text-5xl">
            🥗
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            Vegetar Middag
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-green-300 font-semibold mb-2">
            30 poeng per middag • Mål: 1 per uke
          </div>
          <div className="text-xs sm:text-sm lg:text-base text-yellow-300 bg-yellow-600/20 px-3 py-1 rounded-lg inline-block mb-3">
            Registrert: 2 av 4 denne måneden
          </div>
          <div className="bg-green-500 text-green-900 px-3 py-1 rounded-xl text-xs sm:text-sm lg:text-base font-semibold inline-block">
            +5 Januar-bonus
          </div>
        </div>

        {/* Form Section */}
        <div className="px-5 sm:px-6 lg:px-8 pb-6">
          {/* Description Input */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-base sm:text-lg lg:text-xl font-semibold text-green-300 mb-3 sm:mb-4">
              📝 Beskriv oppdraget
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-green-600/20 border border-green-500/30 rounded-xl p-4 sm:p-5 lg:p-6 text-white text-sm sm:text-base lg:text-lg min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] placeholder-green-200 resize-none"
              placeholder="Fortell om den vegetariske middagen du lagde..."
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-base sm:text-lg lg:text-xl font-semibold text-green-300 mb-3 sm:mb-4">
              📸 Opplast bilde av middagen
            </label>
            <button
              onClick={handlePhotoUpload}
              className="w-full bg-green-600/20 border-2 border-dashed border-green-500/50 rounded-xl p-6 sm:p-8 lg:p-10 text-center hover:bg-green-600/30 transition-colors"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl mb-2">
                {hasPhoto ? '✅' : '📷'}
              </div>
              <div className="text-sm sm:text-base lg:text-lg text-white mb-1">
                {hasPhoto ? 'Bilde lastet opp!' : 'Trykk for å ta bilde'}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                eller velg fra galleri
              </div>
            </button>
          </div>

          {/* Points Preview */}
          <div className="bg-green-400/20 border border-green-400 rounded-xl p-4 sm:p-5 lg:p-6 mb-6 sm:mb-8 text-center">
            <div className="text-sm sm:text-base lg:text-lg text-green-300 mb-2">
              Estimerte poeng for dette oppdraget
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              35
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-gradient-to-br from-green-500/30 to-green-400/20 border border-green-400 rounded-2xl p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="text-base sm:text-lg lg:text-xl text-green-400 font-semibold mb-4 sm:mb-6 text-center">
              🌍 Miljøpåvirkning
            </div>
            <div className="flex justify-between mb-4 sm:mb-6">
              <div className="text-center flex-1">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-green-400 mb-1">
                  ~5 kg CO2
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-green-300">
                  spart med denne middagen
                </div>
              </div>
              <div className="text-center flex-1">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-green-400 mb-1">
                  10 kg CO2
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-green-300">
                  totalt spart denne måneden
                </div>
              </div>
            </div>
            
            {/* Monthly Goal */}
            <div className="bg-green-500/20 rounded-lg p-3 sm:p-4 lg:p-5 text-center">
              <div className="text-xs sm:text-sm lg:text-base text-green-400 mb-2 sm:mb-3 font-semibold">
                Månedens mål: 4 vegetarmiddager = ~20 kg CO2 spart
              </div>
              <div className="w-full h-2 sm:h-3 bg-green-500/20 rounded-full overflow-hidden mb-1 sm:mb-2">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-1/2 rounded-full"></div>
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-300">
                50% av målet nådd (2 av 4 middager)
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-br from-green-500 to-green-400 text-green-900 font-bold text-lg sm:text-xl lg:text-2xl py-4 sm:py-5 lg:py-6 rounded-2xl hover:from-green-400 hover:to-green-300 transition-all transform hover:scale-105"
          >
            🚀 SEND OPPDRAGSRAPPORT
          </button>
        </div>
      </div>
    </div>
  );
}