import React, { useState } from 'react';
import { Dumbbell, Loader2 } from 'lucide-react';
import { FormData } from '../types';

interface WorkoutFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<FormData>({
    muscleGroup: '',
    difficulty: ''
  });

  const muscleGroups = [
    { value: 'chest', label: 'Chest' },
    { value: 'legs', label: 'Legs' },
    { value: 'arms', label: 'Arms' },
    { value: 'back', label: 'Back' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'abs', label: 'Abs' },
    { value: 'glutes', label: 'Glutes' }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'expert', label: 'Advanced' }
  ];

  const handleSubmit = () => {
    if (formData.muscleGroup && formData.difficulty) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Muscle Group
          </label>
          <select
            value={formData.muscleGroup}
            onChange={(e) => setFormData({ ...formData, muscleGroup: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select muscle group</option>
            {muscleGroups.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select difficulty</option>
            {difficultyLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!formData.muscleGroup || !formData.difficulty || loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Dumbbell className="w-5 h-5" />
            <span>Generate Workout</span>
          </>
        )}
      </button>
    </div>
  );
}; 