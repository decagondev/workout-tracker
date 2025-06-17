import React, { useState } from 'react';
import { Loader2, AlertCircle, Target, Clock, Repeat, Info, Zap } from 'lucide-react';
import { WorkoutRoutine, EnhancedExercise } from '../types';
import { ExerciseDetailModal } from './ExerciseDetailModal';

interface WorkoutDisplayProps {
  routine: WorkoutRoutine | null;
  loading: boolean;
  error: string | null;
}

export const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ routine, loading, error }) => {
  const [selectedExercise, setSelectedExercise] = useState<EnhancedExercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExerciseClick = (exercise: EnhancedExercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">Creating your personalized workout...</h3>
          <p className="text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-red-800">Oops! Something went wrong</h3>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!routine) {
    return null;
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Personalized Workout</h2>
          <p className="text-gray-600">Complete this routine for optimal results</p>
          
          {/* AI Description */}
          {routine.aiDescription && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-semibold">AI Workout Analysis</span>
              </div>
              <p className="text-blue-700">{routine.aiDescription}</p>
            </div>
          )}
          
          {/* Workout Stats */}
          {(routine.estimatedCalories || routine.targetGoals) && (
            <div className="flex justify-center space-x-8 mt-6">
              {routine.estimatedCalories && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{routine.estimatedCalories}</div>
                  <div className="text-sm text-gray-600">Est. Calories</div>
                </div>
              )}
              {routine.targetGoals && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{routine.targetGoals.length}</div>
                  <div className="text-sm text-gray-600">Target Goals</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {routine.exercises.map((exercise, index) => (
            <div
              key={exercise.id || index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => handleExerciseClick(exercise)}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 relative">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>{exercise.name}</span>
                </h3>
                <div className="absolute top-4 right-4">
                  <Info className="w-5 h-5 text-white opacity-70" />
                </div>
              </div>
            
            <div className="p-6 space-y-4">
              {(exercise.sets || exercise.reps) && (
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  {exercise.sets && (
                    <div className="flex items-center space-x-2">
                      <Repeat className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-gray-700">{exercise.sets} sets</span>
                    </div>
                  )}
                  {exercise.reps && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-gray-700">{exercise.reps} reps</span>
                    </div>
                  )}
                </div>
              )}
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{exercise.instructions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {routine.tips && routine.tips.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2">
            {routine.tips.map((tip, index) => (
              <li key={index} className="text-blue-700 flex items-start space-x-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}; 