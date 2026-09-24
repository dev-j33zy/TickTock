# Ticktock Timer

A focused timer app built with Next.js. Ticktock supports countdown and count-up timers, pause and resume controls, configurable display options, and browser-based session persistence.

## Features

- Countdown timers with preset or custom durations
- Count-up timers for elapsed-time tracking
- Start, pause, resume, and reset controls
- Optional repeat behavior when a countdown reaches zero
- Alarm notification when a countdown stops at zero
- Time formats for hours, minutes, and seconds
- Optional centisecond display
- Adjustable display font and size
- Light and dark themes
- Settings and timer state persisted in `localStorage`
- Optional Next.js development-tools indicator

## Tech Stack

- Next.js 16
- React 19
- JavaScript
- CSS Modules
- Browser `localStorage` for persistence

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
npm run lint:fix # Apply ESLint fixes
```

## Using the Timer

1. Open the settings panel with the controls button.
2. Choose `Countdown` or `Count up`.
3. For countdown mode, select a preset or enter a custom duration.
4. Choose the display format and appearance settings.
5. Select `Start` to begin timing.
6. Select `Pause` to hold the current time, then `Resume` to continue from that point.
7. Select `Reset` to clear the current elapsed time.

Countdown mode can be configured to stop or automatically repeat when it reaches zero. Count-up mode continues from its accumulated elapsed time after a pause.

## Project Structure

```text
app/
  page.jsx             # Application entry page
  layout.jsx           # Root layout and metadata
components/
  TimerApp.jsx         # Timer state, controls, and display
  SettingsPanel.jsx    # Timer and appearance settings
lib/
  time.js              # Time conversion and formatting helpers
  storage.js           # Persisted browser state hook
  fonts.js             # Display font definitions
```

## Persistence

Timer settings and the current session are stored in the browser under these `localStorage` keys:

- `timer.settings`
- `timer.session`

Clearing site data resets the app to its default settings and five-minute countdown session.

## Repository Description

Ticktock is a minimalist Next.js timer for countdowns, elapsed-time tracking, and large-format display customization.
