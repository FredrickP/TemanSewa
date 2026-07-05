import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/RootStackParamList';

import {AuthLandingScreen} from '../features/auth/screens/AuthLandingScreen';
import {OnboardingScreen} from '../features/onboarding/screens/OnboardingScreen';
import {SplashScreen} from '../features/onboarding/screens/SplashScreen';
import {LoginScreen} from '../features/auth/screens/LoginScreen';
import {RegisterScreen} from '../features/auth/screens/RegisterScreen';
import {HomeScreen} from '../features/home/screens/HomeScreen';
import {PreferenceSetupScreen} from '../features/preference/screens/PreferenceSetupScreen';
import {LifestylePreferenceScreen} from '../features/preference/screens/LifestylePreferenceScreen';
import {RoommateDetailScreen} from '../features/matching/screens/RoommateDetailScreen';
import {ChatScreen} from '../features/matching/screens/ChatScreen';
import {AgreementScreen} from '../features/matching/screens/AgreementScreen';

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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PreferenceSetup" component={PreferenceSetupScreen} />
        <Stack.Screen
          name="LifestylePreference"
          component={LifestylePreferenceScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RoommateDetail" component={RoommateDetailScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Agreement" component={AgreementScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}