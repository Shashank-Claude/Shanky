import { User, Target, Weight, Ruler, ChevronRight, Bell, Moon, Shield, HelpCircle, LogOut, Edit3, Flame } from 'lucide-react';
import { userProfile } from '../data/mockData';

const bmi = (userProfile.weight / ((userProfile.height / 100) ** 2)).toFixed(1);
const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
const bmiColor = bmi < 18.5 ? '#60a5fa' : bmi < 25 ? '#10b981' : bmi < 30 ? '#f59e0b' : '#ef4444';

const SECTIONS = [
  {
    title: 'Goals',
    items: [
      { icon: Target, label: 'Daily Calorie Goal', value: `${userProfile.dailyCalorieGoal} kcal` },
      { icon: Weight, label: 'Current Weight', value: `${userProfile.weight} kg` },
      { icon: Ruler, label: 'Height', value: `${userProfile.height} cm` },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Meal Reminders', value: 'On' },
      { icon: Moon, label: 'Dark Mode', value: 'On' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: Shield, label: 'Privacy', value: '' },
      { icon: HelpCircle, label: 'Help & Support', value: '' },
    ],
  },
];

function ProfileRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-800/60 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center">
          <Icon size={15} className="text-slate-400" />
        </div>
        <span className="text-white text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-slate-400 text-sm">{value}</span>}
        <ChevronRight size={16} className="text-slate-600" />
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
      </div>

      {/* Avatar & Name Card */}
      <div className="mx-5 mb-5 bg-slate-900 border border-slate-800 rounded-3xl p-5">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            {userProfile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h2 className="text-white text-lg font-bold">{userProfile.name}</h2>
            <p className="text-slate-400 text-sm">Age {userProfile.age} · {userProfile.goal}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Flame size={14} className="text-orange-400" />
              <span className="text-orange-400 text-xs font-semibold">{userProfile.streak} day streak</span>
            </div>
          </div>
          <button className="p-2 bg-slate-800 rounded-xl text-slate-400">
            <Edit3 size={16} />
          </button>
        </div>
      </div>

      {/* BMI Card */}
      <div className="mx-5 mb-5 rounded-3xl p-5" style={{ background: `${bmiColor}15`, border: `1px solid ${bmiColor}30` }}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">BMI</p>
            <p className="text-4xl font-bold mt-1" style={{ color: bmiColor }}>{bmi}</p>
            <p className="text-sm font-medium mt-1" style={{ color: bmiColor }}>{bmiCategory}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs">Weight</p>
            <p className="text-white font-bold text-lg">{userProfile.weight} kg</p>
            <p className="text-slate-400 text-xs mt-1">Height</p>
            <p className="text-white font-bold text-lg">{userProfile.height} cm</p>
          </div>
        </div>
        {/* BMI Scale */}
        <div className="mt-4">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg, #60a5fa, #10b981, #f59e0b, #ef4444)' }}>
            <div className="relative">
              <div
                className="absolute top-0 w-3 h-3 bg-white rounded-full -mt-0.5 border-2 border-white shadow"
                style={{ left: `${Math.min(((parseFloat(bmi) - 15) / 25) * 100, 100)}%`, transform: 'translateX(-50%)' }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1.5">
            <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
          </div>
        </div>
      </div>

      {/* Macro Goals */}
      <div className="mx-5 mb-5 bg-slate-900 border border-slate-800 rounded-3xl p-5">
        <p className="text-white font-semibold mb-4">Daily Macro Goals</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Protein', val: userProfile.protein, color: '#6366f1', emoji: '💪' },
            { label: 'Carbs', val: userProfile.carbs, color: '#f59e0b', emoji: '🌾' },
            { label: 'Fat', val: userProfile.fat, color: '#ec4899', emoji: '🥑' },
          ].map(({ label, val, color, emoji }) => (
            <div
              key={label}
              className="rounded-2xl p-3 text-center"
              style={{ background: `${color}15`, border: `1px solid ${color}30` }}
            >
              <span className="text-lg">{emoji}</span>
              <p className="text-white font-bold text-lg mt-1">{val}g</p>
              <p className="text-xs mt-0.5" style={{ color }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Sections */}
      {SECTIONS.map(({ title, items }) => (
        <div key={title} className="mx-5 mb-4">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-medium mb-2 px-1">{title}</p>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl px-5">
            {items.map(item => (
              <ProfileRow key={item.label} {...item} />
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="mx-5 mb-4">
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-red-400 bg-red-400/10 border border-red-400/20 font-medium text-sm">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
