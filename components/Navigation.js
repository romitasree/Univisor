import { View, Text, TouchableOpacity } from "react-native";

export default function Navigation({ screen, onNavigate }) {
  const tabs = [
    { id: "dashboard", icon: "🏠", label: "Home" },
    { id: "plan", icon: "🗺️", label: "Plan" },
    { id: "courses", icon: "📋", label: "Courses" },
    { id: "chat", icon: "🤖", label: "Advisor" },
    { id: "whatif", icon: "🔀", label: "What-If" },
  ];

  return (
    <View style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#E8EAF6",
      flexDirection: "row", paddingVertical: 10,
      shadowColor: "#000", shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.08, shadowRadius: 20, elevation: 10
    }}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.id} onPress={() => onNavigate(tab.id)}
          style={{ flex: 1, alignItems: "center", gap: 2 }}>
          <Text style={{ fontSize: 20 }}>{tab.icon}</Text>
          <Text style={{
            fontSize: 10, fontWeight: "600",
            color: screen === tab.id ? "#1A237E" : "#90A4AE"
          }}>{tab.label}</Text>
          {screen === tab.id && (
            <View style={{ width: 20, height: 3, backgroundColor: "#1A237E", borderRadius: 2 }} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
