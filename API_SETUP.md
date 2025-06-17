# API Setup Guide for Workout Planner

This workout planner integrates with two APIs to provide AI-powered exercise recommendations:

## Required API Keys

### 1. Groq API (for AI insights)
- **Website**: https://console.groq.com/
- **Purpose**: Generates personalized exercise insights, form tips, and workout descriptions
- **Environment Variable**: `VITE_GROQ_API_KEY`

### 2. API-Ninjas Exercise API (for exercise data)
- **Website**: https://api.api-ninjas.com/
- **Purpose**: Fetches exercise data based on muscle groups and difficulty levels
- **Environment Variable**: `VITE_API_NINJAS_KEY`

## Setup Instructions

1. **Create a `.env` file** in your project root:
   ```bash
   touch .env
   ```

2. **Add your API keys** to the `.env` file:
   ```env
   VITE_GROQ_API_KEY=your-groq-api-key-here
   VITE_API_NINJAS_KEY=your-api-ninjas-key-here
   ```

3. **Restart your development server** after adding the keys:
   ```bash
   npm run dev
   ```

## Fallback Behavior

- If API keys are missing or APIs fail, the app will use mock data
- Exercise enhancement will fall back to basic information
- Error messages will guide users to check their API configuration

## Features Enabled by APIs

### With API-Ninjas:
- Real exercise data for different muscle groups
- Difficulty-appropriate exercise selection
- Equipment and type categorization

### With Groq AI:
- Personalized exercise insights
- Proper form guidance
- Common mistakes to avoid
- Exercise benefits and variations
- Safety tips and target muscle information
- Motivational workout descriptions

## Testing the Integration

1. Select a muscle group and difficulty level
2. Click "Generate Workout"
3. Check the browser console for API call logs
4. Click on any exercise card to see detailed AI insights 