'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LeaderboardUser {
  rank: number;
  name: string;
  displayName: string;
  points: number;
  badges: string[];
  isCurrentUser?: boolean;
  agentId?: number;
}

export default function Leaderboard() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('Januar');
  const [animatePodium, setAnimatePodium] = useState(false);

  const periods = ['Desember', 'Januar', 'Februar'];

  // Sample leaderboard data
  const topThree: LeaderboardUser[] = [
    { rank: 2, name: 'Lars Hansen', displayName: 'LH', points: 285, badges: ['Reparatør', 'Cultura'] },
    { rank: 1, name: 'Maria Nordahl', displayName: 'MN', points: 320, badges: ['Matmester', 'Cultura'] },
    { rank: 3, name: 'Kari Solberg', displayName: 'KS', points: 270, badges: ['Handleguru'] }
  ];

  const remainingUsers: LeaderboardUser[] = [
    { rank: 4, name: 'Ola Eriksen', displayName: 'OE', points: 245, badges: ['Reparatør', 'Cultura'] },
    { rank: 5, name: 'Emma Johansen', displayName: 'EJ', points: 230, badges: ['Matmester'] },
    { rank: 6, name: 'Thomas Lie', displayName: 'TL', points: 215, badges: ['Kunnskaps-agent', 'Cultura'] },
    { rank: 18, name: 'Du (Agent #1247)', displayName: 'KJ', points: 190, badges: ['Kunnskaps-agent', 'Cultura'], isCurrentUser: true, agentId: 1247 },
    { rank: 19, name: 'Anne Bakken', displayName: 'AB', points: 185, badges: ['Handleguru'] },
    { rank: 78, name: 'Per Moen', displayName: 'PM', points: 145, badges: ['Nybegynner'] }
  ];

  const stats = {
    activeAgents: 156,
    inDrawing: 78,
    totalMissions: 892
  };

  const getUserInitials = (displayName: string) => {
    return displayName || 'NA';
  };

  const getPodiumOrder = (rank: number) => {
    if (rank === 1) return 'order-2 scale-110';
    if (rank === 2) return 'order-1 scale-95';
    if (rank === 3) return 'order-3 scale-95';
    return '';
  };

  const getPodiumColors = (rank: number) => {
    if (rank === 1) return {
      gradient: 'from-yellow-500 to-orange-500',
      shadow: 'shadow-yellow-500/50',
      textColor: 'text-yellow-500',
      rankColor: 'text-yellow-500'
    };
    if (rank === 2) return {
      gradient: 'from-gray-400 to-gray-500',
      shadow: 'shadow-gray-400/30',
      textColor: 'text-gray-400',
      rankColor: 'text-gray-400'
    };
    if (rank === 3) return {
      gradient: 'from-amber-600 to-amber-700',
      shadow: 'shadow-amber-600/30',
      textColor: 'text-amber-600',
      rankColor: 'text-amber-600'
    };
    return {
      gradient: 'from-green-500 to-green-400',
      shadow: 'shadow-green-500/30',
      textColor: 'text-green-400',
      rankColor: 'text-green-400'
    };
  };

  const navigateTo = (page: string) => {
    switch(page) {
      case 'home':
        router.push('/dashboard');
        break;
      case 'stats':
        alert('Navigerer til din personlige status og statistikk...');
        break;
      case 'leaderboard':
        // Already on leaderboard
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatePodium(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-green-900 to-green-700 text-white min-h-screen overflow-hidden relative flex flex-col">
      {/* Floating Elements */}
      <div className="absolute top-24 left-5 text-xl opacity-10 text-green-400 animate-bounce" style={{animationDelay: '0s', animationDuration: '8s'}}>🏆</div>
      <div className="absolute top-52 right-5 text-xl opacity-10 text-green-400 animate-bounce" style={{animationDelay: '3s', animationDuration: '8s'}}>🎖️</div>
      <div className="absolute top-96 left-8 text-xl opacity-10 text-green-400 animate-bounce" style={{animationDelay: '6s', animationDuration: '8s'}}>⭐</div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 bg-black/20 text-center">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-300 mb-2" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
            🏆 LEDERTAVLE
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-green-200">
            Månedlige toppagenter
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="flex justify-center gap-2 sm:gap-3 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 sm:px-5 lg:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-green-600/40 border border-green-500 text-white font-semibold'
                  : 'bg-green-600/20 border border-green-600/30 text-green-200 hover:bg-green-600/30'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Top Three Podium */}
        <div className="flex justify-center items-end gap-4 sm:gap-6 lg:gap-8 px-5 sm:px-6 lg:px-8 my-6 sm:my-8">
          {topThree.map((user) => {
            const colors = getPodiumColors(user.rank);
            return (
              <div
                key={user.rank}
                className={`text-center transition-all duration-500 ${getPodiumOrder(user.rank)} ${
                  animatePodium ? 'transform' : ''
                }`}
              >
                {user.rank === 1 && (
                  <div className="text-2xl sm:text-3xl mb-2 animate-bounce">👑</div>
                )}
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 ${colors.rankColor}`}>
                  #{user.rank}
                </div>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${colors.gradient} ${colors.shadow} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl font-bold text-green-900 shadow-lg`}>
                  {getUserInitials(user.displayName)}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-green-300 font-semibold mb-1">
                  {user.name}
                </div>
                <div className="text-sm sm:text-base lg:text-lg text-white font-bold">
                  {user.points} poeng
                </div>
              </div>
            );
          })}
        </div>

        {/* Threshold Info */}
        <div className="bg-gradient-to-br from-green-600/40 to-green-500/20 border border-green-500 rounded-2xl p-4 sm:p-5 lg:p-6 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center">
          <div className="text-base sm:text-lg lg:text-xl font-semibold text-green-300 mb-2">
            🎯 Trekning kvalifisering
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-green-200 leading-relaxed">
            Topp 78 agenter (50%) kvalifiserer for månedens trekning.<br />
            Minimumscore: <span className="font-bold text-white">145 poeng</span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="bg-green-600/15 border border-green-600/20 rounded-xl p-3 sm:p-4 lg:p-5 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 flex justify-around text-center">
          <div className="flex-1">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
              {stats.activeAgents}
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 mt-1">
              Aktive agenter
            </div>
          </div>
          <div className="flex-1">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
              {stats.inDrawing}
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 mt-1">
              I trekning
            </div>
          </div>
          <div className="flex-1">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
              {stats.totalMissions}
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-green-200 mt-1">
              Totale oppdrag
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="px-5 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
          {remainingUsers.map((user) => (
            <div
              key={user.rank}
              className={`bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 flex items-center transition-all relative ${
                user.isCurrentUser 
                  ? 'bg-green-600/30 border-green-500 transform translate-x-1 sm:translate-x-2' 
                  : user.rank <= 10 
                    ? 'border-green-500/50' 
                    : ''
              }`}
            >
              {user.isCurrentUser && (
                <div className="absolute -left-3 text-base sm:text-lg">👤</div>
              )}
              
              <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm sm:text-base lg:text-lg font-bold mr-3 sm:mr-4 ${
                user.rank <= 10
                  ? 'bg-gradient-to-br from-green-500 to-green-400 text-green-900'
                  : 'bg-green-600/30 text-white'
              }`}>
                {user.rank}
              </div>

              <div className="flex-1">
                <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1">
                  {user.name}
                </div>
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  {user.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-green-600/30 text-green-300 px-2 py-1 rounded-lg text-xs sm:text-sm font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
                  {user.points}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-green-200">
                  {user.rank === 78 ? 'poeng (grense)' : 'poeng'}
                </div>
              </div>
            </div>
          ))}
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
        <div className="flex flex-col items-center text-white bg-green-500/30 p-2 sm:p-3 rounded-3xl">
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-green-500/20 rounded-full flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            🏆
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Ledere</span>
        </div>
        <button
          onClick={() => navigateTo('profile')}
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