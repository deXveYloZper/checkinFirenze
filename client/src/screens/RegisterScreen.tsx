// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from '../services/api';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'owner' | 'agent'>('owner');

  const handleRegister = async () => {
    try {
      if (!email || !password || !role) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }

      const response = await axios.post('/auth/register', {
        email,
        password,
        role,
      });

      Alert.alert('Success', response.data.message);
      // Navigate back to Login so they can now sign in
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Register Error:', error.response?.data || error.message);
      Alert.alert(
        'Register Failed',
        error.response?.data?.error || 'Server error'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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

      <View style={styles.roleContainer}>
        <Text>Select Role:</Text>
        <Button
          title="Owner"
          onPress={() => setRole('owner')}
          color={role === 'owner' ? 'green' : 'gray'}
        />
        <Button
          title="Agent"
          onPress={() => setRole('agent')}
          color={role === 'agent' ? 'green' : 'gray'}
        />
      </View>

      <Button title="Register" onPress={handleRegister} />

      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
    </View>
  );
};

export default RegisterScreen;

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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
    alignItems: 'center',
  },
});
