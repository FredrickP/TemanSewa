import type {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Inbox: undefined;
  Status: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  AuthLanding: undefined;
  Login: undefined;
  Register: undefined;
  PreferenceSetup: undefined;
  LifestylePreference: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  RoommateDetail: {
    roommateId: string;
  };
  Chat: {
    roommateId: string;
  };
  Agreement: {
    roommateId: string;
  };
};