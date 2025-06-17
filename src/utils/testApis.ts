// Utility to test API integrations
import { fetchExercises } from './apiNinjasApi';
import { FormData } from '../types';

export async function testApiNinjas() {
  console.log('🧪 Testing API-Ninjas integration...');
  
  const testCases: FormData[] = [
    { muscleGroup: 'chest', difficulty: 'beginner' },
    { muscleGroup: 'legs', difficulty: 'intermediate' },
    { muscleGroup: 'arms', difficulty: 'expert' }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n📋 Testing: ${testCase.muscleGroup} at ${testCase.difficulty} level`);
      const exercises = await fetchExercises(testCase);
      console.log(`✅ Success: Found ${exercises.length} exercises`);
      console.log('First exercise:', exercises[0]?.name || 'None');
    } catch (error) {
      console.log(`❌ Failed:`, error);
    }
  }
}

export function checkApiKeys() {
  console.log('🔑 Checking API keys...');
  
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;
  const apiNinjasKey = import.meta.env.VITE_API_NINJAS_KEY;
  
  console.log('Groq API Key:', groqKey ? '✅ Present' : '❌ Missing');
  console.log('API-Ninjas Key:', apiNinjasKey ? '✅ Present' : '❌ Missing');
  
  if (!groqKey || !apiNinjasKey) {
    console.log('\n📝 To fix: Create a .env file with:');
    console.log('VITE_GROQ_API_KEY=your-groq-key');
    console.log('VITE_API_NINJAS_KEY=your-api-ninjas-key');
    console.log('\nSee API_SETUP.md for details');
  }
  
  return { groqKey: !!groqKey, apiNinjasKey: !!apiNinjasKey };
} 