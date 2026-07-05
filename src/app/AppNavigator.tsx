import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthLandingScreen} from '../features/auth/screens/AuthLandingScreen';
import {OnboardingScreen} from '../features/onboarding/screens/OnboardingScreen';
import {SplashScreen} from '../features/onboarding/screens/SplashScreen';
import type {RootStackParamList} from '../navigation/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="AuthLanding" component={AuthLandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}