// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import GroupsScreen from '../screens/GroupsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import SavingsScreen from '../screens/SavingsScreen';
import FAQsScreen from '../screens/FAQsScreen';
import DosDontsScreen from '../screens/DosDontsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import TermsPoliciesScreen from '../screens/TermsPoliciesScreen';
import AlertSettingsScreen from '../screens/AlertSettingsScreen';
import CreateVaultScreen from '../screens/CreateVaultScreen';
import VaultDetailsScreen from '../screens/VaultDetailsScreen';
import JoinVaultScreen from '../screens/JoinVaultScreen';
import NotificationsScreen from '../screens/NotificationsScreen';   
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateVault" component={CreateVaultScreen} />
        <Stack.Screen name="JoinVault" component={JoinVaultScreen} />
        <Stack.Screen name="VaultDetails" component={VaultDetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <Stack.Screen name="FAQs" component={FAQsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DosDonts" component={DosDontsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TermsPolicies" component={TermsPoliciesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AlertSettings" component={AlertSettingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Savings" component={SavingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}
