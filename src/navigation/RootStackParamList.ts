export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  AuthLanding: undefined;
  Login: undefined;
  Register: undefined;
  PreferenceSetup: undefined;
  LifestylePreference: undefined;
  MainTabs: undefined;
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

export type MainTabParamList = {
  Home: undefined;
  Inbox: undefined;
  Status: undefined;
  Profile: undefined;
};