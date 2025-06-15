'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ActivityItem {
  type: 'food' | 'tips' | 'repair' | 'shopping';
  title: string;
  description: string;
  points: number;
  icon: string;
}

interface GoalItem {
  title: string;
  current: number;
  target: number;
  unit: string;
  reward: string;
  completed: boolean;
}

export default function Status() {
  const router = useRouter();
  const [progressAnimated, setProgressAnimated] = useState(false);
  const [chartAnimated, setChartAnimated] = useState(false);

  const currentMonth = 'Januar';
  const currentYear = '2025';
  const agentId = 1247;
  const currentRank = 18;
  const monthlyPoints = 190;
  const isQualified = true;
  const missionsCompleted = 6;
  const totalMissions = 8;
  const streak = 5;

  // Weekly data for January chart
  const weeklyData = [
    { week: 'Uke 1', points: 15, height: 20 },
    { week: 'Uke 2', points: 35, height: 40 },
    { week: 'Uke 3', points: 25, height: 30 },
    { week: 'Uke 4', points: 45, height: 55 },
    { week: 'Uke 5', points: 30, height: 35 },
    { week: 'Uke 6', points: 60, height: 75 },
    { week: 'Uke 7', points: 35, height: 45 }
  ];

  // Monthly data for year chart
  const monthlyData = [
    { month: 'Jan', points: 190, height: 90 },
    { month: 'Feb', points: 0, height: 0 },
    { month: 'Mar', points: 0, height: 0 },
    { month: 'Apr', points: 0, height: 0 },
    { month: 'Mai', points: 0, height: 0 },
    { month: 'Jun', points: 0, height: 0 },
    { month: 'Jul', points: 0, height: 0 },
    { month: 'Aug', points: 0, height: 0 },
    { month: 'Sep', points: 0, height: 0 },
    { month: 'Okt', points: 0, height: 0 },
    { month: 'Nov', points: 0, height: 0 },
    { month: 'Des', points: 0, height: 0 }
  ];

  const goals: GoalItem[] = [
    {
      title: 'Månedens 8 oppdrag',
      current: 6,
      target: 8,
      unit: 'fullført',
      reward: '🏆 Bonus: 50 poeng ved fullføring',
      completed: false
    },
    {
      title: 'Januar trekning-kvalifisering',
      current: 190,
      target: 145,
      unit: 'poeng',
      reward: '✅ Kvalifisert for januar-trekning!',
      completed: true
    },
    {
      title: 'Topp 10 i januar',
      current: 190,
      target: 235,
      unit: 'poeng til',
      reward: '🥇 Topp 10 prestasjon + spesiell badge',
      completed: false
    }
  ];

  const recentActivity: ActivityItem[] = [
    {
      type: 'tips',
      title: 'Miljøtips delt',
      description: 'Energisparing: "Slå av ladere..."',
      points: 45,
      icon: '💡'
    },
    {
      type: 'shopping',
      title: 'Økologisk handel',
      description: '7 produkter registrert på Coop',
      points: 35,
      icon: '🛒'
    },
    {
      type: 'repair',
      title: 'Klær reparert',
      description: 'Sys hull i favorittkjolen',
      points: 40,
      icon: '🔧'
    },
    {
      type: 'food',
      title: 'Vegetar middag',
      description: 'Hjemmelaget pasta med grønnsaker',
      points: 30,
      icon: '🥗'
    }
  ];

  const getActivityColors = (type: string) => {
    switch (type) {
      case 'food':
        return 'from-green-500 to-green-400';
      case 'tips':
        return 'from-yellow-500 to-yellow-400';
      case 'repair':
        return 'from-orange-500 to-orange-400';
      case 'shopping':
        return 'from-blue-500 to-blue-400';
      default:
        return 'from-green-500 to-green-400';
    }
  };

  const getGoalProgress = (goal: GoalItem) => {
    if (goal.completed) return 100;
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const navigateTo = (page: string) => {
    switch(page) {
      case 'home':
        router.push('/dashboard');
        break;
      case 'stats':
        // Already on stats
        break;
      case 'leaderboard':
        router.push('/leaderboard');
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgressAnimated(true);
    }, 1000);

    const chartTimer = setTimeout(() => {
      setChartAnimated(true);
    }, 1500);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(chartTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-green-900 to-green-700 text-white min-h-screen overflow-hidden relative flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Status Bar */}
        <div className="h-11 sm:h-12 flex justify-between items-center px-5 sm:px-6 text-sm sm:text-base font-semibold">
          <span>9:41</span>
          <span>🔋 100%</span>
        </div>

        {/* Header */}
        <div className="p-5 sm:p-6 lg:p-8 bg-black/20 text-center">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-300 mb-2" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
            📊 DIN STATUS
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-green-200">
            Agent #{agentId} • KlimaTiger
          </div>
        </div>

        {/* Current Status Ring */}
        <div className="bg-gradient-to-br from-green-600/40 to-green-500/20 border border-green-500 rounded-2xl p-5 sm:p-6 lg:p-8 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6 text-center">
          <div className="flex items-center justify-center mb-4 sm:mb-5">
            <span className="text-xl sm:text-2xl mr-2">📅</span>
            <span className="text-base sm:text-lg lg:text-xl font-semibold text-green-300">
              {currentMonth} {currentYear} - Månedens status
            </span>
          </div>
          
          {/* Status Ring */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto mb-4 sm:mb-5">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#8fbc8f 0deg 270deg, rgba(90, 154, 90, 0.2) 270deg 360deg)`
              }}
            ></div>
            <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-green-900 to-green-700 rounded-full flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-500">
                #{currentRank}
              </div>
              <div className="text-xs sm:text-sm text-green-200 uppercase tracking-wider">
                Plassering
              </div>
            </div>
          </div>

          {/* Status Details */}
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
                {monthlyPoints}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Poeng jan
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
                {isQualified ? '✅' : '❌'}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Kvalifisert
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400">
                {missionsCompleted}/{totalMissions}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-green-200">
                Oppdrag
              </div>
            </div>
          </div>
        </div>

        {/* Total Status */}
        <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-5 sm:p-6 lg:p-8 mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="flex items-center mb-4 sm:mb-5">
            <span className="text-xl sm:text-2xl mr-2">🏆</span>
            <span className="text-base sm:text-lg lg:text-xl font-semibold text-green-300">
              Hele perioden ({currentYear})
            </span>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-green-600/20">
              <span className="text-sm sm:text-base lg:text-lg text-green-200">
                Hittil i år, poeng totalt:
              </span>
              <span className="text-sm sm:text-base lg:text-lg text-green-400 font-semibold">
                {monthlyPoints}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-green-600/20">
              <span className="text-sm sm:text-base lg:text-lg text-green-200">
                Oppdrag fullført:
              </span>
              <span className="text-sm sm:text-base lg:text-lg text-green-400 font-semibold">
                {missionsCompleted} av 96 mulige
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-green-600/20">
              <span className="text-sm sm:text-base lg:text-lg text-green-200">
                Beste månedsplassering:
              </span>
              <span className="text-sm sm:text-base lg:text-lg text-green-400 font-semibold">
                #{currentRank} ({currentMonth.toLowerCase()})
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm sm:text-base lg:text-lg text-green-200">
                Kvalifisert for trekninger:
              </span>
              <span className="text-sm sm:text-base lg:text-lg text-green-400 font-semibold">
                1 av 12 måneder
              </span>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl mr-2">🎯</span>
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-green-300">
                {currentMonth}-mål
              </span>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-xl text-xs sm:text-sm lg:text-base font-bold">
              🔥 {streak} dager
            </div>
          </div>

          {goals.map((goal, index) => (
            <div key={index} className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 sm:p-5 lg:p-6 mb-3 sm:mb-4">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-green-300">
                  {goal.title}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-green-200">
                  {goal.completed 
                    ? `${goal.current} av ${goal.target} ${goal.unit}`
                    : goal.title.includes('Topp 10') 
                      ? `${goal.target - goal.current} poeng til`
                      : `${goal.current} av ${goal.target} ${goal.unit}`
                  }
                </div>
              </div>
              
              <div className="w-full h-2 bg-green-600/20 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                  style={{
                    width: progressAnimated ? `${getGoalProgress(goal)}%` : '0%'
                  }}
                ></div>
              </div>
              
              <div className="text-xs sm:text-sm lg:text-base text-yellow-400 font-semibold">
                {goal.reward}
              </div>
            </div>
          ))}
        </div>

        {/* January Chart */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="flex items-center mb-4 sm:mb-5">
            <span className="text-xl sm:text-2xl mr-2">📈</span>
            <span className="text-base sm:text-lg lg:text-xl font-semibold text-green-300">
              {currentMonth} poengutvikling
            </span>
          </div>
          
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-5 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-5">
              <div className="text-sm sm:text-base lg:text-lg text-green-300 font-semibold">
                Denne måneden
              </div>
              <div className="bg-green-600/20 text-green-200 px-3 py-1 rounded-lg text-xs sm:text-sm lg:text-base">
                {currentMonth} {currentYear}
              </div>
            </div>
            
            <div className="h-24 sm:h-28 lg:h-32 flex items-end justify-between gap-1 sm:gap-2 mb-2">
              {weeklyData.map((week, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm hover:brightness-110 transition-all duration-300 cursor-pointer relative group"
                  style={{
                    height: chartAnimated ? `${week.height}%` : '0%',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {week.points}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs sm:text-sm text-green-200">
              {weeklyData.map((week, index) => (
                <span key={index}>{week.week}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Yearly Chart */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="flex items-center mb-4 sm:mb-5">
            <span className="text-xl sm:text-2xl mr-2">📅</span>
            <span className="text-base sm:text-lg lg:text-xl font-semibold text-green-300">
              Månedsoversikt ({currentYear})
            </span>
          </div>
          
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-5 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-5">
              <div className="text-sm sm:text-base lg:text-lg text-green-300 font-semibold">
                Poeng per måned
              </div>
              <div className="bg-green-600/20 text-green-200 px-3 py-1 rounded-lg text-xs sm:text-sm lg:text-base">
                Hele året
              </div>
            </div>
            
            <div className="h-24 sm:h-28 lg:h-32 flex items-end justify-between gap-1 mb-2">
              {monthlyData.map((month, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm hover:brightness-110 transition-all duration-300 cursor-pointer relative group"
                  style={{
                    height: chartAnimated ? `${month.height}%` : '0%',
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {month.points > 0 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      {month.points}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs sm:text-sm text-green-200">
              {monthlyData.map((month, index) => (
                <span key={index}>{month.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="flex items-center mb-4 sm:mb-5">
            <span className="text-xl sm:text-2xl mr-2">📋</span>
            <span className="text-base sm:text-lg lg:text-xl font-semibold text-green-300">
              Siste aktivitet
            </span>
          </div>
          
          <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-5 sm:p-6 lg:p-8">
            {recentActivity.map((activity, index) => (
              <div key={index} className={`flex items-center py-3 sm:py-4 ${index < recentActivity.length - 1 ? 'border-b border-green-600/20' : ''}`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${getActivityColors(activity.type)} rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl mr-3 sm:mr-4`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1">
                    {activity.title}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-green-200">
                    {activity.description}
                  </div>
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-bold text-green-400">
                  +{activity.points}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Insights */}
        <div className="mx-5 sm:mx-6 lg:mx-8 my-5 sm:my-6">
          <div className="flex items-center mb-4 sm:mb-5">
            <span className="text-xl sm:text-2xl mr-2">💡</span>
            <span className="text-base sm:text-lg lg:text-xl font-semibold text-green-300">
              Personlige innsikter
            </span>
          </div>
          
          <div className="space-y-4 sm:space-y-5">
            <div className="bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 border border-yellow-500 rounded-xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-xl sm:text-2xl opacity-60">💡</div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-400 mb-2 sm:mb-3">
                Sterk januar-start! 📈
              </div>
              <div className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                Du har {monthlyPoints} poeng på første måned - det er 27% over gjennomsnittet! Fortsett slik og du kan nå topp 5 før årsslutt.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-600/30 to-yellow-500/20 border border-yellow-500 rounded-xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-xl sm:text-2xl opacity-60">💡</div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-400 mb-2 sm:mb-3">
                11 måneder igjen 🗓️
              </div>
              <div className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                Med januar-innsatsen din som grunnlag, kan du potensielt samle over 2000 poeng i {currentYear}. Det ville plassere deg i topp 3!
              </div>
            </div>
          </div>
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
        <div className="flex flex-col items-center text-white bg-green-500/30 p-2 sm:p-3 rounded-3xl">
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-green-500/20 rounded-full flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            📊
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Status</span>
        </div>
        <button
          onClick={() => navigateTo('leaderboard')}
          className="flex flex-col items-center text-green-300 p-2 sm:p-3 rounded-3xl hover:bg-green-500/20 transition-colors"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center mb-0.5 text-base sm:text-lg lg:text-xl">
            🏆
          </div>
          <span className="text-xs sm:text-sm lg:text-base">Ledere</span>
        </button>
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