import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import type {MainTabParamList} from '../navigation/RootStackParamList';
import {HomeScreen} from '../features/home/screens/HomeScreen';
import {InboxScreen} from '../features/inbox/screens/InboxScreen';
import {StatusScreen} from '../features/status/screens/StatusScreen';
import {ProfileScreen} from '../features/profile/screens/ProfileScreen';
import {colors} from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: 84,
          paddingTop: 8,
          paddingBottom: 24,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
        },
        tabBarIcon: ({focused}) => {
          const color = focused ? colors.primary : colors.textSecondary;

          let icon = '🏠';

          if (route.name === 'Inbox') {
            icon = '💬';
          }

          if (route.name === 'Status') {
            icon = '📌';
          }

          if (route.name === 'Profile') {
            icon = '👤';
          }

          return <Text style={{fontSize: 20, color}}>{icon}</Text>;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}