// JoinVaultScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const JoinVaultScreen = ({ navigation }) => {
  const [vaultCode, setVaultCode] = useState('');

  const handleJoinVault = async () => {
    if (!vaultCode.trim()) {
      Alert.alert('Error', 'Please enter a vault code');
      return;
    }

    try {
      const vaultsData = await AsyncStorage.getItem('vaults');
      const vaults = vaultsData ? JSON.parse(vaultsData) : [];

      const vaultToJoin = vaults.find(vault => vault.vaultCode === vaultCode.trim());

      if (!vaultToJoin) {
        Alert.alert('Invalid Code', 'No vault found with this code');
        return;
      }

      // Check if already joined
      const alreadyJoined = vaultToJoin.members.includes('You'); // Customize this if you have usernames
      if (alreadyJoined) {
        Alert.alert('Already Joined', 'You are already a member of this vault');
        return;
      }

      // Add user to the vault
      vaultToJoin.members.push('You'); // Replace 'You' with actual user if needed

      // Save back the updated vaults
      const updatedVaults = vaults.map(v =>
        v.vaultCode === vaultToJoin.vaultCode ? vaultToJoin : v
      );

      await AsyncStorage.setItem('vaults', JSON.stringify(updatedVaults));

      Alert.alert('Success', 'You have successfully joined the vault!');
      navigation.navigate('Groups'); // or any other screen you want to redirect to
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while joining the vault');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a Vault</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Vault Code"
        value={vaultCode}
        onChangeText={setVaultCode}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleJoinVault}>
        <Text style={styles.buttonText}>Join Vault</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinVaultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('5%')
  },
  title: {
    fontSize: wp('7%'),
    color: '#D0A3F3',
    marginBottom: hp('4%'),
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    color: 'white',
    marginBottom: hp('3%')
  },
  button: {
    backgroundColor: '#B57EDC',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('3%')
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold'
  }
});
