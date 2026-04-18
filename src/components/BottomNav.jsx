import { LayoutDashboard, BookOpen, TrendingUp, User } from 'lucide-react';

const tabs = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'log', icon: BookOpen, label: 'Log' },
  { id: 'progress', icon: TrendingUp, label: 'Progress' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="mx-3 mb-3 rounded-2xl bg-slate-900/90 backdrop-blur border border-slate-800 px-2 py-2">
        <div className="flex justify-around">
          {tabs.map(({ id, icon: Icon, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all"
                style={{
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: isActive ? '#6366f1' : '#64748b',
                }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
