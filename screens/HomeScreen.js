import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vault</Text>

      <View style={styles.mainButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateVault')}
        >
          <Text style={styles.buttonText}>Create a vault</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('JoinVault')}
        >
          <Text style={styles.buttonText}>Join a vault</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
          <Ionicons name="people-outline" size={wp('7%')} color="#D4C2FF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Savings')}>
          <MaterialIcons name="savings" size={wp('7%')} color="#D4C2FF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={wp('6.5%')} color="#D4C2FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    padding: wp('5%'),
  },
  header: {
    fontSize: wp('8%'),
    fontWeight: '700',
    color: '#E4D9FF',
    textAlign: 'center',
    marginBottom: hp('5%'),
  },
  mainButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp('3%'),
  },
  actionButton: {
    backgroundColor: '#1F1333',
    paddingVertical: hp('2.3%'),
    paddingHorizontal: wp('18%'),
    borderRadius: wp('6%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#E4D9FF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: hp('4%'),
    left: wp('8%'),
    right: wp('8%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
  },
});
