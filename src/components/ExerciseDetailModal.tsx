import React from 'react';
import { X, Target, AlertTriangle, Lightbulb, Zap, Shield, Users } from 'lucide-react';
import { EnhancedExercise } from '../types';

interface ExerciseDetailModalProps {
  exercise: EnhancedExercise | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  isOpen,
  onClose
}) => {
  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-8 h-8" />
            <h2 className="text-3xl font-bold">{exercise.name}</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {exercise.muscle && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {exercise.muscle}
              </span>
            )}
            {exercise.equipment && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {exercise.equipment}
              </span>
            )}
            {exercise.difficulty && (
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {exercise.difficulty}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Sets and Reps */}
          {(exercise.sets || exercise.reps) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Workout Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {exercise.sets && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{exercise.sets}</div>
                    <div className="text-sm text-gray-600">Sets</div>
                  </div>
                )}
                {exercise.reps && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{exercise.reps}</div>
                    <div className="text-sm text-gray-600">Reps</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Insights */}
          {exercise.aiInsights && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">AI Insights</h3>
              </div>
              <p className="text-blue-700 leading-relaxed">{exercise.aiInsights}</p>
            </div>
          )}

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
            <p className="text-gray-600 leading-relaxed">{exercise.instructions}</p>
          </div>

          {/* Proper Form */}
          {exercise.properForm && exercise.properForm.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Proper Form</h3>
              </div>
              <ul className="space-y-2">
                {exercise.properForm.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common Mistakes */}
          {exercise.commonMistakes && exercise.commonMistakes.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">Common Mistakes to Avoid</h3>
              </div>
              <ul className="space-y-2">
                {exercise.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold">⚠</span>
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {exercise.benefits && exercise.benefits.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-800">Benefits</h3>
              </div>
              <ul className="space-y-2">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-500 font-bold">★</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Target Muscles */}
          {exercise.targetMuscles && exercise.targetMuscles.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Target Muscles</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {exercise.targetMuscles.map((muscle, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Safety Tips */}
          {exercise.safetyTips && exercise.safetyTips.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">Safety Tips</h3>
              </div>
              <ul className="space-y-2">
                {exercise.safetyTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">🛡</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variations */}
          {exercise.variations && exercise.variations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Exercise Variations</h3>
              <div className="grid gap-3">
                {exercise.variations.map((variation, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-700">{variation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 