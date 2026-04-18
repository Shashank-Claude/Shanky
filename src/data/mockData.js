export const userProfile = {
  name: 'Alex Johnson',
  avatar: null,
  goal: 'Lose Weight',
  dailyCalorieGoal: 1800,
  protein: 140,
  carbs: 180,
  fat: 60,
  weight: 78,
  height: 175,
  age: 28,
  streak: 12,
};

export const foodDatabase = [
  { id: 1, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g' },
  { id: 2, name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, serving: '1 cup' },
  { id: 3, name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: '1 medium' },
  { id: 4, name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.7, serving: '170g' },
  { id: 5, name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 2.5, serving: '1 cup' },
  { id: 6, name: 'Eggs', calories: 78, protein: 6, carbs: 0.6, fat: 5, serving: '1 large' },
  { id: 7, name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, serving: '100g' },
  { id: 8, name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, serving: '28g' },
  { id: 9, name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: '1 medium' },
  { id: 10, name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, serving: '1 cup' },
  { id: 11, name: 'Whole Milk', calories: 149, protein: 8, carbs: 12, fat: 8, serving: '1 cup' },
  { id: 12, name: 'Sweet Potato', calories: 103, protein: 2.3, carbs: 24, fat: 0.1, serving: '1 medium' },
  { id: 13, name: 'Peanut Butter', calories: 188, protein: 8, carbs: 6, fat: 16, serving: '2 tbsp' },
  { id: 14, name: 'Tuna (canned)', calories: 132, protein: 29, carbs: 0, fat: 1, serving: '100g' },
  { id: 15, name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, serving: '100g' },
  { id: 16, name: 'Cottage Cheese', calories: 90, protein: 12, carbs: 5, fat: 2.5, serving: '100g' },
  { id: 17, name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.5, serving: '1 cup' },
  { id: 18, name: 'Orange Juice', calories: 112, protein: 1.7, carbs: 26, fat: 0.5, serving: '1 cup' },
  { id: 19, name: 'Spinach', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, serving: '1 cup' },
  { id: 20, name: 'White Bread', calories: 79, protein: 2.7, carbs: 15, fat: 1, serving: '1 slice' },
];

export const todayLog = {
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  meals: {
    breakfast: [
      { id: 1, food: foodDatabase[4], quantity: 1, mealCalories: 150 },
      { id: 2, food: foodDatabase[5], quantity: 2, mealCalories: 156 },
      { id: 3, food: foodDatabase[10], quantity: 1, mealCalories: 149 },
    ],
    lunch: [
      { id: 4, food: foodDatabase[0], quantity: 1.5, mealCalories: 248 },
      { id: 5, food: foodDatabase[1], quantity: 1, mealCalories: 216 },
      { id: 6, food: foodDatabase[9], quantity: 1, mealCalories: 55 },
    ],
    dinner: [
      { id: 7, food: foodDatabase[6], quantity: 1.5, mealCalories: 312 },
      { id: 8, food: foodDatabase[11], quantity: 1, mealCalories: 103 },
    ],
    snacks: [
      { id: 9, food: foodDatabase[2], quantity: 1, mealCalories: 89 },
      { id: 10, food: foodDatabase[7], quantity: 1, mealCalories: 164 },
    ],
  },
};

const totalCaloriesConsumed = Object.values(todayLog.meals).flat().reduce((sum, e) => sum + e.mealCalories, 0);
const totalProtein = Object.values(todayLog.meals).flat().reduce((sum, e) => sum + e.food.protein * e.quantity, 0);
const totalCarbs = Object.values(todayLog.meals).flat().reduce((sum, e) => sum + e.food.carbs * e.quantity, 0);
const totalFat = Object.values(todayLog.meals).flat().reduce((sum, e) => sum + e.food.fat * e.quantity, 0);

export const todayTotals = {
  calories: Math.round(totalCaloriesConsumed),
  protein: Math.round(totalProtein),
  carbs: Math.round(totalCarbs),
  fat: Math.round(totalFat),
};

export const weeklyData = [
  { day: 'Mon', calories: 1650, goal: 1800 },
  { day: 'Tue', calories: 1920, goal: 1800 },
  { day: 'Wed', calories: 1740, goal: 1800 },
  { day: 'Thu', calories: 1580, goal: 1800 },
  { day: 'Fri', calories: 1800, goal: 1800 },
  { day: 'Sat', calories: 2100, goal: 1800 },
  { day: 'Sun', calories: todayTotals.calories, goal: 1800 },
];

export const weightHistory = [
  { date: 'Mar 1', weight: 80.5 },
  { date: 'Mar 8', weight: 79.8 },
  { date: 'Mar 15', weight: 79.2 },
  { date: 'Mar 22', weight: 78.9 },
  { date: 'Mar 29', weight: 78.5 },
  { date: 'Apr 5', weight: 78.2 },
  { date: 'Apr 12', weight: 78.0 },
  { date: 'Apr 18', weight: 77.8 },
];
