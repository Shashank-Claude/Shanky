import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine,
} from 'recharts';
import { TrendingDown, Target, Award, Flame } from 'lucide-react';
import { weeklyData, weightHistory, userProfile, todayTotals } from '../data/mockData';

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const val = payload[0].value;
    const goal = weeklyData[0].goal;
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-white font-bold">{val} kcal</p>
        <p className={val > goal ? 'text-red-400' : 'text-emerald-400'}>{val > goal ? `+${val - goal} over` : `${goal - val} under`}</p>
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-white font-bold">{payload[0].value} kg</p>
      </div>
    );
  }
  return null;
};

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={16} style={{ color }} />
        </div>
        <p className="text-slate-400 text-xs font-medium">{label}</p>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
    </div>
  );
}

export default function Progress() {
  const avgCalories = Math.round(weeklyData.reduce((s, d) => s + d.calories, 0) / weeklyData.length);
  const onGoalDays = weeklyData.filter(d => d.calories <= d.goal).length;
  const weightLost = (weightHistory[0].weight - weightHistory[weightHistory.length - 1].weight).toFixed(1);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-white">Progress</h1>
        <p className="text-slate-400 text-sm mt-1">Last 7 days overview</p>
      </div>

      {/* Stats Grid */}
      <div className="px-5 mb-5 grid grid-cols-2 gap-3">
        <StatCard icon={Flame} label="Avg. Daily" value={`${avgCalories}`} sub="kcal / day" color="#f59e0b" />
        <StatCard icon={Target} label="On Goal" value={`${onGoalDays}/7`} sub="days this week" color="#6366f1" />
        <StatCard icon={TrendingDown} label="Weight Lost" value={`${weightLost} kg`} sub="since Mar 1" color="#10b981" />
        <StatCard icon={Award} label="Streak" value={`${userProfile.streak}`} sub="days in a row" color="#ec4899" />
      </div>

      {/* Weekly Calorie Bar Chart */}
      <div className="mx-5 mb-5 bg-slate-900 rounded-3xl border border-slate-800 p-5">
        <p className="text-white font-semibold mb-1">Weekly Calories</p>
        <p className="text-slate-500 text-xs mb-4">Goal: {userProfile.dailyCalorieGoal.toLocaleString()} kcal/day</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData} barSize={22} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="#1e2030" />
            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomBarTooltip />} cursor={{ fill: '#ffffff08' }} />
            <ReferenceLine y={userProfile.dailyCalorieGoal} stroke="#6366f140" strokeDasharray="4 4" />
            <Bar
              dataKey="calories"
              radius={[6, 6, 0, 0]}
              fill="#6366f1"
              label={false}
              // color each bar based on over/under goal
            >
              {weeklyData.map((entry, index) => (
                <rect key={index} fill={entry.calories > entry.goal ? '#ef4444' : '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Weight Chart */}
      <div className="mx-5 mb-5 bg-slate-900 rounded-3xl border border-slate-800 p-5">
        <p className="text-white font-semibold mb-1">Weight Trend</p>
        <p className="text-slate-500 text-xs mb-4">
          Current: <span className="text-white font-medium">{weightHistory[weightHistory.length - 1].weight} kg</span>
          <span className="text-emerald-400 ml-2">↓ {weightLost} kg</span>
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={weightHistory} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="#1e2030" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} interval={1} />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
            />
            <Tooltip content={<CustomLineTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Macro Breakdown Pie-style */}
      <div className="mx-5 mb-5 bg-slate-900 rounded-3xl border border-slate-800 p-5">
        <p className="text-white font-semibold mb-4">Today's Macros</p>
        <div className="flex items-center gap-4">
          {/* Simple donut-style visual */}
          <div className="relative flex-shrink-0">
            <svg width={100} height={100} viewBox="0 0 100 100">
              {(() => {
                const total = todayTotals.protein * 4 + todayTotals.carbs * 4 + todayTotals.fat * 9;
                const segments = [
                  { val: todayTotals.protein * 4, color: '#6366f1' },
                  { val: todayTotals.carbs * 4, color: '#f59e0b' },
                  { val: todayTotals.fat * 9, color: '#ec4899' },
                ];
                const r = 38;
                const cx = 50, cy = 50;
                const circ = 2 * Math.PI * r;
                let offset = 0;
                return segments.map(({ val, color }, i) => {
                  const pct = val / total;
                  const dash = pct * circ;
                  const gap = circ - dash;
                  const rotate = -90 + (offset / total) * 360;
                  offset += val;
                  return (
                    <circle
                      key={i}
                      cx={cx} cy={cy} r={r}
                      fill="none"
                      stroke={color}
                      strokeWidth={16}
                      strokeDasharray={`${dash} ${gap}`}
                      strokeDashoffset={0}
                      transform={`rotate(${rotate}, ${cx}, ${cy})`}
                    />
                  );
                });
              })()}
              <circle cx="50" cy="50" r="28" fill="#0f172a" />
              <text x="50" y="47" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{todayTotals.calories}</text>
              <text x="50" y="59" textAnchor="middle" fill="#64748b" fontSize="8">kcal</text>
            </svg>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {[
              { label: 'Protein', val: todayTotals.protein, kcal: todayTotals.protein * 4, color: '#6366f1' },
              { label: 'Carbs', val: todayTotals.carbs, kcal: todayTotals.carbs * 4, color: '#f59e0b' },
              { label: 'Fat', val: todayTotals.fat, kcal: todayTotals.fat * 9, color: '#ec4899' },
            ].map(({ label, val, kcal, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-slate-300 text-sm">{label}</span>
                </div>
                <div className="text-right">
                  <span className="text-white text-sm font-semibold">{val}g</span>
                  <span className="text-slate-500 text-xs ml-1">{kcal} kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
