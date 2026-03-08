# 🎓 Univisor

Your **24/7 AI-powered academic advisor** for UT Dallas students. Get personalized course recommendations, graduation timelines, and degree planning assistance powered by Google Gemini.

**Built for HackAI 2026** | UT Dallas Hackathon

---

## ✨ Features

- 🤖 **AI Chat Advisor** - Ask anything about your degree, courses, or graduation timeline
- 📋 **Degree Planning** - Semester-by-semester course breakdown with prerequisite tracking
- 📊 **Progress Tracking** - Real-time graduation progress and credit calculations
- 🔀 **What-If Simulator** - Explore major changes, minors, and course loads
- 📱 **Cross-Platform** - Works on iOS, Android, and Web
- 🏫 **Real UTD Data** - Accurate course requirements for 4 majors and 3 minors

---

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Setup (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create .env file by copying the example
cp .env.example .env

# 3. Add your Gemini API key to .env
# EXPO_PUBLIC_GEMINI_KEY=your-api-key-here

# 4. Start the app
npm start
```

### Run on Your Phone
1. Download **Expo Go** (free app)
2. Scan the QR code shown in terminal
3. App loads instantly!

---

## 📁 Project Structure

```
├── api/
│   ├── gemini.js          # Gemini AI API integration
│   └── nebula.js          # UT Dallas course data
├── components/
│   ├── Login.js           # Onboarding & profile setup
│   ├── Dashboard.js       # Home screen with progress
│   ├── ChatAdvisor.js     # AI chat interface
│   ├── CourseList.js      # Course recommendations
│   ├── WhatIfSimulator.js # Major/minor scenarios
│   ├── DegreePlan.js      # Semester schedule
│   ├── Profile.js         # Student settings
│   ├── TranscriptUpload.js# PDF transcript upload
│   ├── Auth.js            # Authentication
│   └── Navigation.js      # Tab navigation
├── data/
│   └── requirements.js    # Degree requirements
├── App.js                 # Main entry point
└── package.json
```

---

## 🛠 Technology Stack

- **Frontend**: React Native + Expo
- **AI**: Google Gemini 1.5 Flash
- **Data**: Real UTD course requirements
- **File Upload**: expo-document-picker
- **UI Components**: React Native built-in

---

## 🎯 Supported Majors & Minors

**Majors:**
- Software Engineering
- Neuroscience
- Cybersecurity
- Art

**Minors:**
- Business
- Data Science
- Mathematics

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_GEMINI_KEY=your-gemini-api-key-here
```

The API key is loaded from environment variables and **not** committed to git for security.

---

## 📱 Running the App

### Development

```bash
# Start Expo dev server
npm start

# Then choose:
# - Press i for iOS simulator
# - Press a for Android emulator
# - Scan QR code for Expo Go on phone
# - Press w for web browser
```

### Production Build

```bash
# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios
```

---

## 💡 Usage Examples

### 1. Set Up Your Profile
- Enter your name, major, and completed courses
- App calculates your graduation timeline

### 2. Ask the AI Advisor
- "What courses should I take next semester?"
- "When will I graduate?"
- "What if I switch to Cybersecurity?"

### 3. Upload Your Transcript  
- Select your PDF transcript
- Courses are automatically extracted

### 4. Plan Your Semester
- View recommended courses
- See what's blocked by prerequisites
- Get full degree plan

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | Run `npm install` again or `expo start -c` to clear cache |
| can't scan QR code | Ensure phone and computer are on same WiFi networks |
| API key not working | Verify key in `.env` and has Generative Language API enabled |
| PDF upload fails | Ensure file is readable and device has file picker permissions |

---

## 📚 API Integration

### Gemini API
- Provides personalized AI responses
- Fallback to demo responses if API unavailable
- Respects rate limits and error handling

### Nebula Labs
- Real UT Dallas course data
- Prerequisite tracking
- Course information (credits, descriptions)

---

## 🤝 Contributing

This project was built for HackAI 2026 at UT Dallas.

---

## 📄 License

Built for HackAI 2026 | UT Dallas

---

**Happy planning! 🎓**
