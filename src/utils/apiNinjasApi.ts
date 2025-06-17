import { Exercise, FormData } from '../types';

// API-Ninjas Exercise API integration
const API_NINJAS_BASE_URL = 'https://api.api-ninjas.com/v1/exercises';
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY || 'your-api-ninjas-key';

export async function fetchExercises(formData: FormData): Promise<Exercise[]> {
  try {
    // Map our user-friendly muscle groups to API-specific muscle groups
    const muscleGroupMap: Record<string, string[]> = {
      'chest': ['chest'],
      'legs': ['quadriceps', 'hamstrings', 'calves', 'glutes'],
      'arms': ['biceps', 'triceps', 'forearms'],
      'back': ['lats', 'middle_back', 'lower_back', 'traps'],
      'shoulders': ['traps'], // shoulders aren't directly listed, but traps are close
      'abs': ['abdominals'],
      'glutes': ['glutes']
    };

    // API uses 'expert' not 'advanced' according to the docs
    const difficultyMap: Record<string, string> = {
      'beginner': 'beginner',
      'intermediate': 'intermediate', 
      'expert': 'expert' // Corrected: API uses 'expert'
    };

    // Get the muscle groups for our selected category
    const targetMuscles = muscleGroupMap[formData.muscleGroup] || [formData.muscleGroup];
    
    // Try to fetch exercises for each muscle in the group
    let allExercises: Exercise[] = [];
    
    for (const muscle of targetMuscles) {
      try {
        const params = new URLSearchParams();
        params.append('muscle', muscle);
        params.append('difficulty', difficultyMap[formData.difficulty] || formData.difficulty);

        console.log('Calling API-Ninjas with params:', {
          muscle: muscle,
          difficulty: difficultyMap[formData.difficulty] || formData.difficulty
        });

        const response = await fetch(`${API_NINJAS_BASE_URL}?${params}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': API_KEY,
            'Content-Type': 'application/json'
          }
        });

        console.log(`API-Ninjas response status for ${muscle}:`, response.status);

        if (response.ok) {
          const exercises: Exercise[] = await response.json();
          console.log(`API-Ninjas returned ${exercises.length} exercises for ${muscle}`);
          
          if (exercises && exercises.length > 0) {
            allExercises.push(...exercises);
          }
        } else {
          console.error(`API-Ninjas HTTP error for ${muscle}:`, response.status, response.statusText);
        }
      } catch (innerError) {
        console.error(`Error fetching exercises for ${muscle}:`, innerError);
      }
      
      // Break if we have enough exercises
      if (allExercises.length >= 4) break;
    }

    // If we got exercises from API, process them
    if (allExercises.length > 0) {
      const processedExercises = allExercises.slice(0, 4).map(exercise => ({
        ...exercise,
        sets: getDifficultyBasedSets(formData.difficulty),
        reps: getDifficultyBasedReps(formData.difficulty, exercise.type)
      }));
      
      console.log('Processed exercises:', processedExercises);
      return processedExercises;
    }

    // If no exercises returned, fall back to mock data
    console.log('No exercises from API, using mock data');
    return getMockExercises(formData);
    
  } catch (error) {
    console.error('Error fetching exercises from API-Ninjas:', error);
    console.log('Using mock data as fallback');
    
    // Always return mock data as fallback
    return getMockExercises(formData);
  }
}

function getDifficultyBasedSets(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return '3';
    case 'intermediate':
      return '4';
    case 'expert':
      return '5';
    default:
      return '3';
  }
}

function getDifficultyBasedReps(difficulty: string, exerciseType?: string): string {
  const isStrength = exerciseType === 'strength';
  
  switch (difficulty) {
    case 'beginner':
      return isStrength ? '8-10' : '10-12';
    case 'intermediate':
      return isStrength ? '10-12' : '12-15';
    case 'expert':
      return isStrength ? '12-15' : '15-20';
    default:
      return '10-12';
  }
}

function getMockExercises(formData: FormData): Exercise[] {
  const baseExercises: Record<string, Exercise[]> = {
    chest: [
      {
        name: 'Push-ups',
        instructions: 'Start in a plank position with hands slightly wider than shoulders. Lower your body until your chest nearly touches the floor, then push back up.',
        muscle: 'chest',
        equipment: 'body_only',
        difficulty: formData.difficulty,
        type: 'strength'
      },
      {
        name: 'Chest Press',
        instructions: 'Lie on your back with dumbbells in each hand. Press the weights up above your chest, then lower with control.',
        muscle: 'chest',
        equipment: 'dumbbell',
        difficulty: formData.difficulty,
        type: 'strength'
      }
    ],
    legs: [
      {
        name: 'Squats',
        instructions: 'Stand with feet shoulder-width apart. Lower your hips back and down as if sitting in a chair, then return to standing.',
        muscle: 'quadriceps',
        equipment: 'body_only',
        difficulty: formData.difficulty,
        type: 'strength'
      },
      {
        name: 'Lunges',
        instructions: 'Step forward with one leg, lowering your hips until both knees are bent at 90 degrees. Return to starting position.',
        muscle: 'quadriceps',
        equipment: 'body_only',
        difficulty: formData.difficulty,
        type: 'strength'
      }
    ],
    arms: [
      {
        name: 'Bicep Curls',
        instructions: 'Hold dumbbells at your sides with palms facing forward. Curl the weights up to your shoulders, then lower with control.',
        muscle: 'biceps',
        equipment: 'dumbbell',
        difficulty: formData.difficulty,
        type: 'strength'
      },
      {
        name: 'Tricep Dips',
        instructions: 'Sit on the edge of a chair with hands beside your hips. Lower your body down, then press back up.',
        muscle: 'triceps',
        equipment: 'body_only',
        difficulty: formData.difficulty,
        type: 'strength'
      }
    ],
    back: [
      {
        name: 'Pull-ups',
        instructions: 'Hang from a pull-up bar with palms facing away. Pull your body up until your chin is over the bar.',
        muscle: 'lats',
        equipment: 'pull_up_bar',
        difficulty: formData.difficulty,
        type: 'strength'
      },
      {
        name: 'Bent-over Rows',
        instructions: 'Bend at the hips holding dumbbells. Pull the weights to your ribcage, squeezing your shoulder blades together.',
        muscle: 'lats',
        equipment: 'dumbbell',
        difficulty: formData.difficulty,
        type: 'strength'
      }
    ],
    shoulders: [
      {
        name: 'Shoulder Press',
        instructions: 'Stand with dumbbells at shoulder height. Press the weights straight up overhead, then lower with control.',
        muscle: 'shoulders',
        equipment: 'dumbbell',
        difficulty: formData.difficulty,
        type: 'strength'
      },
      {
        name: 'Lateral Raises',
        instructions: 'Hold dumbbells at your sides. Raise your arms out to the sides until parallel with the floor.',
        muscle: 'shoulders',
        equipment: 'dumbbell',
        difficulty: formData.difficulty,
        type: 'strength'
      }
    ],
    abs: [
      {
        name: 'Crunches',
        instructions: 'Lie on your back with knees bent. Lift your shoulders off the ground, engaging your core.',
        muscle: 'abdominals',
        equipment: 'body_only',
        difficulty: formData.difficulty,
        type: 'strength'
      },
      {
        name: 'Plank',
        instructions: 'Hold a push-up position with your body straight from head to heels. Engage your core throughout.',
        muscle: 'abdominals',
        equipment: 'body_only',
        difficulty: formData.difficulty,
        type: 'strength'
      }
    ],
    glutes: [
      {
        name: 'Hip Thrusts',
        instructions: 'Lie on your back with knees bent. Squeeze your glutes and lift your hips up, forming a straight line.',
        muscle: 'glutes',
        equipment: 'body_only',
        difficulty: formData.difficulty,
        type: 'strength'
      },
      {
        name: 'Glute Bridges',
        instructions: 'Lie on your back with knees bent. Lift your hips by squeezing your glutes, then lower slowly.',
        muscle: 'glutes',
        equipment: 'body_only',
        difficulty: formData.difficulty,
        type: 'strength'
      }
    ]
  };

  const muscleExercises = baseExercises[formData.muscleGroup] || baseExercises.chest;
  
  return muscleExercises.map(exercise => ({
    ...exercise,
    sets: getDifficultyBasedSets(formData.difficulty),
    reps: getDifficultyBasedReps(formData.difficulty, exercise.type)
  }));
} 