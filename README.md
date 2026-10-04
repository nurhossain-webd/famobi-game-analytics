# Neon Snake – Famobi Game Analytics

This project extends the Neon Snake browser game with Famobi Game SDK integration, gameplay analytics, a Node.js backend, Firebase Firestore storage using the Local Emulator Suite, and a React analytics dashboard.

The implementation is designed to run completely locally and does not require a real Firebase project.

## Tech Stack

- Game: Phaser 3, TypeScript, Vite
- Famobi Game SDK
- Backend: Node.js, Express, TypeScript
- Database: Firebase Firestore Emulator
- Dashboard: React, TypeScript, Vite, Recharts

## Project Structure

```text
.
├── src/                    # Neon Snake game and integrations
│   ├── application/
│   ├── core/
│   ├── game/
│   ├── integrations/
│   │   ├── FamobiAdapter.ts
│   │   └── AnalyticsClient.ts
│   └── main.ts
├── backend/                # Express analytics API
├── dashboard/              # React analytics dashboard
├── firebase.json           # Firebase Emulator configuration
├── .firebaserc
└── README.md
```

## Architecture

The application uses the existing game events as the integration boundary.

```text
Neon Snake
    │
    ├── FamobiAdapter
    │       └── Famobi Game SDK
    │
    └── AnalyticsClient
            │
            ▼
       Express Backend
            │
            ▼
     Firestore Emulator
            │
            ▼
      React Dashboard
```

The game mechanics remain independent from the SDK and analytics implementation.

## Prerequisites

Install:

- Node.js 22 or newer
- pnpm
- Firebase CLI
- Java 21 or another Java version supported by the Firebase Emulator Suite

No Firebase credentials or real Firebase project are required.

## Installation

Install the game dependencies from the repository root:

```bash
pnpm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install dashboard dependencies:

```bash
cd ../dashboard
npm install
```

Then return to the repository root:

```bash
cd ..
```

## Running the Application

The application uses four local processes.

### 1. Start Firebase Firestore Emulator

From the repository root:

```bash
firebase emulators:start --only firestore
```

Configured local services:

- Firestore: `localhost:8080`
- Emulator UI: `localhost:4000`

The emulator uses the local project ID `famobi-local`.

### 2. Start the Backend

In another terminal:

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:3001
```

Health check:

```text
GET http://localhost:3001/health
```

### 3. Start the Game

From the repository root:

```bash
pnpm dev
```

Open the URL printed by Vite.

### 4. Start the Dashboard

In another terminal:

```bash
cd dashboard
npm run dev
```

Open the URL printed by Vite.

## Famobi SDK Integration

The Famobi integration is implemented in:

```text
src/integrations/FamobiAdapter.ts
```

The integration maps existing game lifecycle events to the Famobi Game SDK.

Implemented behavior includes:

- Game loading completion
- Game ready
- Gameplay start
- Gameplay end
- Score updates
- Progress updates
- Player pause
- Player resume

Neon Snake does not preload external game assets in the Phaser scene. The game graphics and audio are generated programmatically, so preload progress is reported as 100% when the game scene becomes ready.

The integration was tested locally using the Famobi local testing interface and browser developer console.

## Gameplay Analytics

Analytics are sent from:

```text
src/integrations/AnalyticsClient.ts
```

Two event types are stored.

### Game Start

```json
{
  "type": "game_start",
  "level": 1,
  "timestamp": 1234567890
}
```

### Game End

```json
{
  "type": "game_end",
  "level": 1,
  "outcome": "complete",
  "score": 50,
  "progress": 100,
  "timestamp": 1234567890
}
```

Possible outcomes are:

```text
complete
fail
left
```

The game's internal score is cumulative across levels. For analytics, the stored score represents the points earned during the individual level so that score comparisons between levels remain meaningful.

Progress is stored as a percentage from 0 to 100.

## Backend API

### POST `/api/events`

Receives gameplay analytics and stores valid events in the Firestore Emulator.

The backend validates:

- event type
- level
- timestamp
- outcome for game-end events
- score
- progress

Invalid events return a `400` response and are not stored.

### GET `/api/analytics`

Returns the stored gameplay events ordered by timestamp.

The React dashboard uses this endpoint to load its analytics data.

### GET `/health`

Simple backend health check.

## Firebase Data Structure

Events are stored in the Firestore collection:

```text
gameplayEvents
```

Each document represents one `game_start` or `game_end` event.

Only the Firebase Local Emulator Suite is used. No production Firebase credentials, service account files, or secrets are required.

## Analytics Dashboard

The React dashboard displays:

- Total completed/ended runs
- Average score
- Completion rate
- Run outcomes
- Average score by level

The dashboard includes two graphs:

1. Run Outcomes – compares complete, failed, and left runs.
2. Average Score by Level – compares the average points earned during each level.

The dashboard intentionally focuses on clarity and the required analytics rather than additional UI features.

## Testing the Complete Flow

1. Start the Firestore Emulator.
2. Start the backend.
3. Start the game.
4. Start the dashboard.
5. Play the game.
6. Complete, fail, or leave a run.
7. Open the Firebase Emulator UI at `http://localhost:4000`.
8. Verify the events appear in the `gameplayEvents` collection.
9. Refresh the dashboard.
10. Verify that the overview values and graphs reflect the stored gameplay data.

The complete flow is:

```text
Gameplay
   ↓
Analytics event
   ↓
Express API
   ↓
Firestore Emulator
   ↓
Analytics API
   ↓
React Dashboard
```

## Checks and Builds

Game:

```bash
pnpm check
```

Backend:

```bash
cd backend
npm run build
```

Dashboard:

```bash
cd dashboard
npm run build
```

## Technical Decisions

The existing `GameController` events are used for both SDK and analytics integration instead of modifying the core Snake game logic. This keeps the integrations separate from the game mechanics.

Analytics are intentionally limited to gameplay start and end events because these events provide the information required for the assessment without introducing unnecessary complexity.

The backend uses simple manual validation because the API contains only two small event types.

The Firebase Emulator is used exclusively so the application can be tested without credentials or a real Firebase project.

## Assumptions and Limitations

- The application is intended for local development and assessment use.
- The frontend analytics endpoint is currently configured as `http://localhost:3001/api/events`.
- Dashboard data is loaded from `http://localhost:3001/api/analytics`.
- Firebase Emulator data may be cleared between emulator sessions.
- Analytics do not currently include player accounts or persistent session identifiers.
- Player-triggered pause and resume are integrated with the Famobi SDK.
- The dashboard loads analytics when the page is loaded or refreshed rather than updating in real time.

## With More Time

With additional time, I would consider:

- moving local service URLs into environment configuration
- adding automated tests for API validation and analytics calculations
- adding real-time dashboard updates
- adding session/run identifiers for more detailed analytics
- extending SDK handling for additional platform lifecycle behavior

These were intentionally left out to keep the assessment implementation focused and within the requested scope.

## External Tools / AI Disclosure

External documentation and AI-assisted development tools were used during development for understanding unfamiliar APIs, reviewing implementation decisions, debugging, and development guidance.

All generated or suggested code was reviewed, tested, and adapted to the project before inclusion. The final implementation was verified locally through gameplay testing, Firebase Emulator inspection, API testing, and TypeScript/build checks.
