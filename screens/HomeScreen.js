import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const vaultColors = ['#7A58C1', '#AD99FF', '#5A3C9A'];

export default function HomeScreen({ navigation }) {
  const [activeVaults, setActiveVaults] = useState([]);

  // Fetch vaults from AsyncStorage when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const loadVaults = async () => {
        try {
          const storedVaults = await AsyncStorage.getItem('vaults');
          const parsedVaults = storedVaults ? JSON.parse(storedVaults) : [];
          setActiveVaults(parsedVaults);
        } catch (error) {
          console.error('Error loading vaults:', error);
        }
      };

      loadVaults();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vault</Text>

      {/* Summary Section */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Total Vaults Joined: {activeVaults.length}</Text>
        <Text style={styles.summarySubText}>Total Savings: ₹12,500</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.mainButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateVault')}
        >
          <Text style={styles.buttonText}>Create a Vault</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('JoinVault')}
        >
          <Text style={styles.buttonText}>Join a Vault</Text>
        </TouchableOpacity>
      </View>

      {/* My Active Vaults */}
      <Text style={styles.vaultStripHeader}>My Active Vaults</Text>
      <FlatList
        horizontal
        data={activeVaults}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.vaultStripContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
          style={[
            styles.vaultCard,
            { backgroundColor: vaultColors[index % vaultColors.length] }
          ]}
          onPress={() => navigation.navigate('VaultDetails', { vaultId: item.id })}
          >
            <Text style={styles.vaultTitle}>{item.title}</Text>
            <Text style={styles.vaultAmount}>{item.amount}</Text>
          </TouchableOpacity>

        )}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
          <Ionicons name="people-outline" size={wp('8%')} color="#D4C2FF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Savings')}>
          <MaterialIcons name="savings" size={wp('8%')} color="#D4C2FF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={wp('8%')} color="#D4C2FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: wp('5%'),
    paddingTop: hp('6%'),
  },
  header: {
    fontSize: wp('8%'),
    fontWeight: '700',
    color: '#E4D9FF',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  summaryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: wp('4%'),
    borderWidth: 1,
    borderColor: '#7A58C1',
    padding: wp('5%'),
    marginBottom: hp('3%'),
  },
  summaryText: {
    color: '#E4D9FF',
    fontSize: wp('4.8%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  summarySubText: {
    color: '#AAA',
    fontSize: wp('4%'),
  },
  mainButtons: {
    gap: hp('2.5%'),
    marginBottom: hp('3%'),
  },
  actionButton: {
    backgroundColor: '#1F1333',
    paddingVertical: hp('2%'),
    borderRadius: wp('6%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E4D9FF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  vaultStripHeader: {
    fontSize: wp('4.5%'),
    color: '#E4D9FF',
    fontWeight: '600',
    marginBottom: hp('1.2%'),
  },
  vaultStripContainer: {
    paddingBottom: hp('1.5%'),
  },
  vaultCard: {
  borderRadius: wp('4%'),
  padding: wp('3.5%'),
  marginRight: wp('3.5%'),
  width: wp('40%'),
  height: hp('12%'), // 🔽 Reduced height
  justifyContent: 'center',
  },
  vaultTitle: {
  color: '#FFF',
  fontSize: wp('4.2%'),
  fontWeight: '700',
  marginBottom: hp('0.5%'),
  },
  vaultAmount: {
  color: '#E4D9FF',
  fontSize: wp('3.5%'),
  },

  bottomBar: {
    position: 'absolute',
    bottom: hp('4%'),
    left: wp('10%'),
    right: wp('10%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
