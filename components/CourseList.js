import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { DEGREE_REQUIREMENTS } from "../data/requirements";

export default function CourseList({ student, onNavigate }) {
  const reqs = DEGREE_REQUIREMENTS[student.major];

  const available = reqs.required.filter(c =>
    !student.completedCourses.includes(c.code) &&
    c.prereqs.every(p => student.completedCourses.includes(p))
  );

  const blocked = reqs.required.filter(c =>
    !student.completedCourses.includes(c.code) &&
    c.prereqs.some(p => !student.completedCourses.includes(p))
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FF" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 20, paddingBottom: 10 }}>
        <TouchableOpacity onPress={() => onNavigate("dashboard")} style={styles.back}>
          <Text style={{ fontWeight: "600" }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#1A237E" }}>Course Recommendations</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingTop: 10, paddingBottom: 100 }}>
        <Section title={`✅ Ready to Take (${available.length})`} color="#2E7D32" bg="#E8F5E9" border="#A5D6A7">
          {available.length === 0 &&
            <Text style={{ color: "#90A4AE", fontSize: 14 }}>Add completed courses to see recommendations.</Text>}
          {available.map(c => <CourseCard key={c.code} course={c} available />)}
        </Section>

        {blocked.length > 0 && (
          <Section title={`🔒 Needs Prerequisites (${blocked.length})`} color="#E65100" bg="#FFF3E0" border="#FFCC80">
            {blocked.map(c => <CourseCard key={c.code} course={c} />)}
          </Section>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, color, bg, border, children }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ backgroundColor: bg, borderRadius: 12, padding: 12,
        marginBottom: 12, borderWidth: 1, borderColor: border }}>
        <Text style={{ fontSize: 14, fontWeight: "700", color }}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function CourseCard({ course, available }) {
  return (
    <View style={{ backgroundColor: "white", borderRadius: 12, padding: 14,
      marginBottom: 10, borderWidth: 1.5, borderColor: available ? "#A5D6A7" : "#FFCC80",
      flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: "700", marginBottom: 4,
          color: available ? "#1A237E" : "#BF360C" }}>{course.code}</Text>
        <Text style={{ fontSize: 13, color: "#546E7A", marginBottom: 4 }}>{course.title}</Text>
        {course.prereqs.length > 0 &&
          <Text style={{ fontSize: 11, color: "#90A4AE" }}>
            Prereqs: {course.prereqs.join(", ")}</Text>}
      </View>
      <View style={{ backgroundColor: available ? "#E8F5E9" : "#FFF3E0",
        paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20, height: 24, justifyContent: "center" }}>
        <Text style={{ color: available ? "#2E7D32" : "#E65100", fontSize: 12, fontWeight: "700" }}>
          {course.credits} cr</Text>
      </View>
    </View>
  );
}

const styles = {
  back: { padding: 8, backgroundColor: "#F5F5F5", borderWidth: 1.5,
    borderColor: "#E0E0E0", borderRadius: 10, paddingHorizontal: 14 }
};
