# Product Requirements Document (PRD): Workout Planner App

## 1. Overview
The Workout Planner App is a single-page web application that allows users to input basic workout preferences (muscle group and difficulty level) and generates personalized exercise routines. It fetches exercise data from the API-Ninjas Exercise API and uses the Groq SDK to create tailored workout plans based on user input and API data. The app is built using Vite, React, TypeScript, and Tailwind CSS 4.0 for a modern, responsive UI, designed to be live-coded in 30–40 minutes.

### 1.1 Purpose
Provide users with a quick, interactive way to generate customized workout routines, showcasing real-time API integration and AI-driven content generation in a visually appealing interface.

### 1.2 Scope
This MVP focuses on:
- User input for muscle group (e.g., chest, legs) and difficulty (beginner, intermediate, advanced).
- Fetching relevant exercises from the API-Ninjas Exercise API.
- Generating a workout routine using Groq SDK based on user input and API data.
- Displaying the routine in a clean, card-based UI.
- Minimal, polished styling with Tailwind CSS 4.0.

Out of scope (for live-coding time constraint):
- User authentication or data persistence.
- Complex state management (e.g., Redux).
- Advanced filtering or multiple API calls.

## 2. Target Audience
- Fitness enthusiasts looking for quick workout ideas.
- Developers watching a live-coding demo to see React, TypeScript, API integration, and AI in action.
- Users interested in modern web tech (Vite, Tailwind).

## 3. Features and Requirements

### 3.1 User Interface
- **Input Form**:
  - Dropdown for muscle group (e.g., chest, legs, arms, back).
  - Dropdown for difficulty level (beginner, intermediate, advanced).
  - Submit button to generate the workout routine.
- **Workout Display**:
  - Card-based layout showing the AI-generated workout routine (exercise names, reps, sets, and instructions).
  - Loading state while fetching API data or AI response.
  - Error message for invalid inputs or API failures.
- **Styling**:
  - Responsive design using Tailwind CSS 4.0.
  - Clean, modern aesthetic with a fitness theme (e.g., bold colors, centered layout).
  - Mobile-friendly with Flexbox and responsive typography.

### 3.2 Functionality
- **User Input**:
  - Users select a muscle group and difficulty via dropdowns.
  - Input is validated (non-empty selections) before API calls.
- **API Integration**:
  - Fetch exercises from API-Ninjas Exercise API (`https://api.api-ninjas.com/v1/exercises`) using the muscle group and difficulty as query parameters.
  - Requires API key (assumed pre-obtained for live-coding).
- **AI Routine Generation**:
  - Send user inputs (muscle group, difficulty) and API-fetched exercise data to Groq SDK.
  - Groq SDK generates a structured workout routine (e.g., "3 sets of 10 reps for [Exercise Name]").
- **Data Display**:
  - Render the AI-generated routine in a list of cards, each showing exercise name, reps, sets, and instructions.
- **Error Handling**:
  - Display user-friendly error messages for API failures or invalid inputs.
  - Show loading spinner during API and AI calls.

### 3.3 Technical Requirements
- **Stack**:
  - **Frontend**: Vite, React, TypeScript.
  - **Styling**: Tailwind CSS 4.0 (via CDN or installed).
  - **APIs**:
    - API-Ninjas Exercise API for exercise data.
    - Groq SDK for AI-generated workout routines.
  - **Dependencies**:
    - `groq-sdk` for AI integration.
    - `axios` or `fetch` for API calls.
    - Tailwind CSS 4.0 for styling.
- **Constraints**:
  - Must be live-coded in 30–40 minutes.
  - Single-page app, no backend or database.
  - Minimal external libraries to reduce setup time.
  - API key for API-Ninjas pre-configured.
  - Groq SDK key pre-configured (assumed available for demo).

## 4. User Flow
1. User lands on the app’s homepage.
2. User selects a muscle group and difficulty level from dropdowns.
3. User clicks “Generate Workout” button.
4. App fetches exercises from API-Ninjas Exercise API based on inputs.
5. App sends exercise data and user inputs to Groq SDK to generate a workout routine.
6. App displays the routine in a card-based layout or shows an error if the request fails.
7. User can modify inputs and generate a new routine.

## 5. Technical Design
### 5.1 File Structure
```
src/
├── components/
│   ├── WorkoutForm.tsx  # Form for user inputs
│   ├── WorkoutDisplay.tsx  # Displays AI-generated routine
├── App.tsx  # Main component with state and API logic
├── index.css  # Tailwind CSS imports and global styles
├── main.tsx  # Vite entry point
```

### 5.2 Key Components
- **WorkoutForm.tsx**:
  - TypeScript interface for form data (muscleGroup: string, difficulty: string).
  - Dropdowns for muscle group and difficulty.
  - Submit button triggers parent callback to fetch data.
- **WorkoutDisplay.tsx**:
  - TypeScript interface for exercise data (name, instructions, reps, sets).
  - Renders a list of cards with exercise details.
  - Handles loading and error states.
- **App.tsx**:
  - Manages state (form inputs, exercises, loading, error).
  - Handles API calls to API-Ninjas and Groq SDK.
  - Integrates components and passes props.

### 5.3 API Integration
- **API-Ninjas Exercise API**:
  - Endpoint: `GET https://api.api-ninjas.com/v1/exercises?muscle={muscle}&difficulty={difficulty}`.
  - Headers: `X-Api-Key: <key>`.
  - Response: Array of exercises with name, instructions, etc.
- **Groq SDK**:
  - Send a prompt combining user inputs and API exercise data.
  - Example prompt: “Generate a workout routine for {muscle} at {difficulty} level using these exercises: {exerciseData}.”
  - Parse AI response into structured data (e.g., JSON with exercises, reps, sets).

### 5.4 Styling
- Use Tailwind CSS  via `npm install -D tailwindcss postcss autoprefixer` and `npx tailwindcss init -p`.
- Configure `tailwind.config.js` for Tailwind 4.0.
- Apply classes for:
  - Flexbox layout (`flex`, `justify-center`, `items-center`).
  - Card styling (`bg-white`, `shadow-lg`, `rounded-lg`, `p-4`).
  - Responsive design (`sm:`, `md:` prefixes).
  - Fitness-themed colors (`bg-blue-500`, `text-white`).

## 6. Assumptions and Constraints
- **Assumptions**:
  - API-Ninjas API key is pre-obtained and works during live-coding.
  - Groq SDK is pre-configured with an API key.
  - Vite project is pre-initialized to save setup time.
  - Internet connection is stable for API calls.
- **Constraints**:
  - Live-coding must be completed in 30–40 minutes.
  - No backend or persistent storage.
  - Limited to 3–5 exercises per routine to keep AI response parsing simple.
  - Basic error handling (e.g., API failure, invalid inputs).

## 7. Success Criteria
- App successfully fetches exercises from API-Ninjas based on user inputs.
- Groq SDK generates a coherent workout routine displayed in the UI.
- UI is responsive, visually appealing, and error-free.
- Live-coding is completed within 40 minutes, with clear explanations of each step.
- App handles edge cases (e.g., API errors, empty responses) gracefully.

## 8. Live-Coding Plan
**Total Time**: 30–40 minutes  
- **0–5 min**: Set up Vite project (assumed pre-initialized), install Tailwind CSS, and verify API keys.
- **5–15 min**: Build `WorkoutForm.tsx` with dropdowns and submit button; style with Tailwind.
- **15–25 min**: Implement `App.tsx` with API-Ninjas fetch, Groq SDK integration, and state management.
- **25–35 min**: Create `WorkoutDisplay.tsx` to render workout cards; add loading/error states.
- **35–40 min**: Polish styling, test app, and demo user flow.

## 9. Risks and Mitigations
- **Risk**: API-Ninjas or Groq SDK fails during live-coding.
  - **Mitigation**: Pre-test API endpoints and have mock data ready.
- **Risk**: Time overrun due to debugging.
  - **Mitigation**: Keep logic simple (e.g., minimal error handling, no complex state).
- **Risk**: Tailwind CSS setup issues.
  - **Mitigation**: Use pre-configured `tailwind.config.js` and test locally before live-coding.

## 10. Future Enhancements
- Add more input options (e.g., workout duration, equipment).
- Save routines to local storage.
- Allow users to customize reps/sets manually.
- Integrate animations for card transitions.
