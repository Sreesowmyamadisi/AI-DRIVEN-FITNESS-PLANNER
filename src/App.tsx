import React, { useState } from 'react';
import { Dumbbell, Loader2 } from 'lucide-react';
import { generateFitnessPlan, generateDietPlan } from './lib/gemini';
import ReactMarkdown from 'react-markdown';
import { FitnessPlanTable } from './components/FitnessPlanTable';
import { DietPlanTable } from './components/DietPlanTable';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [goal, setGoal] = useState<'lose' | 'gain' | 'muscle'>('lose');
  const [plan, setPlan] = useState('');
  const [dietPlan, setDietPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateBMI = () => {
    const heightInMeters = Number(height) / 100;
    return Number(weight) / (heightInMeters * heightInMeters);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bmi = calculateBMI();
      const [fitnessResponse, dietResponse] = await Promise.all([
        generateFitnessPlan(
          Number(height),
          Number(weight),
          Number(age),
          bmi,
          goal,
          gender
        ),
        generateDietPlan(
          Number(height),
          Number(weight),
          Number(age),
          bmi,
          goal,
          gender
        )
      ]);
      setPlan(fitnessResponse);
      setDietPlan(dietResponse);
    } catch (error) {
      console.error('Error generating plans:', error);
      setPlan('Error generating plans. Please try again.');
      setDietPlan('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 mb-4">
            FitPlan Pro
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Generate your personalized fitness and diet plan based on your goals and characteristics
          </p>
        </div>

        <div className="bg-dark-100 backdrop-blur-lg bg-opacity-50 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg bg-dark-200 border border-gray-600 text-white px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg bg-dark-200 border border-gray-600 text-white px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg bg-dark-200 border border-gray-600 text-white px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="mt-1 block w-full rounded-lg bg-dark-200 border border-gray-600 text-white px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as 'lose' | 'gain' | 'muscle')}
                  className="mt-1 block w-full rounded-lg bg-dark-200 border border-gray-600 text-white px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="lose">Lose Weight</option>
                  <option value="gain">Gain Weight</option>
                  <option value="muscle">Build Muscle</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 px-4 rounded-lg hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-100 disabled:opacity-50 transition-all flex items-center justify-center font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Plans...
                </>
              ) : (
                <>
                  <Dumbbell className="w-5 h-5 mr-2" />
                  Generate Fitness and Diet Plans
                </>
              )}
            </button>
          </form>
        </div>

        {plan && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-dark-100 backdrop-blur-lg bg-opacity-50 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                Your Personalized Fitness Plan
              </h2>
              <FitnessPlanTable planText={plan} />
            </div>

            {dietPlan && (
              <div className="bg-dark-100 backdrop-blur-lg bg-opacity-50 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                  Your Personalized Diet Plan
                </h2>
                <DietPlanTable planText={dietPlan} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;