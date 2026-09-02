# Smriti Saathi NER 

Smriti Saathi is an accessible cognitive-gaming and memory-assistance prototype for older adults, caregivers and health workers in India’s North Eastern Region.

> This prototype supports cognitive engagement and everyday routines. It does not diagnose, cure or prevent dementia and is not a replacement for qualified medical care.

## Project description

Smriti Saathi is an offline-first digital companion designed for elderly people living with memory challenges, their families and frontline care teams. It brings cognitive engagement, familiar cultural learning, daily routine support and permission-based caregiver visibility into one simple application.

The platform is designed around low digital confidence and inconsistent connectivity in the North Eastern Region. Its interface uses large controls, simple navigation, accessible onboarding and browser-based local storage so core activities remain available even before a future cloud deployment is added.

### Core features

- **Cognitive games:** Memory Match, Sequence Glow and Daily Steps offer short, low-pressure engagement activities.
- **Learn & Remember:** Familiar local knowledge can be shown as a small learning card and later revisited through a gentle recall activity.
- **Memory Garden:** Approved photos, names, places and family memories can become supportive personal cues.
- **Daily assistance:** Medication, hydration, appointments and routine reminders can be acknowledged from the elder-friendly view.
- **Caregiver dashboard:** Caregivers can view concise, consent-led activity and reminder trends rather than intrusive raw data.
- **Health-worker workflow:** Assisted onboarding, dashboards and printable care reports support community use.
- **Accessibility:** Clear text, role-specific screens and low-complexity interaction patterns are built into the prototype.
- **Privacy by design:** The prototype demonstrates role separation, demo controls and an explicit non-diagnostic boundary.

### Technology stack

- Next.js / React with TypeScript
- Vite-based development tooling
- Tailwind / shadcn-style accessible UI components
- Browser LocalStorage for prototype state
- Demo API routes under `app/api/v1`
- Drizzle configuration prepared for future database integration

### Future production path

The current build is a working prototype. A production rollout can add Firebase Authentication, FastAPI validation services, Firestore or PostgreSQL, offline event sync, push notifications, verified BHASHINI language support, encrypted storage, audit logs and human-supervised safety workflows.

## Fastest way to run on Windows

1. Install **Node.js 22 or newer** from https://nodejs.org/.
2. Extract the ZIP file completely.
3. Open the extracted `Smriti-Saathi-VSCode` folder in VS Code.
4. Double-click `START_SMRITI_SAATHI.bat`.
5. Wait for the installation to complete.
6. Ctrl+click the Local URL displayed in the terminal.

## Run using the VS Code terminal

Open **Terminal > New Terminal**, then run:

```bash
npm install
npm run dev
```

Open the Local URL shown in the terminal. To stop the app, press `Ctrl + C`.

## Production check

```bash
npm run build
npm run lint
```

## Main routes

- `/` - Landing page
- `/select-role` - Role selection
- `/onboarding` - Accessible onboarding
- `/elderly/home` - Elderly dashboard
- `/elderly/games` - Cognitive games hub
- `/elderly/games/memory-match` - Memory Match
- `/elderly/games/sequence-glow` - Sequence Glow
- `/elderly/games/daily-steps` - Daily Steps
- `/elderly/memory-garden` - Personal Memory Garden
- `/elderly/reminders` - Routine reminders
- `/elderly/family` - Approved family support
- `/caregiver/dashboard` - Caregiver analytics
- `/health-worker/dashboard` - Health-worker workflow
- `/reports` - Printable care report
- `/accessibility` - Accessibility information
- `/settings` - Privacy and demo controls

## Prototype backend endpoints

- `GET /api/v1/health`
- `GET /api/v1/plan/today`
- `GET /api/v1/trends`
- `GET /api/v1/reminders`
- `POST /api/v1/onboarding`
- `POST /api/v1/sessions`
- `POST /api/v1/responses`
- `POST /api/v1/reminders`
- `POST /api/v1/caregiver-links`
- `DELETE /api/v1/profile`

## Data storage

The prototype requires no API keys. Game results, reminders, memories, role, language and accessibility settings are stored in the browser’s LocalStorage. The API routes return safe demo data and are ready to be connected to Firebase, PostgreSQL or another production database later.

## Important folders

```text
app/
  api/v1/                 Demo backend routes
  smriti/                 App pages, games, state and components
components/ui/            Accessible UI primitives
public/                   Static assets
tests/                    Project tests
```

## If it does not start

- Confirm Node.js is installed: `node --version`
- Confirm npm is installed: `npm --version`
- Open the folder containing `package.json`, not its parent folder.
- Delete only the `node_modules` folder, then run `npm install` again.
- Use Chrome, Edge or Firefox updated to a recent version.
