'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const router = useRouter();
  const { isCulturaCustomer, setIsCulturaCustomer } = useUser();
  const [displayName, setDisplayName] = useState('KlimaTiger');
  const [settings, setSettings] = useState({
    publicProfile: false,
    pushNotifications: true,
    culturaCustomer: isCulturaCustomer
  });

  const achievements = [
    { id: 'matmester', icon: '🥗', title: 'Matmester', earned: true },
    { id: 'trad-helt', icon: '🧵', title: 'Tråd-Helt', earned: true },
    { id: 'handleguru', icon: '🛒', title: 'Handleguru', earned: true },
    { id: 'visdoms-deler', icon: '🎓', title: 'Visdoms-Deler', earned: true },
    { id: 'streak-7', icon: '🔥', title: 'Streak 7', earned: false },
    { id: 'topp-10', icon: '👑', title: 'Topp 10', earned: false },
    { id: 'månedsvinner', icon: '🌟', title: 'Månedsvinner', earned: false },
    { id: 'diamant', icon: '💎', title: 'Diamant', earned: false }
  ];

  const [progressBars, setProgressBars] = useState([
    { id: 'monthly', title: 'Månedens mål', value: '6/8 oppdrag', percentage: 75 },
    { id: 'qualification', title: 'Trekning-kvalifisering', value: '190/145 poeng', percentage: 100 }
  ]);

  const getUserInitials = () => {
    return displayName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
  };

  const toggleSetting = (setting: string) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting as keyof typeof prev] };
      
      // Sync Cultura customer setting with context
      if (setting === 'culturaCustomer') {
        setIsCulturaCustomer(newSettings.culturaCustomer);
      }
      
      return newSettings;
    });
  };

  const editDisplayName = () => {
    const newName = prompt(
      'Velg ditt visningsnavn (3-20 tegn):\n\n• Kan være nickname, initialer eller fullt navn\n• Vil være synlig på ledertavlen\n• Kan endres når som helst',
      displayName
    );
    
    if (newName && newName.trim().length >= 3) {
      setDisplayName(newName.trim());
      alert('Visningsnavn oppdatert til: ' + newName.trim());
    } else if (newName !== null) {
      alert('Visningsnavnet må være minst 3 tegn langt.');
    }
  };

  const editContentSettings = () => {
    alert(
      'Åpner detaljerte innstillinger for innhold-deling:\n\n• Standard-samtykke for tips\n• Standard-samtykke for bilder\n• Mulighet til å trekke tilbake samtykke\n• Varsler når innhold brukes'
    );
  };

  const confirmDeleteAccount = () => {
    const confirmed = confirm(
      '⚠️ SLETTE KONTO OG DATA?\n\nDette vil permanent slette:\n• All din aktivitet og poeng\n• Dine 6 fullførte oppdrag\n• Alle bilder og tips du har delt\n• Din plass på ledertavlen\n\nDenne handlingen KAN IKKE angres!\n\nEr du sikker på at du vil fortsette?'
    );
    
    if (confirmed) {
      const doubleConfirm = confirm(
        '🚨 SISTE SJANSE!\n\nDu er i ferd med å slette:\n• 190 poeng\n• Agent #1247 status\n• Alle dine prestasjoner\n\nAlt vil være borte for alltid.\n\nTrykk OK for å slette kontoen din nå.'
      );
      
      if (doubleConfirm) {
        alert('Kontoen din slettes nå... Du vil bli logget ut om få sekunder.');
        setTimeout(() => {
          router.push('/register');
        }, 2000);
      }
    }
  };

  const navigateTo = (page: string) => {
    switch(page) {
      case 'home':
        router.push('/dashboard');
        break;
      case 'stats':
        alert('Navigerer til status-side...');
        break;
      case 'leaderboard':
        alert('Navigerer til ledertavle...');
        break;
      case 'profile':
        // Already on profile
        break;
    }
  };

  // Animate progress bars on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressBars(prev => prev.map(bar => ({ ...bar, percentage: bar.percentage })));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-green-900 to-green-700 text-white min-h-screen overflow-hidden relative flex flex-col">
      {/* Floating Elements */}
      <div className="absolute top-24 right-5 text-lg opacity-10 text-green-300 animate-bounce" style={{animationDelay: '0s'}}>👤</div>
      <div className="absolute top-72 left-5 text-lg opacity-10 text-green-300 animate-bounce" style={{animationDelay: '4s'}}>⚙️</div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 bg-black/20 text-center">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-300">
            👤 MIN PROFIL
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-green-600/40 to-green-500/20 border border-green-500 rounded-2xl p-5 sm:p-6 lg:p-8 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 border-4 border-green-400/30">
            {getUserInitials()}
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-2">
            {displayName}
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-green-200 mb-3">
            Agent #1247 • Medlem siden Jan 2025
          </div>
          <div className="inline-block bg-green-600/30 text-green-300 px-3 py-1 rounded-xl text-xs sm:text-sm lg:text-base font-semibold">
            🔒 Delvis privat
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="bg-green-600/20 border border-green-600/30 rounded-2xl p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-300 mb-1">190</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 uppercase tracking-wider">Poeng</div>
          </div>
          <div className="bg-green-600/20 border border-green-600/30 rounded-2xl p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">#18</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 uppercase tracking-wider">Plassering</div>
          </div>
          <div className="bg-green-600/20 border border-green-600/30 rounded-2xl p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-300 mb-1">6</div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 uppercase tracking-wider">Oppdrag</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-300 mb-3 sm:mb-4">
            🏆 Prestasjoner
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-green-600/20 border border-green-600/30 rounded-xl p-3 sm:p-4 text-center transition-all ${
                  achievement.earned
                    ? 'bg-green-600/40 border-green-500 transform scale-105'
                    : 'opacity-40'
                }`}
              >
                <div className="text-lg sm:text-xl lg:text-2xl mb-1">{achievement.icon}</div>
                <div className={`text-xs sm:text-sm lg:text-base font-semibold ${
                  achievement.earned ? 'text-green-300' : 'text-green-200'
                }`}>
                  {achievement.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-300 mb-3 sm:mb-4">
            📈 Fremgang
          </div>
          {progressBars.map((progress) => (
            <div key={progress.id} className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 mb-3 sm:mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-green-300">
                  {progress.title}
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                  {progress.value}
                </div>
              </div>
              <div className="w-full h-2 bg-green-600/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-300 mb-3 sm:mb-4">
            ⚙️ Innstillinger
          </div>
          
          {/* Display Name */}
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex-1">
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1">
                Visningsnavn
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Hvordan andre ser deg på ledertavlen
              </div>
            </div>
            <button
              onClick={editDisplayName}
              className="bg-green-600/30 border border-green-500 rounded-lg px-3 py-2 text-green-300 text-xs sm:text-sm lg:text-base hover:bg-green-600/50 transition-colors"
            >
              Rediger
            </button>
          </div>

          {/* Public Profile */}
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex-1">
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1">
                Offentlig profil
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Tillat andre å se din aktivitet og prestasjoner
              </div>
            </div>
            <button
              onClick={() => toggleSetting('publicProfile')}
              className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors relative ${
                settings.publicProfile ? 'bg-green-500' : 'bg-green-600/30'
              }`}
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-transform absolute top-0.5 ${
                  settings.publicProfile ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Push Notifications */}
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex-1">
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1">
                Push-varsler
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Få beskjed om nye oppdrag og trekning
              </div>
            </div>
            <button
              onClick={() => toggleSetting('pushNotifications')}
              className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors relative ${
                settings.pushNotifications ? 'bg-green-500' : 'bg-green-600/30'
              }`}
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-transform absolute top-0.5 ${
                  settings.pushNotifications ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Cultura Bank Customer */}
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex-1">
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1">
                Cultura Bank kunde
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Få 20 ekstra poeng per oppdrag
              </div>
            </div>
            <button
              onClick={() => toggleSetting('culturaCustomer')}
              className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors relative ${
                settings.culturaCustomer ? 'bg-green-500' : 'bg-green-600/30'
              }`}
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-transform absolute top-0.5 ${
                  settings.culturaCustomer ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* Content Settings */}
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex-1">
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1">
                Innhold-deling
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Standard-samtykke for bruk av dine bidrag
              </div>
            </div>
            <button
              onClick={editContentSettings}
              className="bg-green-600/30 border border-green-500 rounded-lg px-3 py-2 text-green-300 text-xs sm:text-sm lg:text-base hover:bg-green-600/50 transition-colors"
            >
              Innstillinger
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 bg-red-600/10 border border-red-500/30 rounded-xl p-4 sm:p-5">
          <div className="text-base sm:text-lg lg:text-xl font-semibold text-red-400 mb-2">
            ⚠️ Fareområde
          </div>
          <div className="text-xs sm:text-sm lg:text-base text-red-300 mb-3 leading-relaxed">
            Disse handlingene kan ikke angres. All din data vil bli permanent slettet.
          </div>
          <button
            onClick={confirmDeleteAccount}
            className="bg-red-600/20 border border-red-500 rounded-lg px-4 py-2 text-red-400 text-xs sm:text-sm lg:text-base hover:bg-red-600/30 transition-colors"
          >
            Slett konto og data
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] sm:h-[80px] lg:h-[90px] bg-black/80 backdrop-blur-sm flex justify-around items-center border-t border-green-500/20 rounded-t-3xl">
        <button
          onClick={() => navigateTo('home')}
          className="flex flex-col items-center text-green-300 p-2 sm:p-3 rounded-3xl hover:bg-green-500/20 transition-colors"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            🏠
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Senter</span>
        </button>
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
          onClick={() => navigateTo('leaderboard')}
          className="flex flex-col items-center text-green-300 p-2 sm:p-3 rounded-3xl hover:bg-green-500/20 transition-colors"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            🏆
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Ledere</span>
        </button>
        <div className="flex flex-col items-center text-white bg-green-500/30 p-2 sm:p-3 rounded-3xl">
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-green-500/20 rounded-full flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            👤
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Profil</span>
        </div>
      </div>
    </div>
  );
}