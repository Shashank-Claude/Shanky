import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Dashboard from './screens/Dashboard';
import FoodLog from './screens/FoodLog';
import AddFood from './screens/AddFood';
import Progress from './screens/Progress';
import Profile from './screens/Profile';
import './index.css';

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [addFoodMeal, setAddFoodMeal] = useState(null);

  const handleAddFood = (mealKey) => {
    setAddFoodMeal(mealKey);
  };

  const handleBackFromAdd = () => {
    setAddFoodMeal(null);
  };

  if (addFoodMeal) {
    return (
      <div className="flex flex-col min-h-dvh">
        <AddFood mealTarget={addFoodMeal} onBack={handleBackFromAdd} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      {tab === 'dashboard' && <Dashboard onNavigate={setTab} />}
      {tab === 'log' && <FoodLog onAddFood={handleAddFood} />}
      {tab === 'progress' && <Progress />}
      {tab === 'profile' && <Profile />}
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
