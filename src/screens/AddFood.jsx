import { useState, useMemo } from 'react';
import { Search, X, ChevronLeft, Plus, Check } from 'lucide-react';
import { foodDatabase } from '../data/mockData';

const RECENT = [foodDatabase[0], foodDatabase[4], foodDatabase[5], foodDatabase[2], foodDatabase[6]];

function FoodItem({ food, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(food);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-800/60 last:border-0">
      <div className="flex-1 min-w-0 mr-3">
        <p className="text-white text-sm font-medium truncate">{food.name}</p>
        <p className="text-slate-500 text-xs mt-0.5">{food.serving} · <span className="text-indigo-400">{food.calories} kcal</span></p>
        <div className="flex gap-3 mt-1">
          <span className="text-xs text-slate-500">P <span className="text-slate-300">{food.protein}g</span></span>
          <span className="text-xs text-slate-500">C <span className="text-slate-300">{food.carbs}g</span></span>
          <span className="text-xs text-slate-500">F <span className="text-slate-300">{food.fat}g</span></span>
        </div>
      </div>
      <button
        onClick={handleAdd}
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
        style={{
          background: added ? '#10b98120' : '#6366f120',
          border: `1px solid ${added ? '#10b98140' : '#6366f140'}`,
          color: added ? '#10b981' : '#6366f1',
        }}
      >
        {added ? <Check size={16} /> : <Plus size={16} />}
      </button>
    </div>
  );
}

export default function AddFood({ mealTarget = 'breakfast', onBack }) {
  const [query, setQuery] = useState('');
  const [addedCount, setAddedCount] = useState(0);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return foodDatabase.filter(f => f.name.toLowerCase().includes(q));
  }, [query]);

  const handleAdd = () => {
    setAddedCount(c => c + 1);
  };

  const mealLabel = mealTarget.charAt(0).toUpperCase() + mealTarget.slice(1);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={22} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Add Food</h1>
            <p className="text-slate-400 text-xs">Adding to <span className="text-indigo-400 font-medium">{mealLabel}</span></p>
          </div>
          {addedCount > 0 && (
            <div className="ml-auto bg-emerald-500/20 border border-emerald-500/30 rounded-full px-2.5 py-0.5">
              <span className="text-emerald-400 text-xs font-medium">{addedCount} added</span>
            </div>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3.5 focus-within:border-indigo-500 transition-colors">
          <Search size={18} className="text-slate-400 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search food, ingredient..."
            className="bg-transparent text-white placeholder-slate-500 text-sm flex-1 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-500 hover:text-white">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-28">
        {query ? (
          <>
            <p className="text-slate-500 text-xs mb-3 uppercase tracking-widest font-medium">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <p className="text-slate-400 font-medium">No results for "{query}"</p>
                <p className="text-slate-600 text-sm mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 px-5">
                {results.map(food => (
                  <FoodItem key={food.id} food={food} onAdd={handleAdd} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Recent */}
            <p className="text-slate-500 text-xs mb-3 uppercase tracking-widest font-medium">Recent</p>
            <div className="bg-slate-900 rounded-3xl border border-slate-800 px-5 mb-5">
              {RECENT.map(food => (
                <FoodItem key={food.id} food={food} onAdd={handleAdd} />
              ))}
            </div>

            {/* Quick Macros */}
            <p className="text-slate-500 text-xs mb-3 uppercase tracking-widest font-medium">Quick Meals</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'High Protein', emoji: '💪', cal: '~400 kcal', desc: 'Chicken + Rice' },
                { label: 'Light Snack', emoji: '🥗', cal: '~150 kcal', desc: 'Fruit & Yogurt' },
                { label: 'Breakfast', emoji: '🥞', cal: '~350 kcal', desc: 'Oats + Eggs' },
                { label: 'Post Workout', emoji: '⚡', cal: '~300 kcal', desc: 'Protein Shake' },
              ].map(({ label, emoji, cal, desc }) => (
                <button
                  key={label}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left hover:border-indigo-500/50 transition-colors"
                >
                  <span className="text-2xl">{emoji}</span>
                  <p className="text-white text-sm font-medium mt-2">{label}</p>
                  <p className="text-slate-500 text-xs">{desc}</p>
                  <p className="text-indigo-400 text-xs font-medium mt-1">{cal}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
