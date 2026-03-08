import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { DEGREE_REQUIREMENTS } from "../data/requirements";

export default function DegreePlan({ student, onNavigate }) {
  const plan = buildPlan(student);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FF" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 20, paddingBottom: 10 }}>
        <TouchableOpacity onPress={() => onNavigate("dashboard")} style={styles.back}>
          <Text style={{ fontWeight: "600" }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#1A237E" }}>🗺️ Your Degree Plan</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingTop: 10, paddingBottom: 100 }}>
        {plan.map((sem, i) => (
          <View key={i} style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View style={{ width: 28, height: 28, borderRadius: 14,
                  backgroundColor: sem.done ? "#4CAF50" : i === 0 ? "#1A237E" : "#E8EAF6",
                  alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 12, fontWeight: "700",
                    color: sem.done || i === 0 ? "white" : "#5C6BC0" }}>
                    {sem.done ? "✓" : i + 1}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 14, fontWeight: "700",
                    color: sem.done ? "#4CAF50" : "#1A237E" }}>{sem.label}</Text>
                  {i === 0 && !sem.done && (
                    <View style={{ marginLeft: 8, backgroundColor: "#E8F5E9",
                      paddingVertical: 2, paddingHorizontal: 8, borderRadius: 10 }}>
                      <Text style={{ fontSize: 11, color: "#2E7D32" }}>NEXT</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={{ fontSize: 12, color: "#90A4AE" }}>{sem.credits} cr</Text>
            </View>
            
            <View style={{ backgroundColor: sem.done ? "#F1F8E9" : "white", borderRadius: 12,
              borderWidth: 1.5, borderColor: sem.done ? "#C5E1A5" : i === 0 ? "#7986CB" : "#E8EAF6" }}>
              {sem.courses.map((c, ci) => (
                <View key={ci} style={{ padding: 10, paddingHorizontal: 14,
                  borderBottomWidth: ci < sem.courses.length - 1 ? 1 : 0,
                  borderBottomColor: "#F0F0F0", flexDirection: "row", justifyContent: "space-between" }}>
                  <View>
                    <Text style={{ fontSize: 13, fontWeight: "700", marginBottom: 2,
                      color: sem.done ? "#388E3C" : "#37474F" }}>{c.code}</Text>
                    <Text style={{ fontSize: 11, color: "#90A4AE" }}>{c.title}</Text>
                  </View>
                  <View style={{ backgroundColor: "#F5F5F5", paddingVertical: 3, paddingHorizontal: 8,
                    borderRadius: 8, height: 20, justifyContent: "center" }}>
                    <Text style={{ fontSize: 12, color: "#78909C" }}>{c.credits} cr</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function buildPlan(student) {
  const reqs = DEGREE_REQUIREMENTS[student.major];
  if (!reqs) return [];
  const completed = new Set(student.completedCourses);
  const inPlan = new Set(student.completedCourses);
  const semesters = [];
  const done = reqs.required.filter(c => completed.has(c.code));
  if (done.length > 0) semesters.push({
    label: "Completed", courses: done,
    credits: done.reduce((s, c) => s + c.credits, 0), done: true
  });
  const remaining = reqs.required.filter(c => !completed.has(c.code));
  const labels = ["Fall 2025", "Spring 2026", "Fall 2026", "Spring 2027", "Fall 2027", "Spring 2028"];
  let idx = 0;
  while (remaining.some(c => !inPlan.has(c.code)) && idx < labels.length) {
    const sem = [];
    for (const c of remaining) {
      if (inPlan.has(c.code) || sem.reduce((s, x) => s + x.credits, 0) >= 15) continue;
      if (c.prereqs.every(p => inPlan.has(p))) { sem.push(c); inPlan.add(c.code); }
    }
    if (sem.length > 0) semesters.push({
      label: labels[idx], courses: sem,
      credits: sem.reduce((s, c) => s + c.credits, 0), done: false
    });
    idx++;
  }
  return semesters;
}

const styles = {
  back: { padding: 8, backgroundColor: "#F5F5F5", borderWidth: 1.5,
    borderColor: "#E0E0E0", borderRadius: 10, paddingHorizontal: 14 }
};
