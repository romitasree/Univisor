import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MAJORS_LIST, MINORS_LIST } from '../data/requirements';

export default function Profile({ student, onNavigate, onUpdateStudent, onLogout }) {
  const [name, setName] = useState(student.name);
  const [major, setMajor] = useState(student.major);
  const [minor, setMinor] = useState(student.minor || 'None');
  const [credits, setCredits] = useState(student.creditsCompleted.toString());

  function saveProfile() {
    const updatedStudent = {
      ...student,
      name: name.trim() || 'Student',
      major,
      minor: minor === 'None' ? null : minor,
      creditsCompleted: parseInt(credits) || 0
    };
    
    onUpdateStudent(updatedStudent);
    Alert.alert('Success', 'Profile updated successfully');
    onNavigate('dashboard');
  }

  function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FF' }}>
      <View style={{ backgroundColor: '#1A237E', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => onNavigate('dashboard')} style={styles.back}>
          <Text style={{ color: 'white', fontWeight: '600' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>👤 Profile</Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />

          <Text style={styles.label}>Major</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={major} onValueChange={setMajor}>
              {MAJORS_LIST.map(m => <Picker.Item key={m} label={m} value={m} />)}
            </Picker>
          </View>

          <Text style={styles.label}>Minor</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={minor} onValueChange={setMinor}>
              {MINORS_LIST.map(m => <Picker.Item key={m} label={m} value={m} />)}
            </Picker>
          </View>

          <Text style={styles.label}>Credits Completed</Text>
          <TextInput
            style={styles.input}
            value={credits}
            onChangeText={setCredits}
            placeholder="Total credits"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Completed Courses:</Text>
            <Text style={styles.summaryValue}>{student.completedCourses.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Graduation:</Text>
            <Text style={styles.summaryValue}>{student.estimatedGraduation}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={() => onNavigate('transcript')}>
          <Text style={styles.uploadText}>📄 Upload Transcript</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  back: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 8, paddingHorizontal: 12 },
  section: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A237E', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#37474F', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#F8F9FF' },
  pickerContainer: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, backgroundColor: '#F8F9FF' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#90A4AE' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#1A237E' },
  saveButton: { backgroundColor: '#1A237E', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  uploadButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  uploadText: { color: 'white', fontSize: 16, fontWeight: '700' },
  logoutButton: { backgroundColor: '#F44336', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 40 },
  logoutText: { color: 'white', fontSize: 16, fontWeight: '700' }
};