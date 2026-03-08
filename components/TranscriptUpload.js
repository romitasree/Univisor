import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function TranscriptUpload({ student, onNavigate, onUpdateStudent }) {
  const [transcriptText, setTranscriptText] = useState('');
  const [parsedCourses, setParsedCourses] = useState([]);

  async function simulatePdfUpload() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      
      if (result.type === 'success') {
        // For demo purposes, load sample transcript data
        // In production, you'd parse the actual PDF content
        const samplePdf = `
UNIVERSITY OF TEXAS AT DALLAS
UNOFFICIAL TRANSCRIPT

CS 1336 Programming Fundamentals    3.00  A
CS 1337 Computer Science I          3.00  B+
CS 2336 Computer Science II         3.00  A-
CS 2340 Computer Architecture       3.00  B
MATH 2413 Differential Calculus     4.00  B+
ENGL 1301 Composition I             3.00  A

Total Credits: 19.00
GPA: 3.45`;
        setTranscriptText(samplePdf);
        Alert.alert('Success', `PDF "${result.name}" uploaded and processed successfully!`);
      } else {
        Alert.alert('Cancelled', 'File selection was cancelled.');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick file: ' + err.message);
    }
  }

  function parseTranscript() {
    if (!transcriptText.trim()) {
      Alert.alert('Error', 'Please paste your transcript or upload a file');
      return;
    }

    const lines = transcriptText.split('\n');
    const courses = [];
    const coursePattern = /([A-Z]{2,4})\s+(\d{4})\s+(.+?)\s+(\d+)\s+([A-F][+-]?|IP|WP|W)/i;
    
    lines.forEach(line => {
      const match = line.match(coursePattern);
      if (match) {
        const [, dept, num, title, credits, grade] = match;
        const courseCode = `${dept} ${num}`;
        if (grade !== 'IP' && grade !== 'WP' && grade !== 'W' && !courses.some(c => c.code === courseCode)) {
          courses.push({
            code: courseCode,
            title: title.trim(),
            credits: parseInt(credits),
            grade: grade
          });
        }
      }
    });
    
    setParsedCourses(courses);
    
    if (courses.length === 0) {
      Alert.alert('No Courses Found', 'Could not find any course codes. Please check the format or try manual entry.');
    }
  }

  function saveTranscript() {
    if (parsedCourses.length === 0) {
      Alert.alert('Error', 'No courses to save');
      return;
    }

    const newCourses = parsedCourses.map(c => c.code);
    const totalNewCredits = parsedCourses.reduce((sum, c) => sum + c.credits, 0);
    
    const updatedStudent = {
      ...student,
      completedCourses: [...new Set([...student.completedCourses, ...newCourses])],
      creditsCompleted: student.creditsCompleted + totalNewCredits
    };

    onUpdateStudent(updatedStudent);
    Alert.alert('Success', `Added ${parsedCourses.length} courses (${totalNewCredits} credits) to your profile`);
    onNavigate('dashboard');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FF' }}>
      <View style={{ backgroundColor: '#1A237E', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => onNavigate('dashboard')} style={styles.back}>
          <Text style={{ color: 'white', fontWeight: '600' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>📄 Upload Transcript</Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.uploadSection}>
          <Text style={styles.label}>Upload Transcript File</Text>
          <Text style={styles.hint}>Select your PDF transcript file from your device</Text>
          
          <TouchableOpacity style={styles.uploadButton} onPress={simulatePdfUpload}>
            <Text style={styles.uploadButtonText}>📁 Upload PDF File</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.label}>Paste Transcript Text</Text>
        <Text style={styles.hint}>Copy and paste your unofficial transcript. The system will automatically detect course codes, credits, and grades.</Text>
        
        <TextInput
          style={styles.textArea}
          placeholder="Paste transcript here...\n\nExample format:\nCS 1337 Computer Science I    3.00  A\nMATH 2413 Differential Calculus    4.00  B+"
          value={transcriptText}
          onChangeText={setTranscriptText}
          multiline
          numberOfLines={10}
        />

        <TouchableOpacity style={styles.parseButton} onPress={parseTranscript}>
          <Text style={styles.buttonText}>🔍 Parse Transcript</Text>
        </TouchableOpacity>

        {parsedCourses.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Found {parsedCourses.length} Courses:</Text>
            <ScrollView style={styles.coursesList}>
              {parsedCourses.map((course, index) => (
                <View key={index} style={styles.courseItem}>
                  <View style={styles.courseHeader}>
                    <Text style={styles.courseCode}>{course.code}</Text>
                    <View style={styles.courseDetails}>
                      <Text style={styles.courseCredits}>{course.credits} cr</Text>
                      <Text style={styles.courseGrade}>{course.grade}</Text>
                    </View>
                  </View>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                </View>
              ))}
            </ScrollView>
            
            <TouchableOpacity style={styles.saveButton} onPress={saveTranscript}>
              <Text style={styles.buttonText}>💾 Save to Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  back: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 8, paddingHorizontal: 12 },
  uploadSection: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '700', color: '#1A237E', marginBottom: 8 },
  hint: { fontSize: 14, color: '#90A4AE', marginBottom: 16 },
  uploadButton: { backgroundColor: '#E8EAF6', borderWidth: 2, borderColor: '#1A237E', borderStyle: 'dashed', borderRadius: 12, padding: 20, alignItems: 'center' },
  uploadButtonText: { fontSize: 16, color: '#1A237E', fontWeight: '600' },
  fileInfo: { marginTop: 12, padding: 12, backgroundColor: '#E8F5E9', borderRadius: 8 },
  fileName: { fontSize: 14, color: '#2E7D32', fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  dividerText: { marginHorizontal: 16, fontSize: 14, color: '#90A4AE', fontWeight: '600' },
  textArea: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 16, fontSize: 14, height: 200, textAlignVertical: 'top', backgroundColor: 'white' },
  parseButton: { backgroundColor: '#1A237E', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  resultsContainer: { marginTop: 20, padding: 16, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#E8EAF6' },
  resultsTitle: { fontSize: 16, fontWeight: '700', color: '#1A237E', marginBottom: 12 },
  coursesList: { maxHeight: 300, marginBottom: 16 },
  courseItem: { padding: 12, backgroundColor: '#F8F9FF', borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#E8EAF6' },
  courseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  courseCode: { fontSize: 14, fontWeight: '700', color: '#1A237E' },
  courseDetails: { flexDirection: 'row', gap: 8 },
  courseCredits: { fontSize: 12, color: '#666', backgroundColor: '#E0E0E0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  courseGrade: { fontSize: 12, color: '#4CAF50', backgroundColor: '#E8F5E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: '600' },
  courseTitle: { fontSize: 12, color: '#90A4AE' },
  saveButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 12, alignItems: 'center' }
};