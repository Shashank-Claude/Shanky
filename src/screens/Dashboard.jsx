import { Flame, Droplets, Zap, Award, ChevronRight, Plus } from 'lucide-react';
import CalorieRing from '../components/CalorieRing';
import MacroBar from '../components/MacroBar';
import { userProfile, todayTotals, todayLog } from '../data/mockData';

const waterCups = 6;
const waterGoal = 8;

export default function Dashboard({ onNavigate }) {
  const mealSummaries = [
    { label: 'Breakfast', entries: todayLog.meals.breakfast, emoji: '🌅' },
    { label: 'Lunch', entries: todayLog.meals.lunch, emoji: '☀️' },
    { label: 'Dinner', entries: todayLog.meals.dinner, emoji: '🌙' },
    { label: 'Snacks', entries: todayLog.meals.snacks, emoji: '🍎' },
  ];

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-sm">Good morning,</p>
            <h1 className="text-2xl font-bold text-white">{userProfile.name.split(' ')[0]} 👋</h1>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5">
            <Flame size={14} className="text-orange-400" />
            <span className="text-orange-400 text-sm font-semibold">{userProfile.streak} day streak</span>
          </div>
        </div>
      </div>

      {/* Calorie Ring Card */}
      <div className="mx-5 mb-4 rounded-3xl p-6" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', border: '1px solid #1e2035' }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">Today's Calories</p>
            <p className="text-slate-300 text-sm mt-0.5">Goal: <span className="text-white font-semibold">{userProfile.dailyCalorieGoal.toLocaleString()} kcal</span></p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs">Burned</p>
            <div className="flex items-center gap-1 justify-end">
              <Flame size={14} className="text-orange-400" />
              <span className="text-white font-semibold text-sm">320</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <CalorieRing consumed={todayTotals.calories} goal={userProfile.dailyCalorieGoal} size={200} />
        </div>
      </div>

      {/* Macros */}
      <div className="mx-5 mb-4 bg-slate-900 rounded-3xl p-5 border border-slate-800">
        <p className="text-white font-semibold mb-4">Macronutrients</p>
        <div className="flex flex-col gap-4">
          <MacroBar label="Protein" current={todayTotals.protein} goal={userProfile.protein} color="#6366f1" />
          <MacroBar label="Carbohydrates" current={todayTotals.carbs} goal={userProfile.carbs} color="#f59e0b" />
          <MacroBar label="Fat" current={todayTotals.fat} goal={userProfile.fat} color="#ec4899" />
        </div>
        <div className="flex justify-between mt-5 pt-4 border-t border-slate-800">
          {[
            { label: 'Protein', val: todayTotals.protein, color: '#6366f1' },
            { label: 'Carbs', val: todayTotals.carbs, color: '#f59e0b' },
            { label: 'Fat', val: todayTotals.fat, color: '#ec4899' },
          ].map(({ label, val, color }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-bold text-white">{val}<span className="text-sm font-normal text-slate-400">g</span></p>
              <p className="text-xs mt-0.5" style={{ color }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Water Tracker */}
      <div className="mx-5 mb-4 bg-slate-900 rounded-3xl p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={18} className="text-blue-400" />
            <p className="text-white font-semibold">Water</p>
          </div>
          <span className="text-slate-400 text-sm">{waterCups}/{waterGoal} cups</span>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-8 rounded-lg transition-all"
              style={{
                background: i < waterCups
                  ? 'linear-gradient(180deg, #60a5fa, #3b82f6)'
                  : '#1e2030',
                border: i < waterCups ? '1px solid #3b82f680' : '1px solid #2a2d3e',
              }}
            />
          ))}
        </div>
      </div>

      {/* Meal Summary */}
      <div className="mx-5 mb-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-white font-semibold">Today's Meals</p>
          <button
            onClick={() => onNavigate('log')}
            className="text-indigo-400 text-sm flex items-center gap-0.5"
          >
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          {mealSummaries.map(({ label, entries, emoji }) => {
            const total = entries.reduce((s, e) => s + e.mealCalories, 0);
            return (
              <div
                key={label}
                className="flex items-center justify-between bg-slate-900 rounded-2xl px-4 py-3.5 border border-slate-800 active:bg-slate-800 cursor-pointer"
                onClick={() => onNavigate('log')}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{emoji}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-slate-500 text-xs">{entries.length} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">{total} kcal</span>
                  <ChevronRight size={16} className="text-slate-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Add FAB hint */}
      <div className="mx-5 mb-2">
        <button
          onClick={() => onNavigate('log')}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <Plus size={20} />
          Log Food
        </button>
      </div>
    </div>
  );
}
