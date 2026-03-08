import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { DEGREE_REQUIREMENTS, MINORS, MAJORS_LIST, MINORS_LIST } from "../data/requirements";
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function WhatIfSimulator({ student, onNavigate }) {
  const [simMajor, setSimMajor] = useState(student.major);
  const [simMinor, setSimMinor] = useState(student.minor);
  const [credPerSem, setCredPerSem] = useState(15);
  const [result, setResult] = useState(null);

  function calc() {
    const reqs = DEGREE_REQUIREMENTS[simMajor];
    const minorReqs = simMinor !== "None" ? MINORS[simMinor] : null;
    const transfer = student.completedCourses.filter(c => reqs.required.some(r => r.code === c));
    const remaining = Math.max(reqs.totalCredits - (transfer.length * 3) - (student.creditsCompleted * 0.3), 0);
    const minorNeeded = minorReqs
      ? minorReqs.required.filter(r => !student.completedCourses.includes(r.code)).length
      : 0;
    const total = Math.round(remaining + minorNeeded * 3);
    const sems = Math.ceil(total / credPerSem);
    const year = new Date().getFullYear() + Math.floor(sems / 2);
    const sem = sems % 2 === 0 ? "Spring" : "Fall";
    setResult({ total, sems, grad: `${sem} ${year}`, diff: sems - student.semestersLeft,
      transfer: transfer.length, minorNeeded });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FF" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 20, paddingBottom: 10 }}>
        <TouchableOpacity onPress={() => onNavigate("dashboard")} style={styles.back}>
          <Text style={{ fontWeight: "600" }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#1A237E" }}>🔀 What-If Simulator</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingTop: 10, paddingBottom: 100 }}>
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
          <Box label="CURRENT" major={student.major} minor={student.minor}
            grad={student.estimatedGraduation} color="#E8EAF6" tc="#1A237E" />
          <Box label="SIMULATED" major={simMajor} minor={simMinor}
            grad={result?.grad || "—"} color="#E8F5E9" tc="#1B5E20" />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>New Major</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={simMajor} onValueChange={v => { setSimMajor(v); setResult(null); }}>
              {MAJORS_LIST.map(m => <Picker.Item key={m} label={m} value={m} />)}
            </Picker>
          </View>

          <Text style={styles.label}>Add Minor</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={simMinor} onValueChange={v => { setSimMinor(v); setResult(null); }}>
              {MINORS_LIST.map(m => <Picker.Item key={m} label={m} value={m} />)}
            </Picker>
          </View>

          <Text style={styles.label}>Credits Per Semester: {credPerSem}</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={9}
            maximumValue={21}
            step={3}
            value={credPerSem}
            onValueChange={v => { setCredPerSem(v); setResult(null); }}
            minimumTrackTintColor="#1A237E"
            maximumTrackTintColor="#E0E0E0"
          />

          <TouchableOpacity style={styles.button} onPress={calc}>
            <Text style={styles.buttonText}>Calculate Impact →</Text>
          </TouchableOpacity>
        </View>

        {result && (
          <View style={{ ...styles.card, backgroundColor: result.diff > 2 ? "#FFF8E1" : "#E8F5E9",
            borderWidth: 1.5, borderColor: result.diff > 2 ? "#FFD54F" : "#A5D6A7" }}>
            <Text style={{ fontSize: 15, fontWeight: "700", marginBottom: 14 }}>📊 Results</Text>
            {[["Graduation", result.grad], ["Credits Remaining", `${result.total} cr`],
              ["Semesters Left", result.sems], ["Courses Transferring", result.transfer],
              result.minorNeeded > 0 && ["Minor Courses Needed", result.minorNeeded]
            ].filter(Boolean).map(([l, v]) => (
              <View key={l} style={{ flexDirection: "row", justifyContent: "space-between",
                paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.06)" }}>
                <Text style={{ color: "#78909C", fontSize: 14 }}>{l}</Text>
                <Text style={{ fontWeight: "700", fontSize: 14 }}>{v}</Text>
              </View>
            ))}
            <View style={{ marginTop: 12, padding: 12, backgroundColor: "white",
              borderRadius: 10, alignItems: "center" }}>
              <Text style={{ fontWeight: "700", color: result.diff > 0 ? "#E65100" : "#2E7D32" }}>
                {result.diff > 0 ? `⚠️ Adds ${result.diff} semester${result.diff > 1 ? "s" : ""}`
                  : result.diff < 0 ? `🎉 Saves ${Math.abs(result.diff)} semester${Math.abs(result.diff) > 1 ? "s" : ""}!`
                    : "✅ No impact on graduation"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Box({ label, major, minor, grad, color, tc }) {
  return (
    <View style={{ flex: 1, backgroundColor: color, borderRadius: 12, padding: 14 }}>
      <Text style={{ fontSize: 11, fontWeight: "700", color: tc, marginBottom: 4 }}>{label}</Text>
      <Text style={{ fontSize: 13, fontWeight: "700", color: tc, marginBottom: 2 }}>{major}</Text>
      <Text style={{ fontSize: 12, color: tc, opacity: 0.7, marginBottom: 6 }}>
        {minor !== "None" ? `Minor: ${minor}` : "No minor"}</Text>
      <Text style={{ fontSize: 13, fontWeight: "800", color: tc }}>{grad}</Text>
    </View>
  );
}

const styles = {
  back: { padding: 8, backgroundColor: "#F5F5F5", borderWidth: 1.5,
    borderColor: "#E0E0E0", borderRadius: 10, paddingHorizontal: 14 },
  card: { backgroundColor: "white", borderRadius: 16, padding: 20, marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06,
    shadowRadius: 12, elevation: 3 },
  label: { fontSize: 13, fontWeight: "600", color: "#37474F", marginBottom: 6, marginTop: 14 },
  pickerContainer: { borderWidth: 1.5, borderColor: "#E0E0E0", borderRadius: 10, marginBottom: 10 },
  button: { width: "100%", padding: 14, backgroundColor: "#1A237E", borderRadius: 12,
    alignItems: "center", marginTop: 20 },
  buttonText: { color: "white", fontSize: 15, fontWeight: "700" }
};
