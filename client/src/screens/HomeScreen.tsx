// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Example: Fetch JWT from storage to demonstrate
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    loadToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Text>JWT Token: {token || 'No token found.'}</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

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
});
