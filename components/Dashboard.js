import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";

export default function Dashboard({ student, onNavigate }) {
  const percent = Math.round((student.creditsCompleted / student.totalCredits) * 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FF" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        
        <View style={{ backgroundColor: "#1A237E", borderRadius: 18, padding: 24, marginBottom: 20 }}>
          <Text style={{ fontSize: 13, opacity: 0.8, color: "white" }}>Welcome back,</Text>
          <Text style={{ fontSize: 22, fontWeight: "800", color: "white" }}>{student.name} 👋</Text>
          <Text style={{ fontSize: 13, opacity: 0.8, color: "white" }}>
            {student.major} {student.minor !== "None" ? `• Minor: ${student.minor}` : ""}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Graduation Progress</Text>
          <View style={{ marginBottom: 8 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#37474F" }}>Overall Progress</Text>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "#1A237E" }}>{percent}%</Text>
            </View>
            <View style={{ height: 14, backgroundColor: "#E8EAF6", borderRadius: 7, overflow: "hidden" }}>
              <View style={{ height: "100%", width: `${percent}%`, backgroundColor: "#1A237E", borderRadius: 7 }} />
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
            <Stat label="Completed" value={`${student.creditsCompleted} cr`} color="#4CAF50" />
            <Stat label="Remaining" value={`${student.creditsRemaining} cr`} color="#FF7043" />
            <Stat label="Total" value={`${student.totalCredits} cr`} color="#1A237E" />
          </View>
        </View>

        <View style={{ ...styles.card, backgroundColor: "#E8F5E9", borderWidth: 1.5, borderColor: "#A5D6A7" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Text style={{ fontSize: 32 }}>🎓</Text>
            <View>
              <Text style={{ fontSize: 12, color: "#388E3C", fontWeight: "600" }}>ESTIMATED GRADUATION</Text>
              <Text style={{ fontSize: 22, fontWeight: "800", color: "#1B5E20" }}>{student.estimatedGraduation}</Text>
              <Text style={{ fontSize: 12, color: "#66BB6A" }}>{student.semestersLeft} semesters remaining</Text>
            </View>
          </View>
        </View>

        {student.missingCourses.length > 0 && (
          <View style={{ ...styles.card, backgroundColor: "#FFF8E1", borderWidth: 1.5, borderColor: "#FFD54F" }}>
            <Text style={{ ...styles.cardTitle, color: "#E65100" }}>
              ⚠️ Missing Required Courses ({student.missingCourses.length})</Text>
            {student.missingCourses.slice(0, 4).map(code => (
              <View key={code} style={{ padding: 8, backgroundColor: "white", borderRadius: 8,
                marginBottom: 6, borderWidth: 1, borderColor: "#FFE082" }}>
                <Text style={{ fontSize: 13, fontWeight: "600" }}>📚 {code}</Text>
              </View>
            ))}
            {student.missingCourses.length > 4 &&
              <Text style={{ fontSize: 12, color: "#FB8C00", marginTop: 8 }}>
                + {student.missingCourses.length - 4} more — see Degree Plan</Text>}
          </View>
        )}

        <Text style={{ fontSize: 15, fontWeight: "700", color: "#37474F", marginBottom: 12 }}>Quick Actions</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {[
            { icon: "🗺️", title: "Degree Plan", sub: "Semester breakdown", screen: "plan" },
            { icon: "📋", title: "Courses", sub: "What to take next", screen: "courses" },
            { icon: "🤖", title: "AI Advisor", sub: "Ask anything", screen: "chat" },
            { icon: "🔀", title: "What-If", sub: "Simulate changes", screen: "whatif" },
          ].map(t => (
            <TouchableOpacity key={t.screen} onPress={() => onNavigate(t.screen)}
              style={{ backgroundColor: "white", borderRadius: 14, padding: 16,
                borderWidth: 1.5, borderColor: "#E8EAF6", width: "48%" }}>
              <Text style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</Text>
              <Text style={{ fontSize: 13, fontWeight: "700", color: "#1A237E" }}>{t.title}</Text>
              <Text style={{ fontSize: 11, color: "#90A4AE" }}>{t.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value, color }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "800", color }}>{value}</Text>
      <Text style={{ fontSize: 11, color: "#90A4AE" }}>{label}</Text>
    </View>
  );
}

const styles = {
  card: { backgroundColor: "white", borderRadius: 16, padding: 20, marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06,
    shadowRadius: 12, elevation: 3 },
  cardTitle: { fontSize: 14, fontWeight: "700", color: "#37474F", marginBottom: 14 }
};
