// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  /*
    The App component simply wraps our RootNavigator
    in a NavigationContainer. This is the entry point
    for the entire mobile app.
  */
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
