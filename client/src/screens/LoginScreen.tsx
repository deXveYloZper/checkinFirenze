// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }

      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      // We expect { message, token } from the server
      const { token } = response.data;

      // Store token in AsyncStorage
      await AsyncStorage.setItem('token', token);

      // Navigate to Home
      navigation.replace('Home');
    } catch (error: any) {
      console.error('Login Error:', error.response?.data || error.message);
      Alert.alert('Login Failed', error.response?.data?.error || 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(val) => setEmail(val)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(val) => setPassword(val)}
        value={password}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
        Need an account? Register here
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    marginVertical: 8,
    padding: 10,
    borderRadius: 4,
  },
  linkText: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
