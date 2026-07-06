/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigator} from './src/app/AppNavigator';
import {MatchProvider} from './src/store/MatchContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <MatchProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </MatchProvider>
    </SafeAreaProvider>
  );
}

export default App;
