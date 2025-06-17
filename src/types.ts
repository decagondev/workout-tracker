// Breathing Exercise Types
export type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'idle';

export interface BreathingTimerState {
  isActive: boolean;
  phase: BreathingPhase;
  phaseTimeRemaining: number;
  sessionDuration: number; // in minutes
  sessionTimeRemaining: number; // in seconds
  cycleCount: number;
}

export interface BreathingCircleProps {
  phase: BreathingPhase;
  timeRemaining: number;
}

export interface ControlPanelProps {
  isActive: boolean;
  sessionDuration: number;
  onToggle: () => void;
  onDurationChange: (duration: number) => void;
}

export interface ProgressInfoProps {
  cycleCount: number;
  timeRemaining: number;
}

// Workout Planner Types
export interface FormData {
  muscleGroup: string;
  difficulty: string;
}

export interface Exercise {
  name: string;
  instructions: string;
  reps?: string;
  sets?: string;
  muscle?: string;
  equipment?: string;
  difficulty?: string;
  type?: string;
}

export interface EnhancedExercise extends Exercise {
  id: string;
  aiInsights?: string;
  properForm?: string[];
  commonMistakes?: string[];
  variations?: string[];
  targetMuscles?: string[];
  benefits?: string[];
  safetyTips?: string[];
}

export interface WorkoutRoutine {
  exercises: EnhancedExercise[];
  totalDuration?: number;
  tips?: string[];
  aiDescription?: string;
  targetGoals?: string[];
  estimatedCalories?: number;
}

export interface DetailedWorkoutView {
  exercise: EnhancedExercise;
  isVisible: boolean;
}