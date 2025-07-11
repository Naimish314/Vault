import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Squad 👋</Text>
      <Text style={styles.subtitle}>Let’s get you set up</Text>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('5%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: '700',
    color: '#E4D9FF',
    marginBottom: hp('1.5%'),
  },
  subtitle: {
    fontSize: wp('4.2%'),
    color: '#CCCCCC',
    marginBottom: hp('4%'),
  },
  buttonPrimary: {
    backgroundColor: '#6A4C93',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('20%'),
    borderRadius: wp('10%'),
    marginBottom: hp('2%'),
  },
  buttonSecondary: {
    backgroundColor: '#9D6BFF',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('20%'),
    borderRadius: wp('10%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
});
