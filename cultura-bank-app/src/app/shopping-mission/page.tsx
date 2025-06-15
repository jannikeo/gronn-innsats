'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function ShoppingMission() {
  const router = useRouter();
  const { isCulturaCustomer, monthlyBonusPoints } = useUser();
  const [selectedStore, setSelectedStore] = useState('');
  const [customStore, setCustomStore] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [customProducts, setCustomProducts] = useState('');
  const [tips, setTips] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [localProducts, setLocalProducts] = useState(false);
  const [lessPlastic, setLessPlastic] = useState(false);

  const stores = [
    { id: 'rema', icon: '🛍️', name: 'Rema 1000' },
    { id: 'ica', icon: '🛒', name: 'ICA' },
    { id: 'coop', icon: '🌱', name: 'Coop' },
    { id: 'meny', icon: '🥬', name: 'Meny' },
    { id: 'kiwi', icon: '🥝', name: 'Kiwi' },
    { id: 'annet', icon: '📍', name: 'Annet' }
  ];

  const predefinedProducts = [
    { id: 'epler', icon: '🍎', name: 'Økologiske epler' },
    { id: 'melk', icon: '🥛', name: 'Økologisk melk' },
    { id: 'brød', icon: '🍞', name: 'Økologisk brød' },
    { id: 'tomater', icon: '🍅', name: 'Økologiske tomater' },
    { id: 'gulrøtter', icon: '🥕', name: 'Økologiske gulrøtter' },
    { id: 'kjøtt', icon: '🥩', name: 'Økologisk kjøtt' },
    { id: 'egg', icon: '🥚', name: 'Økologiske egg' },
    { id: 'pasta', icon: '🍝', name: 'Økologisk pasta' }
  ];

  // Parse custom products
  const parseCustomProducts = () => {
    if (!customProducts.trim()) return [];
    return customProducts
      .split(/[,\n]/)
      .map(product => product.trim())
      .filter(product => product.length > 0);
  };

  // Calculate total products
  const getTotalProductCount = () => {
    return selectedProducts.size + parseCustomProducts().length;
  };

  // Calculate points
  const calculatePoints = () => {
    let points = 15; // Base (10) + January bonus (5)
    const breakdown = ['Grunnoppdrag (10)', 'Januar-bonus (5)'];

    // Add monthly Cultura customer bonus
    if (isCulturaCustomer) {
      points += monthlyBonusPoints;
      breakdown.push(`Cultura-kunde månedlig bonus (${monthlyBonusPoints})`);
    }

    // Bonus for 5+ products
    if (getTotalProductCount() >= 5) {
      points += 5;
      breakdown.push('5+ produkter (5)');
    }

    if (hasPhoto) {
      points += 10;
      breakdown.push('Dokumentasjon (10)');
    }

    if (tips.length > 10) {
      points += 10;
      breakdown.push('Tips (10)');
    }

    if (localProducts) {
      points += 5;
      breakdown.push('Lokalt (5)');
    }

    if (lessPlastic) {
      points += 5;
      breakdown.push('Egen pose (5)');
    }

    return { points, breakdown: breakdown.join(' + ') };
  };

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handlePhotoUpload = () => {
    alert('📷 Foto-funksjon kommer snart!');
    setHasPhoto(true);
  };

  const handleSubmit = () => {
    if (!selectedStore) {
      alert('Vennligst velg hvor du handlet.');
      return;
    }

    if (getTotalProductCount() < 5) {
      alert('Du må registrere minst 5 økologiske produkter. Kryss av for produkter eller skriv inn egne i tekstfeltet.');
      return;
    }

    const { points, breakdown } = calculatePoints();
    const allProducts = [
      ...Array.from(selectedProducts),
      ...parseCustomProducts()
    ].join(', ');

    const params = new URLSearchParams({
      type: 'shopping',
      store: selectedStore === 'annet' ? customStore : selectedStore,
      products: allProducts,
      tips: tips,
      hasPhoto: hasPhoto.toString(),
      points: points.toString(),
      breakdown: breakdown
    });

    router.push(`/mission-complete?${params.toString()}`);
  };

  const { points, breakdown } = calculatePoints();
  const totalProductCount = getTotalProductCount();

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-900 to-blue-700 text-white min-h-screen overflow-hidden relative flex flex-col">
      {/* Floating Shopping Icons */}
      <div className="absolute top-8 right-8 text-lg opacity-20 text-blue-300 animate-bounce" style={{animationDelay: '0s'}}>🛒</div>
      <div className="absolute top-20 left-6 text-lg opacity-20 text-blue-300 animate-bounce" style={{animationDelay: '2s'}}>🥕</div>
      <div className="absolute bottom-52 right-6 text-lg opacity-20 text-blue-300 animate-bounce" style={{animationDelay: '4s'}}>📋</div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 bg-black/30 flex items-center justify-between">
          <Link href="/dashboard" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-blue-500/20 border border-blue-500 rounded-full flex items-center justify-center text-blue-300 text-lg sm:text-xl lg:text-2xl hover:bg-blue-500/30 transition-colors">
            ←
          </Link>
          <div className="flex-1 text-center text-lg sm:text-xl lg:text-2xl font-semibold text-blue-300">
            OPPDRAGSRAPPORT
          </div>
          <div className="w-10 sm:w-12 lg:w-14"></div>
        </div>

        {/* Mission Header */}
        <div className="bg-gradient-to-br from-blue-600/30 to-blue-500/20 border border-blue-500 rounded-2xl p-5 sm:p-6 lg:p-8 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
          
          <div className="w-15 h-15 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl sm:text-4xl lg:text-5xl shadow-lg shadow-blue-500/40 relative z-10">
            🛒
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 relative z-10">
            Økologisk Handlerunde
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-blue-200 mb-3 relative z-10">
            Grunnoppdrag: 10 poeng
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-blue-900 px-3 py-1 rounded-xl text-xs sm:text-sm lg:text-base font-semibold inline-block relative z-10">
            +5 Januar-bonus
          </div>
        </div>

        {/* Form Container */}
        <div className="px-5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Store Selection */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">🏪</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-blue-300 flex-1">
                Hvor handlet du?
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-blue-200 bg-blue-600/20 px-2 py-1 rounded-lg">
                Påkrevd
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(store.id)}
                  className={`p-3 sm:p-4 rounded-xl text-xs sm:text-sm lg:text-base text-center transition-all border ${
                    selectedStore === store.id
                      ? 'bg-blue-600/30 border-blue-500 text-white'
                      : 'bg-blue-600/15 border-blue-600/30 text-blue-200 hover:bg-blue-600/25'
                  }`}
                >
                  <div className="text-lg sm:text-xl mb-1">{store.icon}</div>
                  {store.name}
                </button>
              ))}
            </div>
            {selectedStore === 'annet' && (
              <input
                type="text"
                value={customStore}
                onChange={(e) => setCustomStore(e.target.value)}
                className="w-full mt-3 bg-blue-600/15 border border-blue-600/30 rounded-xl p-4 text-white text-sm sm:text-base lg:text-lg placeholder-blue-200 focus:outline-none focus:border-blue-500 focus:bg-blue-600/25 transition-colors"
                placeholder="Spesifiser butikk..."
              />
            )}
          </div>

          {/* Product Selection */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">📝</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-blue-300 flex-1">
                Dine økologiske produkter
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-blue-200 bg-blue-600/20 px-2 py-1 rounded-lg">
                Min. 5 produkter
              </span>
            </div>
            
            {/* Predefined Products */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              {predefinedProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`p-3 sm:p-4 rounded-xl text-xs sm:text-sm lg:text-base text-center transition-all border ${
                    selectedProducts.has(product.id)
                      ? 'bg-blue-600/30 border-blue-500 text-white font-semibold'
                      : 'bg-blue-600/15 border-blue-600/30 text-blue-200 hover:bg-blue-600/25'
                  }`}
                >
                  <div className="text-base sm:text-lg mb-1">{product.icon}</div>
                  {product.name}
                </button>
              ))}
            </div>

            {/* Custom Products */}
            <textarea
              value={customProducts}
              onChange={(e) => setCustomProducts(e.target.value)}
              className="w-full bg-blue-600/15 border border-blue-600/30 rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg min-h-[80px] sm:min-h-[100px] placeholder-blue-200 resize-none focus:outline-none focus:border-blue-500 focus:bg-blue-600/25 transition-colors"
              placeholder="Andre økologiske produkter du kjøpte (skriv ett per linje eller skill med komma)..."
            />

            {/* Product Counter */}
            <div className="bg-green-600/20 border border-green-500 rounded-xl p-3 sm:p-4 mt-3 text-center">
              <div className="text-xs sm:text-sm lg:text-base text-green-300 mb-1">
                Økologiske produkter registrert
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
                {totalProductCount} / 5
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">📸</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-blue-300 flex-1">
                Kvittering eller handlekurv
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-blue-200 bg-blue-600/20 px-2 py-1 rounded-lg">
                +10 poeng
              </span>
            </div>
            <button
              onClick={handlePhotoUpload}
              className="w-full bg-blue-600/15 border-2 border-dashed border-blue-600/50 rounded-xl p-8 sm:p-10 lg:p-12 text-center hover:bg-blue-600/25 hover:border-blue-500 transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 opacity-80 text-blue-500">
                {hasPhoto ? '✅' : '📄'}
              </div>
              <div className="text-base sm:text-lg lg:text-xl text-blue-300 font-semibold mb-2">
                {hasPhoto ? 'Dokumentasjon lastet opp!' : 'Dokumenter ditt økologiske kjøp'}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-blue-200">
                Kvittering, handlekurv eller matvarene
              </div>
            </button>
          </div>

          {/* Tips */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">💡</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-blue-300 flex-1">
                Del dine tips
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-blue-200 bg-blue-600/20 px-2 py-1 rounded-lg">
                +10 poeng
              </span>
            </div>
            <textarea
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              className="w-full bg-blue-600/15 border border-blue-600/30 rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg min-h-[120px] sm:min-h-[140px] placeholder-blue-200 resize-none focus:outline-none focus:border-blue-500 focus:bg-blue-600/25 transition-colors"
              placeholder="Hvor finner du gode økologiske produkter? Tips til andre handlende..."
            />
          </div>

          {/* Bonus Checkboxes */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-lg mr-2">🌱</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-blue-300">
                Bonus-oppdrag
              </span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <label className="flex items-center cursor-pointer">
                <div
                  onClick={() => setLocalProducts(!localProducts)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all ${
                    localProducts
                      ? 'bg-blue-500 border-blue-500 text-blue-900'
                      : 'bg-blue-600/15 border-blue-600/50'
                  }`}
                >
                  {localProducts && '✓'}
                </div>
                <span className="text-sm sm:text-base lg:text-lg text-white">
                  Kjøpte lokale produkter (+5 poeng)
                </span>
              </label>

              <label className="flex items-center cursor-pointer">
                <div
                  onClick={() => setLessPlastic(!lessPlastic)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 mr-3 sm:mr-4 flex items-center justify-center transition-all ${
                    lessPlastic
                      ? 'bg-blue-500 border-blue-500 text-blue-900'
                      : 'bg-blue-600/15 border-blue-600/50'
                  }`}
                >
                  {lessPlastic && '✓'}
                </div>
                <span className="text-sm sm:text-base lg:text-lg text-white">
                  Hadde med egen pose (+5 poeng)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Points Preview */}
        <div className="bg-blue-600/20 border border-blue-500 rounded-xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center">
          <div className="text-sm sm:text-base lg:text-lg text-blue-300 mb-2">
            Estimerte poeng for dette oppdraget
          </div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            {points}
          </div>
          <div className="text-xs sm:text-sm lg:text-base text-blue-200">
            {breakdown}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-5 sm:px-6 lg:px-8 pb-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-br from-blue-500 to-blue-400 text-blue-900 font-bold text-lg sm:text-xl lg:text-2xl py-4 sm:py-5 lg:py-6 rounded-2xl hover:from-blue-400 hover:to-blue-300 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-blue-500/40"
          >
            🛒 SEND HANDLINGSRAPPORT
          </button>
        </div>
      </div>
    </div>
  );
}