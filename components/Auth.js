import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

const USERS_DB = {}; // Mock database

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  function handleAuth() {
    if (mode === 'register') {
      if (USERS_DB[email]) {
        Alert.alert('Error', 'User already exists');
        return;
      }
      USERS_DB[email] = { email, password, name };
      Alert.alert('Success', 'Account created! Please login.');
      setMode('login');
    } else {
      const user = USERS_DB[email];
      if (!user || user.password !== password) {
        Alert.alert('Error', 'Invalid credentials');
        return;
      }
      onLogin(user);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1A237E' }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 36 }}>
          <Text style={{ fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 20, color: '#1A237E' }}>
            {mode === 'login' ? 'Login' : 'Register'}
          </Text>

          {mode === 'register' && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{mode === 'login' ? 'Login' : 'Register'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
            <Text style={{ textAlign: 'center', marginTop: 15, color: '#1A237E' }}>
              {mode === 'login' ? "Don't have an account? Register" : "Have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  input: { padding: 12, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#1A237E', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' }
};