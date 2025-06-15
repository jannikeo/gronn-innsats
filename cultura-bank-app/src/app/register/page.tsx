'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [selectedCultura, setSelectedCultura] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    letter: false,
    number: false
  });

  const validateName = () => {
    const name = formData.fullName.trim();
    if (name.length < 2) {
      setFormErrors(prev => ({ ...prev, fullName: 'Navn må være minst 2 tegn' }));
      return false;
    } else {
      setFormErrors(prev => ({ ...prev, fullName: '' }));
      return true;
    }
  };

  const validateEmail = () => {
    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setFormErrors(prev => ({ ...prev, email: 'Ugyldig e-postadresse' }));
      return false;
    } else {
      setFormErrors(prev => ({ ...prev, email: '' }));
      return true;
    }
  };

  const validatePassword = (password: string) => {
    const newRequirements = {
      length: password.length >= 8,
      letter: /[a-zA-ZæøåÆØÅ]/.test(password),
      number: /[0-9]/.test(password)
    };
    
    setPasswordRequirements(newRequirements);
    
    return newRequirements.length && newRequirements.letter && newRequirements.number;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      validatePassword(value);
    }
  };

  const isFormValid = () => {
    return formData.fullName.trim().length >= 2 && 
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) && 
           passwordRequirements.length && 
           passwordRequirements.letter && 
           passwordRequirements.number &&
           termsAccepted;
  };

  const getCulturaStatusText = () => {
    switch(selectedCultura) {
      case 'customer': return 'Kunde (+20 poeng per oppdrag)';
      case 'interested': return 'Interessert i Cultura Bank';
      case 'none': return 'Kun miljøkonkurranse';
      default: return 'Ikke valgt';
    }
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert('Vennligst fyll ut alle påkrevde felt korrekt.');
      return;
    }
    
    const agentId = Math.floor(1000 + Math.random() * 9000);
    
    alert(`🎉 AGENT-KONTO OPPRETTET!\n\nDin Agent-ID: #${agentId}\nNavn: ${formData.fullName}\nE-post: ${formData.email}\nCultura-status: ${getCulturaStatusText()}\n\nNeste steg: Bekreft e-post og sett opp profil`);
    
    // Navigate to dashboard after successful registration
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const showTerms = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('Vilkår for Operasjon Grønn Innsats:\n\n• Ærlig rapportering av miljøoppdrag\n• Respektfull oppførsel i konkurranser\n• Ingen manipulering av poengberegning\n• Cultura Bank forbeholder seg retten til å moderere innhold\n• Trekninger er endelige og kan ikke ankes');
  };

  const showPrivacy = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('Personvernregler (GDPR-kompatibel):\n\n• Vi samler kun nødvendig informasjon\n• Data deles ikke med tredjeparter\n• Du kan slette kontoen når som helst\n• Bilder og tips kan brukes i markedsføring (med samtykke)\n• Se fullstendig personvernerklæring på cultura.no/personvern');
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
          <Link href="/welcome" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center text-green-300 text-lg sm:text-xl lg:text-2xl hover:bg-green-500/30 transition-colors">
            ←
          </Link>
          <div className="flex-1 text-center text-lg sm:text-xl lg:text-2xl font-semibold text-green-300">
            OPPRETT AGENT-KONTO
          </div>
          <div className="w-10 sm:w-12 lg:w-14"></div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 my-5 sm:my-6">
          <div className={`w-3 h-3 rounded-full transition-all ${currentStep >= 1 ? 'bg-green-400' : 'bg-green-600/30'}`}></div>
          <div className={`w-3 h-3 rounded-full transition-all ${currentStep >= 2 ? 'bg-green-400' : 'bg-green-600/30'}`}></div>
          <div className={`w-3 h-3 rounded-full transition-all ${currentStep >= 3 ? 'bg-green-400' : 'bg-green-600/30'}`}></div>
        </div>

        {/* Form Container */}
        <div className="px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-300 mb-2">
              Bli en miljøagent!
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-green-200">
              Opprett din Agent-ID og begynn å gjøre en forskjell
            </div>
          </div>

          {/* Name Field */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-sm sm:text-base lg:text-lg font-semibold text-green-300 mb-2">
              Fullt navn <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              onBlur={validateName}
              className={`w-full bg-green-600/20 border ${formErrors.fullName ? 'border-red-500 bg-red-500/10' : 'border-green-600/30'} rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg placeholder-green-200 focus:outline-none focus:border-green-500 focus:bg-green-600/30 transition-colors`}
              placeholder="Ola Nordmann"
            />
            {formErrors.fullName && (
              <div className="text-red-400 text-xs sm:text-sm mt-2">{formErrors.fullName}</div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-sm sm:text-base lg:text-lg font-semibold text-green-300 mb-2">
              E-postadresse <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={validateEmail}
              className={`w-full bg-green-600/20 border ${formErrors.email ? 'border-red-500 bg-red-500/10' : 'border-green-600/30'} rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg placeholder-green-200 focus:outline-none focus:border-green-500 focus:bg-green-600/30 transition-colors`}
              placeholder="ola@example.com"
            />
            {formErrors.email && (
              <div className="text-red-400 text-xs sm:text-sm mt-2">{formErrors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-sm sm:text-base lg:text-lg font-semibold text-green-300 mb-2">
              Opprett passord <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 text-white text-sm sm:text-base lg:text-lg placeholder-green-200 focus:outline-none focus:border-green-500 focus:bg-green-600/30 transition-colors"
              placeholder="Minimum 8 tegn"
            />
            
            {/* Password Requirements */}
            <div className="bg-green-600/10 border border-green-600/20 rounded-xl p-3 sm:p-4 mt-2">
              <div className={`flex items-center mb-1 text-xs sm:text-sm ${passwordRequirements.length ? 'text-green-400' : 'text-green-200'}`}>
                <span className="mr-2">{passwordRequirements.length ? '✓' : '○'}</span>
                Minst 8 tegn
              </div>
              <div className={`flex items-center mb-1 text-xs sm:text-sm ${passwordRequirements.letter ? 'text-green-400' : 'text-green-200'}`}>
                <span className="mr-2">{passwordRequirements.letter ? '✓' : '○'}</span>
                Minst én bokstav
              </div>
              <div className={`flex items-center text-xs sm:text-sm ${passwordRequirements.number ? 'text-green-400' : 'text-green-200'}`}>
                <span className="mr-2">{passwordRequirements.number ? '✓' : '○'}</span>
                Minst ett tall
              </div>
            </div>
          </div>

          {/* Cultura Bank Section */}
          <div className="bg-gradient-to-br from-green-600/40 to-green-500/20 border border-green-500 rounded-2xl p-5 sm:p-6 lg:p-8 mb-5 sm:mb-6">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center text-xl sm:text-2xl mr-3 sm:mr-4">
                🏦
              </div>
              <div>
                <div className="text-base sm:text-lg lg:text-xl font-semibold text-green-300">
                  Cultura Bank-kobling
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-green-200">
                  Valgfritt, men gir bonuspoeng
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => setSelectedCultura('customer')}
                className={`w-full p-4 sm:p-5 rounded-xl flex items-center transition-all border ${
                  selectedCultura === 'customer'
                    ? 'bg-green-600/30 border-green-500'
                    : 'bg-green-600/20 border-green-600/30 hover:bg-green-600/25'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 border-green-400 mr-3 sm:mr-4 flex items-center justify-center ${
                  selectedCultura === 'customer' ? 'bg-green-400' : ''
                }`}>
                  {selectedCultura === 'customer' && (
                    <div className="w-2 h-2 bg-green-900 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                    Jeg er Cultura Bank-kunde
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-200">
                    Få 20 ekstra poeng per oppdrag
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-xs sm:text-sm font-bold">
                  +20 per oppdrag
                </div>
              </button>

              <button
                onClick={() => setSelectedCultura('interested')}
                className={`w-full p-4 sm:p-5 rounded-xl flex items-center transition-all border ${
                  selectedCultura === 'interested'
                    ? 'bg-green-600/30 border-green-500'
                    : 'bg-green-600/20 border-green-600/30 hover:bg-green-600/25'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 border-green-400 mr-3 sm:mr-4 flex items-center justify-center ${
                  selectedCultura === 'interested' ? 'bg-green-400' : ''
                }`}>
                  {selectedCultura === 'interested' && (
                    <div className="w-2 h-2 bg-green-900 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                    Jeg vurderer Cultura Bank
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-200">
                    Få tilgang til spesialtilbud
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedCultura('none')}
                className={`w-full p-4 sm:p-5 rounded-xl flex items-center transition-all border ${
                  selectedCultura === 'none'
                    ? 'bg-green-600/30 border-green-500'
                    : 'bg-green-600/20 border-green-600/30 hover:bg-green-600/25'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 border-green-400 mr-3 sm:mr-4 flex items-center justify-center ${
                  selectedCultura === 'none' ? 'bg-green-400' : ''
                }`}>
                  {selectedCultura === 'none' && (
                    <div className="w-2 h-2 bg-green-900 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                    Kun miljøkonkurranse
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-200">
                    Delta uten bankforbindelse
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Terms and Marketing */}
          <div className="mb-5 sm:mb-6 space-y-3 sm:space-y-4">
            <label className="flex items-start cursor-pointer">
              <div
                onClick={() => setTermsAccepted(!termsAccepted)}
                className={`w-5 h-5 rounded border-2 border-green-400 mr-3 sm:mr-4 mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${
                  termsAccepted ? 'bg-green-400' : ''
                }`}
              >
                {termsAccepted && <span className="text-green-900 text-sm">✓</span>}
              </div>
              <span className="text-xs sm:text-sm lg:text-base text-white leading-relaxed">
                Jeg godtar{' '}
                <button onClick={showTerms} className="text-green-300 underline">
                  vilkårene
                </button>
                {' '}og{' '}
                <button onClick={showPrivacy} className="text-green-300 underline">
                  personvernreglene
                </button>
                {' '}for Operasjon Grønn Innsats
              </span>
            </label>

            <label className="flex items-start cursor-pointer">
              <div
                onClick={() => setMarketingAccepted(!marketingAccepted)}
                className={`w-5 h-5 rounded border-2 border-green-400 mr-3 sm:mr-4 mt-0.5 flex items-center justify-center flex-shrink-0 transition-all ${
                  marketingAccepted ? 'bg-green-400' : ''
                }`}
              >
                {marketingAccepted && <span className="text-green-900 text-sm">✓</span>}
              </div>
              <span className="text-xs sm:text-sm lg:text-base text-white leading-relaxed">
                Jeg ønsker å motta e-post om nye oppdrag og konkurranser (valgfritt)
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="w-full bg-gradient-to-br from-green-500 to-green-400 disabled:from-green-600/50 disabled:to-green-500/50 text-green-900 disabled:text-green-700 font-bold text-lg sm:text-xl lg:text-2xl py-4 sm:py-5 lg:py-6 rounded-2xl transition-all transform hover:scale-105 hover:-translate-y-1 disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:cursor-not-allowed shadow-lg shadow-green-500/40"
          >
            🚀 OPPRETT AGENT-KONTO
          </button>
        </div>
      </div>
    </div>
  );
}