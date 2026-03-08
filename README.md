# AI Graduate Advisor - Mobile App

**Your 24/7 AI-powered academic advisor, built on real UTD course data**

HackAI 2026 Project | March 7-8, 2026 | UT Dallas

## What It Does

AI Graduate Advisor helps UTD students:
- Track degree progress in real-time
- Get personalized AI-powered academic advice
- Simulate what-if scenarios (switching majors, adding minors)
- Plan semester-by-semester course schedules
- Identify missing requirements and prerequisites

## Tech Stack

- **Framework**: React Native with Expo
- **AI**: Google Gemini 1.5 Flash API
- **Data**: Nebula Labs API (real UTD course data)
- **Platforms**: iOS, Android, Web
- **Supported Majors**: Software Engineering, Neuroscience, Cybersecurity, Art

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Gemini API Key (Optional for Demo)

- Get free key: https://aistudio.google.com/app/apikey
- Edit `api/gemini.js` and replace `YOUR_GEMINI_API_KEY_HERE`
- Set `USE_DEMO = false` in `components/ChatAdvisor.js`

### 3. Run the App

**On Android:**
```bash
npm run android
```

**On iOS (Mac only):**
```bash
npm run ios
```

**On Web Browser:**
```bash
npm run web
```

**Using Expo Go App (Easiest for Testing):**
1. Install Expo Go on your phone from App Store/Play Store
2. Run `npm start`
3. Scan the QR code with your phone camera
4. App opens in Expo Go

## Project Structure

```
graduate-advisor-mobile/
├── api/
│   ├── gemini.js       # Gemini API integration
│   └── nebula.js       # Nebula Labs API integration
├── components/
│   ├── Login.js        # Onboarding/profile setup
│   ├── Dashboard.js    # Main home screen
│   ├── CourseList.js   # Course recommendations
│   ├── ChatAdvisor.js  # AI chat interface
│   ├── WhatIfSimulator.js # Major/minor simulator
│   ├── DegreePlan.js   # Semester-by-semester plan
│   └── Navigation.js   # Bottom tab navigation
├── data/
│   └── requirements.js # Degree requirements data
├── App.js              # Main app entry point
└── package.json
```

## Features

### 1. Profile Setup
- Enter name, major, minor, completed courses
- Calculates graduation timeline automatically

### 2. Dashboard
- Progress bar showing credit completion
- Estimated graduation date
- Missing required courses alert
- Quick action buttons

### 3. Degree Plan
- Semester-by-semester course breakdown
- Prerequisite-aware scheduling
- Visual progress indicators

### 4. Course Recommendations
- Shows courses ready to take (prerequisites met)
- Highlights blocked courses (prerequisites needed)

### 5. AI Chat Advisor
- Powered by Google Gemini
- Personalized responses based on student profile
- Answers questions about courses, graduation, major changes

### 6. What-If Simulator
- Simulate major switches
- Add/remove minors
- Adjust credits per semester
- See impact on graduation timeline

## Demo Instructions

### For Judges (3-5 minute demo):

1. **Open the app** on your phone using Expo Go
2. **Profile Setup**: Enter "Alex Johnson", select "Software Engineering", add 45 credits
3. **Add Courses**: Add "CS 1336", "CS 1337", "MATH 2413"
4. **Dashboard**: Show progress bar (36%), graduation estimate (Spring 2027)
5. **AI Chat**: Ask "What should I take next semester?" - see personalized response
6. **What-If**: Switch major to "Cybersecurity" - show it adds 1 semester
7. **Degree Plan**: Show semester-by-semester breakdown

## Prize Tracks

- ✅ **General Track**: Best overall AI project
- ✅ **Nebula Labs**: Using real UTD course data
- ✅ **Dallas AI**: Personalized learning advisor
- ✅ **MLH Gemini API**: AI-powered chat advisor
- ✅ **Data Science/ML**: Course recommendation logic

## API Keys

- **Nebula API**: `AIzaSyB2zQIwK0gowd-Pkum4SHVzRVK7-PrwlUY` (included)
- **Gemini API**: Add your own from https://aistudio.google.com/app/apikey

## Building for Production

### Android APK:
```bash
eas build --platform android --profile preview
```

### iOS (requires Apple Developer account):
```bash
eas build --platform ios --profile preview
```

## Troubleshooting

**App won't start:**
- Run `npm install` again
- Clear cache: `expo start -c`

**Picker not working:**
- Make sure you ran `npm install` to get all dependencies

**Can't scan QR code:**
- Make sure phone and computer are on same WiFi
- Try typing the URL manually in Expo Go

## Team

- **Bar**: Team Lead + AI Integration
- **Teammate 2**: Frontend Developer
- **Teammate 3**: Data + QA

## License

Built for HackAI 2026 at UT Dallas

---

## Quick Start Commands

```bash
# Install everything
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run in web browser
npm run web
```

**Scan QR code with Expo Go app to test on your phone!**
