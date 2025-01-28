import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateFitnessPlan(
  height: number,
  weight: number,
  age: number,
  bmi: number,
  goal: 'lose' | 'gain' | 'muscle',
  gender: 'male' | 'female'
): Promise<string> {
  const prompt = `Create a detailed 7-day fitness plan for someone with the following characteristics:
    - Gender: ${gender}
    - Height: ${height} cm
    - Weight: ${weight} kg
    - Age: ${age} years
    - BMI: ${bmi}
    - Goal: ${goal === 'lose' ? 'lose weight' : goal === 'gain' ? 'gain weight' : 'gain muscle'}

    Respond with EXACTLY this format (including the empty line after the table):

    | Day | Exercises | Sets x Reps | Rest Period | Notes |
    |-----|-----------|-------------|-------------|-------|
    | Monday | Exercise 1<br>Exercise 2 | 3x12<br>4x10 | 60s | Keep form strict |
    | Tuesday | Exercise 1<br>Exercise 2 | 3x12<br>4x10 | 60s | Form tips |
    | Wednesday | Rest | - | - | Active recovery |
    | Thursday | Exercise 1<br>Exercise 2 | 3x12<br>4x10 | 60s | Form tips |
    | Friday | Exercise 1<br>Exercise 2 | 3x12<br>4x10 | 60s | Form tips |
    | Saturday | Exercise 1<br>Exercise 2 | 3x12<br>4x10 | 60s | Form tips |
    | Sunday | Rest | - | - | Recovery |

    Additional Tips and Precautions:

    * Tip 1
    * Tip 2
    * Tip 3`;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function generateDietPlan(
  height: number,
  weight: number,
  age: number,
  bmi: number,
  goal: 'lose' | 'gain' | 'muscle',
  gender: 'male' | 'female'
): Promise<string> {
  const prompt = `Create a 7-day diet plan for someone with the following characteristics:
    - Gender: ${gender}
    - Height: ${height} cm
    - Weight: ${weight} kg
    - Age: ${age} years
    - BMI: ${bmi}
    - Goal: ${goal === 'lose' ? 'lose weight' : goal === 'gain' ? 'gain weight' : 'gain muscle'}

    Respond with EXACTLY this format (including the empty line after the table):

    | Day | Breakfast | Lunch | Dinner | Snacks |
    |-----|-----------|-------|---------|--------|
    | Monday | Oatmeal<br>Banana | Chicken Salad<br>Brown Rice | Grilled Fish<br>Vegetables | Nuts<br>Yogurt |
    | Tuesday | Eggs<br>Toast | Turkey Wrap<br>Fruit | Lean Beef<br>Sweet Potato | Protein Bar<br>Apple |
    | Wednesday | Smoothie<br>Toast | Tuna Salad<br>Quinoa | Chicken<br>Rice | Cottage Cheese<br>Berries |

    Additional Diet Tips:

    * Tip 1
    * Tip 2
    * Tip 3`;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}