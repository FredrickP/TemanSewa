export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  AuthLanding: undefined;
  Login: undefined;
  Register: undefined;
  PreferenceSetup: undefined;
  LifestylePreference: undefined;
  Home: undefined;
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