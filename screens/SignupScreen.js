import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: '700',
    color: '#E4D9FF',
    marginBottom: hp('4%'),
  },
  input: {
    width: '100%',
    padding: hp('1.8%'),
    borderRadius: wp('3%'),
    backgroundColor: '#1E1E2F',
    color: '#fff',
    marginBottom: hp('2%'),
    fontSize: wp('4.2%'),
  },
  button: {
    backgroundColor: '#6A4C93',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('25%'),
    borderRadius: wp('10%'),
    marginTop: hp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: '600',
  },
});
