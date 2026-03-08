import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { MAJORS_LIST, MINORS_LIST, DEGREE_REQUIREMENTS } from "../data/requirements";
import { Picker } from '@react-native-picker/picker';

export default function Login({ onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("Software Engineering");
  const [minor, setMinor] = useState("None");
  const [creditsCompleted, setCreditsCompleted] = useState("");
  const [courseInput, setCourseInput] = useState("");
  const [completedCourses, setCompletedCourses] = useState([]);

  function addCourse() {
    const c = courseInput.trim().toUpperCase();
    if (c && !completedCourses.includes(c)) setCompletedCourses([...completedCourses, c]);
    setCourseInput("");
  }

  function handleFinish() {
    const reqs = DEGREE_REQUIREMENTS[major];
    const missing = reqs.required.map(r => r.code).filter(c => !completedCourses.includes(c));
    const credits = parseInt(creditsCompleted) || 0;
    const remaining = reqs.totalCredits - credits;
    const sems = Math.ceil(remaining / 15);
    const year = new Date().getFullYear() + Math.floor(sems / 2);
    const sem = sems % 2 === 0 ? "Spring" : "Fall";
    onComplete({ name: name || "Student", major, minor, creditsCompleted: credits,
      creditsRemaining: remaining, totalCredits: reqs.totalCredits,
      completedCourses, missingCourses: missing,
      estimatedGraduation: `${sem} ${year}`, semestersLeft: sems });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A237E" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
        <View style={{ backgroundColor: "white", borderRadius: 20, padding: 36 }}>
          
          <View style={{ alignItems: "center", marginBottom: 28 }}>
            <Text style={{ fontSize: 40 }}>🎓</Text>
            <Text style={{ fontSize: 22, fontWeight: "800", color: "#1A237E" }}>AI Graduate Advisor</Text>
            <Text style={{ color: "#78909C", fontSize: 14 }}>Your 24/7 UTD academic planning assistant</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8, marginBottom: 28 }}>
            {[1, 2].map(s => (
              <View key={s} style={{ flex: 1, height: 4, borderRadius: 2,
                backgroundColor: s <= step ? "#1A237E" : "#E0E0E0" }} />
            ))}
          </View>

          {step === 1 && (
            <>
              <Text style={styles.label}>Your Name</Text>
              <TextInput style={styles.input} placeholder="e.g. Alex Johnson"
                value={name} onChangeText={setName} />
              
              <Text style={styles.label}>Major</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={major} onValueChange={setMajor}>
                  {MAJORS_LIST.map(m => <Picker.Item key={m} label={m} value={m} />)}
                </Picker>
              </View>
              
              <Text style={styles.label}>Minor (optional)</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={minor} onValueChange={setMinor}>
                  {MINORS_LIST.map(m => <Picker.Item key={m} label={m} value={m} />)}
                </Picker>
              </View>
              
              <Text style={styles.label}>Credits Completed</Text>
              <TextInput style={styles.input} placeholder="e.g. 45" keyboardType="numeric"
                value={creditsCompleted} onChangeText={setCreditsCompleted} />
              
              <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
                <Text style={styles.buttonText}>Next: Add Courses →</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.label}>Add Completed Courses</Text>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
                <TextInput style={{ ...styles.input, flex: 1, marginBottom: 0 }} 
                  placeholder="e.g. CS 1337"
                  value={courseInput} onChangeText={setCourseInput}
                  onSubmitEditing={addCourse} />
                <TouchableOpacity style={styles.addButton} onPress={addCourse}>
                  <Text style={{ fontWeight: "700", color: "#1A237E" }}>+ Add</Text>
                </TouchableOpacity>
              </View>
              
              <View style={{ minHeight: 80, backgroundColor: "#F5F7FF", borderRadius: 10,
                padding: 12, flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {completedCourses.map(code => (
                  <TouchableOpacity key={code} 
                    style={{ backgroundColor: "#1A237E", borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12 }}
                    onPress={() => setCompletedCourses(completedCourses.filter(c => c !== code))}>
                    <Text style={{ color: "white", fontSize: 13 }}>{code} ✕</Text>
                  </TouchableOpacity>
                ))}
                {completedCourses.length === 0 &&
                  <Text style={{ color: "#B0BEC5", fontSize: 13 }}>No courses yet — you can skip this</Text>}
              </View>
              
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
                  <Text style={{ fontWeight: "600" }}>← Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, flex: 1, marginTop: 0 }} onPress={handleFinish}>
                  <Text style={styles.buttonText}>Build My Plan 🚀</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  label: { fontSize: 13, fontWeight: "600", color: "#37474F", marginBottom: 6, marginTop: 14 },
  input: { width: "100%", padding: 10, borderRadius: 10, borderWidth: 1.5, 
    borderColor: "#E0E0E0", fontSize: 14, marginBottom: 10, backgroundColor: "white" },
  pickerContainer: { borderWidth: 1.5, borderColor: "#E0E0E0", borderRadius: 10, marginBottom: 10 },
  button: { width: "100%", padding: 14, backgroundColor: "#1A237E", borderRadius: 12, 
    alignItems: "center", marginTop: 20 },
  buttonText: { color: "white", fontSize: 15, fontWeight: "700" },
  addButton: { padding: 10, backgroundColor: "#E8EAF6", borderRadius: 10, justifyContent: "center" },
  backButton: { padding: 12, backgroundColor: "#F5F5F5", borderWidth: 1.5, 
    borderColor: "#E0E0E0", borderRadius: 12, justifyContent: "center", paddingHorizontal: 20 }
};
