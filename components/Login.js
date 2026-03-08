import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
import { MAJORS_LIST, MINORS_LIST, DEGREE_REQUIREMENTS } from "../data/requirements";
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

export default function Login({ user, onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name || "");
  const [major, setMajor] = useState("Software Engineering");
  const [minor, setMinor] = useState("None");
  const [creditsCompleted, setCreditsCompleted] = useState("25");
  const [courseInput, setCourseInput] = useState("");
  const [completedCourses, setCompletedCourses] = useState([]);
  const [transcriptText, setTranscriptText] = useState("");

  async function simulateTranscriptUpload() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      
      if (result.type === 'success') {
        // For demo purposes, load sample transcript data
        const sampleTranscript = `UNIVERSITY OF TEXAS AT DALLAS
UNOFFICIAL TRANSCRIPT

CS 1336 Programming Fundamentals    3.00  A
CS 1337 Computer Science I          3.00  B+
CS 2336 Computer Science II         3.00  A-
CS 2340 Computer Architecture       3.00  B
MATH 2413 Differential Calculus     4.00  B+
ENGL 1301 Composition I             3.00  A
HIST 1301 US History I              3.00  B
PHYS 2325 University Physics I      3.00  B+

Total Credits: 25.00`;
        setTranscriptText(sampleTranscript);
        parseTranscriptCourses(sampleTranscript);
        Alert.alert('Success', `PDF "${result.name}" uploaded and processed successfully!`);
      } else {
        Alert.alert('Cancelled', 'File selection was cancelled.');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick file: ' + err.message);
    }
  }

  function parseTranscriptCourses(text) {
    const lines = text.split('\n');
    const courses = [];
    const coursePattern = /([A-Z]{2,4}\s*\d{4})\s+([^\d]*?)\s+(\d+\.?\d*)\s*(?:cr|credits?)?\s*([A-F][+-]?|[A-F])?/i;
    
    lines.forEach(line => {
      const match = line.match(coursePattern);
      if (match) {
        const [, code] = match;
        const courseCode = code.replace(/\s+/g, ' ').toUpperCase();
        if (!courses.includes(courseCode)) {
          courses.push(courseCode);
        }
      }
    });
    
    setCompletedCourses(courses);
    
    // Auto-calculate credits
    const totalCredits = courses.length * 3; // Estimate
    setCreditsCompleted(totalCredits.toString());
  }

  function addCourse() {
    const c = courseInput.trim().toUpperCase();
    if (c && !completedCourses.includes(c)) setCompletedCourses([...completedCourses, c]);
    setCourseInput("");
  }

  function handleFinish() {
    const reqs = DEGREE_REQUIREMENTS[major];
    const missing = reqs.required.map(r => r.code).filter(c => !completedCourses.includes(c));
    
    // Calculate actual credits from completed courses
    const completedCourseCredits = completedCourses.reduce((total, courseCode) => {
      const course = reqs.required.find(c => c.code === courseCode);
      return total + (course ? course.credits : 0);
    }, 0);
    
    // Use the higher of manual input or calculated credits
    const manualCredits = parseInt(creditsCompleted) || 0;
    const actualCredits = Math.max(manualCredits, completedCourseCredits);
    
    const remaining = reqs.totalCredits - actualCredits;
    const sems = Math.ceil(remaining / 15);
    const year = new Date().getFullYear() + Math.floor(sems / 2);
    const sem = sems % 2 === 0 ? "Spring" : "Fall";
    
    onComplete({ 
      name: name || "Student", 
      major, 
      minor, 
      creditsCompleted: actualCredits,
      creditsRemaining: remaining, 
      totalCredits: reqs.totalCredits,
      completedCourses, 
      missingCourses: missing,
      estimatedGraduation: `${sem} ${year}`, 
      semestersLeft: sems 
    });
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
                <Text style={styles.buttonText}>Next: Upload Transcript →</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.label}>Upload Your Transcript</Text>
              <Text style={styles.hint}>Upload your transcript to automatically import all completed courses</Text>
              
              <TouchableOpacity style={styles.uploadButton} onPress={simulateTranscriptUpload}>
                <Text style={styles.uploadButtonText}>📁 Upload Transcript</Text>
              </TouchableOpacity>
              
              <Text style={styles.label}>Paste Transcript Text</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Paste your transcript here..."
                value={transcriptText}
                onChangeText={setTranscriptText}
                multiline
                numberOfLines={6}
              />
              
              <TouchableOpacity style={styles.parseButton} onPress={() => parseTranscriptCourses(transcriptText)}>
                <Text style={styles.buttonText}>🔍 Parse Transcript</Text>
              </TouchableOpacity>
              
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR MANUAL ENTRY</Text>
                <View style={styles.dividerLine} />
              </View>
              
              <Text style={styles.label}>Add Courses Manually</Text>
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
                  <Text style={{ color: "#B0BEC5", fontSize: 13 }}>No courses yet — upload transcript or add manually</Text>}
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
  hint: { fontSize: 12, color: "#90A4AE", marginBottom: 16 },
  input: { width: "100%", padding: 10, borderRadius: 10, borderWidth: 1.5, 
    borderColor: "#E0E0E0", fontSize: 14, marginBottom: 10, backgroundColor: "white" },
  pickerContainer: { borderWidth: 1.5, borderColor: "#E0E0E0", borderRadius: 10, marginBottom: 10 },
  button: { width: "100%", padding: 14, backgroundColor: "#1A237E", borderRadius: 12, 
    alignItems: "center", marginTop: 20 },
  buttonText: { color: "white", fontSize: 15, fontWeight: "700" },
  uploadButton: { backgroundColor: "#E8EAF6", borderWidth: 2, borderColor: "#1A237E", 
    borderStyle: "dashed", borderRadius: 12, padding: 20, alignItems: "center", marginBottom: 16 },
  uploadButtonText: { fontSize: 16, color: "#1A237E", fontWeight: "600" },
  textArea: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, padding: 16, fontSize: 14, height: 120, textAlignVertical: "top", backgroundColor: "white", marginBottom: 12 },
  parseButton: { backgroundColor: "#1A237E", padding: 12, borderRadius: 12, alignItems: "center", marginBottom: 16 },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E0E0E0" },
  dividerText: { marginHorizontal: 12, fontSize: 11, color: "#90A4AE", fontWeight: "600" },
  addButton: { padding: 10, backgroundColor: "#E8EAF6", borderRadius: 10, justifyContent: "center" },
  backButton: { padding: 12, backgroundColor: "#F5F5F5", borderWidth: 1.5, 
    borderColor: "#E0E0E0", borderRadius: 12, justifyContent: "center", paddingHorizontal: 20 }
};
