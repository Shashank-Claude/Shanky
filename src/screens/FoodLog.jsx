import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Trash2, Search } from 'lucide-react';
import { todayLog, todayTotals, userProfile } from '../data/mockData';

const MEAL_CONFIG = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅', color: '#f59e0b' },
  { key: 'lunch', label: 'Lunch', emoji: '☀️', color: '#10b981' },
  { key: 'dinner', label: 'Dinner', emoji: '🌙', color: '#6366f1' },
  { key: 'snacks', label: 'Snacks', emoji: '🍎', color: '#ec4899' },
];

function MealSection({ config, entries, onAdd, onDelete }) {
  const [open, setOpen] = useState(true);
  const total = entries.reduce((s, e) => s + e.mealCalories, 0);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{config.emoji}</span>
          <div className="text-left">
            <p className="text-white font-semibold">{config.label}</p>
            <p className="text-slate-500 text-xs">{entries.length} items · {total} kcal</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">{total}</span>
          <span className="text-slate-500 text-xs">kcal</span>
          {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-800">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between px-5 py-3 border-b border-slate-800/50 last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{entry.food.name}</p>
                <p className="text-slate-500 text-xs">{entry.food.serving} · P {Math.round(entry.food.protein * entry.quantity)}g · C {Math.round(entry.food.carbs * entry.quantity)}g · F {Math.round(entry.food.fat * entry.quantity)}g</p>
              </div>
              <div className="flex items-center gap-3 ml-2">
                <span
                  className="text-sm font-bold"
                  style={{ color: config.color }}
                >
                  {entry.mealCalories}
                </span>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => onAdd(config.key)}
            className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors"
            style={{ color: config.color }}
          >
            <Plus size={16} />
            Add to {config.label}
          </button>
        </div>
      )}
    </div>
  );
}

export default function FoodLog({ onAddFood }) {
  const [meals, setMeals] = useState({ ...todayLog.meals });

  const handleDelete = (mealKey, entryId) => {
    setMeals(prev => ({
      ...prev,
      [mealKey]: prev[mealKey].filter(e => e.id !== entryId),
    }));
  };

  const caloriesPct = Math.min((todayTotals.calories / userProfile.dailyCalorieGoal) * 100, 100);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-white">Food Log</h1>
        <p className="text-slate-400 text-sm mt-1">{todayLog.date}</p>
      </div>

      {/* Daily Summary Banner */}
      <div
        className="mx-5 mb-5 rounded-3xl p-5"
        style={{ background: 'linear-gradient(135deg, #6366f120, #8b5cf620)', border: '1px solid #6366f130' }}
      >
        <div className="flex justify-between mb-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{todayTotals.calories}</p>
            <p className="text-xs text-slate-400">Eaten</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-400">—</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">320</p>
            <p className="text-xs text-slate-400">Burned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">=</p>
          </div>
          <div className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: todayTotals.calories > userProfile.dailyCalorieGoal ? '#ef4444' : '#10b981' }}
            >
              {Math.abs(userProfile.dailyCalorieGoal - todayTotals.calories + 320)}
            </p>
            <p className="text-xs text-slate-400">Remaining</p>
          </div>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${caloriesPct}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-slate-500">0</span>
          <span className="text-xs text-slate-500">{userProfile.dailyCalorieGoal} kcal goal</span>
        </div>
      </div>

      {/* Search hint */}
      <button
        onClick={() => onAddFood('breakfast')}
        className="mx-5 mb-5 w-[calc(100%-40px)] flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3.5 text-slate-500 text-sm"
      >
        <Search size={16} />
        Search food to add...
      </button>

      {/* Meal Sections */}
      <div className="px-5">
        {MEAL_CONFIG.map(config => (
          <MealSection
            key={config.key}
            config={config}
            entries={meals[config.key] || []}
            onAdd={onAddFood}
            onDelete={(id) => handleDelete(config.key, id)}
          />
        ))}
      </div>
    </div>
  );
}
