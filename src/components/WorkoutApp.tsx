import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { WorkoutForm } from './WorkoutForm';
import { WorkoutDisplay } from './WorkoutDisplay';
import { FormData, WorkoutRoutine, EnhancedExercise } from '../types';
import { fetchExercises } from '../utils/apiNinjasApi';
import { enhanceExerciseWithAI, generateWorkoutDescription } from '../utils/groqApi';
import { checkApiKeys, testApiNinjas } from '../utils/testApis';

export const WorkoutApp: React.FC = () => {
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check API keys on component mount
  React.useEffect(() => {
    checkApiKeys();
  }, []);

  // Real API integration with API-Ninjas and Groq
  const generateWorkout = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setRoutine(null);

    try {
      // Step 1: Fetch exercises from API-Ninjas (with fallback to mock data)
      console.log('Fetching exercises from API-Ninjas...');
      const exercises = await fetchExercises(formData);
      
      // Note: fetchExercises always returns exercises (mock data as fallback)
      console.log(`Found ${exercises.length} exercises for ${formData.muscleGroup} at ${formData.difficulty} level`);

      // Step 2: Enhance each exercise with AI insights from Groq
      console.log('Enhancing exercises with AI insights...');
      const enhancedExercises: EnhancedExercise[] = await Promise.all(
        exercises.map(async (exercise) => {
          try {
            return await enhanceExerciseWithAI(exercise, formData.difficulty);
          } catch (error) {
            console.error(`Failed to enhance exercise ${exercise.name}:`, error);
            // Return basic enhanced exercise if AI enhancement fails
            return {
              ...exercise,
              id: `${exercise.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
              aiInsights: "This exercise is effective for building strength when performed correctly.",
              properForm: ["Maintain proper posture", "Control the movement"],
              commonMistakes: ["Using too much weight", "Poor form"],
              benefits: ["Builds strength", "Improves muscle definition"],
              targetMuscles: [exercise.muscle || "Target muscle"],
              safetyTips: ["Warm up properly", "Use controlled movements"],
              variations: ["Standard variation", "Modified variation"]
            };
          }
        })
      );

      // Step 3: Generate AI workout description
      console.log('Generating workout description...');
      const workoutDetails = await generateWorkoutDescription(formData, enhancedExercises);

      // Step 4: Create complete workout routine
      const completeRoutine: WorkoutRoutine = {
        exercises: enhancedExercises,
        aiDescription: workoutDetails.description,
        targetGoals: workoutDetails.targetGoals,
        estimatedCalories: workoutDetails.estimatedCalories,
        tips: [
          'Warm up for 5-10 minutes before starting your workout',
          'Focus on proper form over heavy weight',
          'Rest 60-90 seconds between sets',
          'Stay hydrated throughout your workout',
          'Cool down with light stretching after your session'
        ]
      };

      setRoutine(completeRoutine);
    } catch (err) {
      console.error('Error generating workout:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Dumbbell className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">FitPlan AI</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized workout routines tailored to your fitness level and target muscle groups
          </p>
        </div>

        {/* Workout Form */}
        <div className="mb-8">
          <WorkoutForm onSubmit={generateWorkout} loading={loading} />
        </div>

        {/* Debug section - remove this in production */}
        <div className="mb-8 text-center">
          <button
            onClick={() => testApiNinjas()}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all text-sm"
          >
            🧪 Test API Integration (Check Console)
          </button>
        </div>

        {/* Workout Display */}
        <WorkoutDisplay routine={routine} loading={loading} error={error} />

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>© 2025 FitPlan AI - Your Personal Workout Generator</p>
        </div>
      </div>
    </div>
  );
}; 