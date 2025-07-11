import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/piggy.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Vault</Text>
      <Text style={styles.subtitle}>The Squad Vault</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
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
  image: {
    width: wp('50%'),
    height: hp('25%'),
    marginBottom: hp('4%'),
  },
  title: {
    fontSize: wp('10%'),
    fontWeight: '700',
    color: '#E4D9FF',
  },
  subtitle: {
    fontSize: wp('4.2%'),
    color: '#B0B0B0',
    marginBottom: hp('5%'),
  },
  button: {
    backgroundColor: '#6A4C93',
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
