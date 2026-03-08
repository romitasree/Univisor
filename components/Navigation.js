import { View, Text, TouchableOpacity } from "react-native";

export default function Navigation({ screen, onNavigate }) {
  const tabs = [
    { id: "dashboard", icon: "🏠", label: "Home" },
    { id: "plan", icon: "🗺️", label: "Plan" },
    { id: "chat", icon: "🤖", label: "Advisor" },
    { id: "notifications", icon: "🔔", label: "Alerts" },
    { id: "profile", icon: "👤", label: "Profile" }
  ];

  return (
    <View style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      backgroundColor: "white", paddingVertical: 8, paddingHorizontal: 12,
      borderTopWidth: 1, borderTopColor: "#E8EAF6",
      flexDirection: "row", justifyContent: "space-around"
    }}>
      {tabs.map(tab => (
        <TouchableOpacity key={tab.id} onPress={() => onNavigate(tab.id)}
          style={{ alignItems: "center", paddingVertical: 8, paddingHorizontal: 12 }}>
          <Text style={{ fontSize: 20, marginBottom: 2 }}>{tab.icon}</Text>
          <Text style={{
            fontSize: 10, fontWeight: "600",
            color: screen === tab.id ? "#1A237E" : "#90A4AE"
          }}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}