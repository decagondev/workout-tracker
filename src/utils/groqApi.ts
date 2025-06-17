import Groq from 'groq-sdk';
import { Exercise, EnhancedExercise, FormData } from '../types';

// Initialize Groq client (you'll need to set VITE_GROQ_API_KEY in your .env file)
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || 'your-groq-api-key',
  dangerouslyAllowBrowser: true // Only for client-side usage in demos
});

export async function enhanceExerciseWithAI(exercise: Exercise, difficulty: string): Promise<EnhancedExercise> {
  try {
    const prompt = `
    Analyze this exercise and provide detailed insights:
    
    Exercise: ${exercise.name}
    Muscle Group: ${exercise.muscle || 'Not specified'}
    Difficulty: ${difficulty}
    Instructions: ${exercise.instructions}
    
    Please provide:
    1. AI insights about this exercise (2-3 sentences)
    2. 3-4 proper form tips
    3. 2-3 common mistakes to avoid
    4. 3-4 benefits of this exercise
    5. 2-3 target muscles worked
    6. 2-3 safety tips
    7. 2-3 exercise variations
    
    Return as JSON in this exact format:
    {
      "aiInsights": "string",
      "properForm": ["tip1", "tip2", "tip3"],
      "commonMistakes": ["mistake1", "mistake2"],
      "benefits": ["benefit1", "benefit2", "benefit3"],
      "targetMuscles": ["muscle1", "muscle2"],
      "safetyTips": ["tip1", "tip2"],
      "variations": ["variation1", "variation2"]
    }
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional fitness trainer and exercise physiologist. Provide accurate, helpful fitness advice in the exact JSON format requested."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.3,
      max_tokens: 1024
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    const enhancedData = JSON.parse(aiResponse);

    return {
      ...exercise,
      id: `${exercise.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      aiInsights: enhancedData.aiInsights,
      properForm: enhancedData.properForm,
      commonMistakes: enhancedData.commonMistakes,
      benefits: enhancedData.benefits,
      targetMuscles: enhancedData.targetMuscles,
      safetyTips: enhancedData.safetyTips,
      variations: enhancedData.variations
    };
  } catch (error) {
    console.error('Error enhancing exercise with AI:', error);
    
    // Return basic enhanced exercise if AI fails
    return {
      ...exercise,
      id: `${exercise.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      aiInsights: "This exercise is great for building strength and muscle development when performed with proper form.",
      properForm: ["Maintain proper posture", "Control the movement", "Focus on the target muscles"],
      commonMistakes: ["Using too much weight", "Rushing through reps"],
      benefits: ["Builds strength", "Improves muscle definition", "Enhances functional movement"],
      targetMuscles: [exercise.muscle || "Primary muscle group"],
      safetyTips: ["Warm up before exercising", "Use proper form over heavy weight"],
      variations: ["Beginner variation", "Advanced variation"]
    };
  }
}

export async function generateWorkoutDescription(formData: FormData, exercises: EnhancedExercise[]): Promise<{
  description: string;
  targetGoals: string[];
  estimatedCalories: number;
}> {
  try {
    const prompt = `
    Generate a workout description for:
    Muscle Group: ${formData.muscleGroup}
    Difficulty: ${formData.difficulty}
    Exercises: ${exercises.map(e => e.name).join(', ')}
    
    Provide:
    1. A motivational 2-3 sentence description of this workout
    2. 3-4 target goals for this workout
    3. Estimated calories burned (number only, for a 150lb person doing this workout)
    
    Return as JSON:
    {
      "description": "string",
      "targetGoals": ["goal1", "goal2", "goal3"],
      "estimatedCalories": number
    }
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a certified personal trainer. Provide motivational and accurate fitness guidance."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.4,
      max_tokens: 512
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No AI response');

    return JSON.parse(response);
  } catch (error) {
    console.error('Error generating workout description:', error);
    
    // Fallback response
    return {
      description: `This ${formData.difficulty} ${formData.muscleGroup} workout is designed to challenge your muscles and improve your fitness level.`,
      targetGoals: ["Build muscle strength", "Improve endurance", "Enhance muscle definition"],
      estimatedCalories: formData.difficulty === 'beginner' ? 150 : formData.difficulty === 'intermediate' ? 200 : 250
    };
  }
} 