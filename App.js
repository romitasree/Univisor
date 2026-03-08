import { useState } from "react";
import { View, StatusBar } from "react-native";
import Auth from "./components/Auth";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CourseList from "./components/CourseList";
import ChatAdvisor from "./components/ChatAdvisor";
import WhatIfSimulator from "./components/WhatIfSimulator";
import DegreePlan from "./components/DegreePlan";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import TranscriptUpload from "./components/TranscriptUpload";
import Notifications from "./components/Notifications";

export default function App() {
  const [screen, setScreen] = useState("auth");
  const [student, setStudent] = useState(null);
  const [user, setUser] = useState(null);

  function handleAuthComplete(userProfile) {
    setUser(userProfile);
    setScreen("login");
  }

  function handleLoginComplete(profile) {
    setStudent(profile);
    setScreen("dashboard");
  }

  function handleLogout() {
    setUser(null);
    setStudent(null);
    setScreen("auth");
  }

  function navigate(to) { setScreen(to); }

  const showNav = screen !== "auth" && screen !== "login";

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FF" }}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />
      
      {screen === "auth" && <Auth onLogin={handleAuthComplete} />}
      {screen === "login" && <Login user={user} onComplete={handleLoginComplete} />}
      {screen === "dashboard" && student && <Dashboard student={student} onNavigate={navigate} />}
      {screen === "courses" && student && <CourseList student={student} onNavigate={navigate} />}
      {screen === "chat" && student && <ChatAdvisor student={student} onNavigate={navigate} />}
      {screen === "whatif" && student && <WhatIfSimulator student={student} onNavigate={navigate} />}
      {screen === "plan" && student && <DegreePlan student={student} onNavigate={navigate} />}
      {screen === "profile" && student && <Profile student={student} onNavigate={navigate} onUpdateStudent={setStudent} onLogout={handleLogout} />}
      {screen === "transcript" && student && <TranscriptUpload student={student} onNavigate={navigate} onUpdateStudent={setStudent} />}
      {screen === "notifications" && student && <Notifications student={student} onNavigate={navigate} />}

      {showNav && <Navigation screen={screen} onNavigate={navigate} />}
    </View>
  );
}
