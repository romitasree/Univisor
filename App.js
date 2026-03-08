import { useState } from "react";
import { View, StatusBar } from "react-native";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CourseList from "./components/CourseList";
import ChatAdvisor from "./components/ChatAdvisor";
import WhatIfSimulator from "./components/WhatIfSimulator";
import DegreePlan from "./components/DegreePlan";
import Navigation from "./components/Navigation";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [student, setStudent] = useState(null);

  function handleLoginComplete(profile) {
    setStudent(profile);
    setScreen("dashboard");
  }

  function navigate(to) { setScreen(to); }

  const showNav = screen !== "login";

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FF" }}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />
      
      {screen === "login" && <Login onComplete={handleLoginComplete} />}
      {screen === "dashboard" && student && <Dashboard student={student} onNavigate={navigate} />}
      {screen === "courses" && student && <CourseList student={student} onNavigate={navigate} />}
      {screen === "chat" && student && <ChatAdvisor student={student} onNavigate={navigate} />}
      {screen === "whatif" && student && <WhatIfSimulator student={student} onNavigate={navigate} />}
      {screen === "plan" && student && <DegreePlan student={student} onNavigate={navigate} />}

      {showNav && <Navigation screen={screen} onNavigate={navigate} />}
    </View>
  );
}
