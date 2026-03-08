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
                  backgroundColor: sem.done ? "#4CAF50" : sem.current ? "#FF9800" : i === 0 ? "#1A237E" : "#E8EAF6",
                  alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 12, fontWeight: "700",
                    color: sem.done || sem.current || i === 0 ? "white" : "#5C6BC0" }}>
                    {sem.done ? "✓" : sem.current ? "⏳" : i + 1}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 14, fontWeight: "700",
                    color: sem.done ? "#4CAF50" : sem.current ? "#FF9800" : "#1A237E" }}>{sem.label}</Text>
                  {sem.current && (
                    <View style={{ marginLeft: 8, backgroundColor: "#FFF3E0",
                      paddingVertical: 2, paddingHorizontal: 8, borderRadius: 10 }}>
                      <Text style={{ fontSize: 11, color: "#F57C00" }}>IN PROGRESS</Text>
                    </View>
                  )}
                  {i === 0 && !sem.done && !sem.current && (
                    <View style={{ marginLeft: 8, backgroundColor: "#E8F5E9",
                      paddingVertical: 2, paddingHorizontal: 8, borderRadius: 10 }}>
                      <Text style={{ fontSize: 11, color: "#2E7D32" }}>NEXT</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={{ fontSize: 12, color: "#90A4AE" }}>{sem.credits} cr</Text>
            </View>
            
            <View style={{ backgroundColor: sem.done ? "#F1F8E9" : sem.current ? "#FFF8E1" : "white", borderRadius: 12,
              borderWidth: 1.5, borderColor: sem.done ? "#C5E1A5" : sem.current ? "#FFCC02" : i === 0 ? "#7986CB" : "#E8EAF6" }}>
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
  
  // Show completed courses
  const done = reqs.required.filter(c => completed.has(c.code));
  if (done.length > 0) semesters.push({
    label: "Completed", courses: done,
    credits: done.reduce((s, c) => s + c.credits, 0), done: true
  });
  
  // Show current semester courses (mock data based on student profile)
  const currentCourses = [
    { code: "CS 4348", title: "Operating Systems", credits: 3 },
    { code: "CS 4390", title: "Computer Networks", credits: 3 },
    { code: "ENGL 1301", title: "Composition I", credits: 3 }
  ];
  
  semesters.push({
    label: "Current (Fall 2024)", 
    courses: currentCourses,
    credits: currentCourses.reduce((s, c) => s + c.credits, 0), 
    done: false,
    current: true
  });
  
  // Add current courses to inPlan to avoid scheduling them again
  currentCourses.forEach(c => inPlan.add(c.code));
  
  const remaining = reqs.required.filter(c => !completed.has(c.code) && !currentCourses.some(curr => curr.code === c.code));
  const labels = ["Spring 2025", "Fall 2025", "Spring 2026", "Fall 2026", "Spring 2027", "Fall 2027", "Spring 2028", "Fall 2028"];
  let idx = 0;
  
  while (remaining.some(c => !inPlan.has(c.code)) && idx < labels.length) {
    const sem = [];
    let semCredits = 0;
    
    // Sort by number of prerequisites (take courses with fewer prereqs first)
    const sorted = remaining
      .filter(c => !inPlan.has(c.code))
      .sort((a, b) => a.prereqs.length - b.prereqs.length);
    
    for (const c of sorted) {
      // Check if already scheduled or semester is full
      if (inPlan.has(c.code) || semCredits + c.credits > 15) continue;
      
      // Check if ALL prerequisites are completed
      const prereqsMet = c.prereqs.length === 0 || c.prereqs.every(p => inPlan.has(p));
      
      if (prereqsMet) {
        sem.push(c);
        inPlan.add(c.code);
        semCredits += c.credits;
      }
    }
    
    // Add electives to fill remaining credits
    const electiveCreditsNeeded = Math.min(15 - semCredits, reqs.electives);
    if (electiveCreditsNeeded > 0 && remaining.filter(c => !inPlan.has(c.code)).length === 0) {
      sem.push({ code: "ELECTIVE", title: "Elective Course", credits: electiveCreditsNeeded });
      semCredits += electiveCreditsNeeded;
    }
    
    if (sem.length > 0) {
      semesters.push({
        label: labels[idx],
        courses: sem,
        credits: semCredits,
        done: false
      });
    }
    idx++;
  }
  
  // Add remaining electives if needed
  let remainingElectives = reqs.electives;
  const electiveSemesters = Math.ceil(remainingElectives / 6);
  
  for (let i = 0; i < electiveSemesters && idx < labels.length; i++) {
    const electiveCredits = Math.min(remainingElectives, 6);
    if (electiveCredits > 0) {
      semesters.push({
        label: labels[idx],
        courses: [{ code: "ELECTIVES", title: "Elective Courses", credits: electiveCredits }],
        credits: electiveCredits,
        done: false
      });
      remainingElectives -= electiveCredits;
      idx++;
    }
  }
  
  return semesters;
}

const styles = {
  back: { padding: 8, backgroundColor: "#F5F5F5", borderWidth: 1.5,
    borderColor: "#E0E0E0", borderRadius: 10, paddingHorizontal: 14 }
};
