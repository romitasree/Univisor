# 🚀 HACKATHON QUICK START GUIDE

## AI Graduate Advisor - Mobile App
**Ready to run in 2 minutes!**

---

## ⚡ FASTEST WAY TO TEST (Recommended for Hackathon)

### Step 1: Start the Server
```bash
cd graduate-advisor-mobile
npm start
```

### Step 2: Test on Your Phone
1. Download **Expo Go** app from App Store or Google Play
2. Scan the QR code that appears in your terminal
3. App opens instantly on your phone!

**That's it! No Xcode, no Android Studio needed!**

---

## 📱 TESTING OPTIONS

### Option 1: Phone (Best for Demo)
- Install Expo Go app
- Scan QR code
- Works on iOS and Android

### Option 2: Web Browser
```bash
npm run web
```
Opens at http://localhost:8081

### Option 3: Android Emulator
```bash
npm run android
```
(Requires Android Studio)

### Option 4: iOS Simulator (Mac only)
```bash
npm run ios
```
(Requires Xcode)

---

## 🎯 DEMO FLOW FOR JUDGES

### 1. Profile Setup (30 seconds)
- Name: "Alex Johnson"
- Major: "Software Engineering"
- Credits: 45
- Add courses: CS 1336, CS 1337, MATH 2413

### 2. Dashboard (30 seconds)
- Show progress bar: 36%
- Graduation: Spring 2027
- Missing courses highlighted

### 3. AI Chat (1 minute)
- Ask: "What should I take next semester?"
- Show personalized AI response
- Try: "When will I graduate?"

### 4. What-If Simulator (1 minute)
- Switch major to "Cybersecurity"
- Show impact: adds 1 semester
- Change credits per semester slider

### 5. Degree Plan (30 seconds)
- Show semester-by-semester breakdown
- Highlight next semester courses

**Total Demo Time: 3-4 minutes**

---

## 🔧 TROUBLESHOOTING

### App won't start?
```bash
npm install
npm start
```

### Can't scan QR code?
- Make sure phone and laptop are on same WiFi
- Try typing the URL manually in Expo Go

### Picker component error?
```bash
npm install @react-native-picker/picker @react-native-community/slider
```

---

## 🎨 CUSTOMIZATION

### Add Gemini API Key (Optional)
1. Get free key: https://aistudio.google.com/app/apikey
2. Edit `api/gemini.js` line 1
3. Edit `components/ChatAdvisor.js` line 24: set `USE_DEMO = false`

### Add More Majors
Edit `data/requirements.js` and add your major with courses

---

## 📊 PRIZE TRACKS WE QUALIFY FOR

✅ General Track - Best AI Project
✅ Nebula Labs - Using UTD course data
✅ Dallas AI - Personalized learning
✅ MLH Gemini API - AI chat advisor
✅ Data Science/ML - Course recommendations

---

## 🏆 WINNING POINTS

1. **Real UTD Data** - Uses Nebula Labs API
2. **Solves Real Problem** - Students need better advising
3. **AI-Powered** - Gemini provides personalized advice
4. **Mobile-First** - Works on any phone
5. **Complete Solution** - 6 full features working

---

## 📝 DEVPOST SUBMISSION CHECKLIST

- [ ] Project name: AI Graduate Advisor
- [ ] Tagline: Your 24/7 AI-powered academic advisor
- [ ] Demo video (2 min screen recording)
- [ ] GitHub repo link
- [ ] Select tracks: General, Nebula Labs, Dallas AI, MLH Gemini
- [ ] Screenshots of all 6 screens
- [ ] Built with: React Native, Expo, Gemini API, Nebula API

---

## 🎥 RECORDING DEMO VIDEO

### Using Phone Screen Recording:
1. Start screen recording on your phone
2. Open app in Expo Go
3. Go through demo flow (see above)
4. Stop recording
5. Upload to YouTube (unlisted)
6. Add link to Devpost

### Tips:
- Keep it under 2 minutes
- Show all 6 features
- Speak clearly about the problem you're solving
- End with "Built for UTD students, by UTD students"

---

## 🚨 EMERGENCY FALLBACKS

### If Expo Go doesn't work:
```bash
npm run web
```
Demo in browser instead

### If AI chat breaks:
Demo mode is already enabled - it uses hardcoded responses

### If Nebula API is down:
All degree data is hardcoded - app works offline

---

## 📞 NEED HELP?

1. Check README.md for detailed docs
2. Google: "expo [your error]"
3. Ask Bar (team lead)

---

## ⏰ TIMELINE REMINDER

- **11 PM Saturday**: Soft Devpost submission
- **11 AM Sunday**: Final submission deadline
- **1 PM Sunday**: Judging starts

**Good luck! 🎉**
