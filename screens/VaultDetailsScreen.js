import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function VaultDetailsScreen() {
  const route = useRoute();
  const { vaultId } = route.params;
  const [vault, setVault] = useState(null);

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const storedVaults = await AsyncStorage.getItem('vaults');
        const parsed = storedVaults ? JSON.parse(storedVaults) : [];
        const found = parsed.find(v => v.id === vaultId);
        setVault(found);
      } catch (err) {
        console.error('Error loading vault:', err);
      }
    };

    fetchVault();
  }, []);

  if (!vault) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading Vault...</Text>
      </View>
    );
  }

  // Calculate time left and amount remaining
  const currentDate = new Date();
  const end = new Date(vault.endDate);
  const start = new Date(vault.startDate);
  const totalTime = end.getTime() - start.getTime();
  const timeLeft = end.getTime() - currentDate.getTime();
  const percent = Math.max(0, Math.min(100, 100 - (timeLeft / totalTime) * 100));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{vault.title}</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>{vault.amount}</Text>

        <Text style={styles.label}>Number of Members:</Text>
        <Text style={styles.value}>{vault.numMembers}</Text>

        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.value}>{new Date(vault.startDate).toDateString()}</Text>

        <Text style={styles.label}>End Date:</Text>
        <Text style={styles.value}>{new Date(vault.endDate).toDateString()}</Text>

        <Text style={styles.label}>Monthly Contribution per Member:</Text>
        <Text style={styles.value}>{vault.monthlyContribution}</Text>

        <Text style={styles.label}>Due Date Each Month:</Text>
        <Text style={styles.value}>Day {vault.dueDay} of the month</Text>

        <Text style={styles.label}>Progress:</Text>
        <Text style={styles.value}>{percent.toFixed(1)}% completed</Text>

        <Text style={styles.label}>Time Left:</Text>
        <Text style={styles.value}>
          {Math.ceil(timeLeft / (1000 * 60 * 60 * 24))} days
        </Text>

        <Text style={styles.label}>Members:</Text>
        {vault.members && vault.members.length > 0 ? (
          vault.members.map((m, i) => (
            <Text key={i} style={styles.value}>• {m}</Text>
          ))
        ) : (
          <Text style={styles.value}>No members added yet</Text>
        )}
      </View>

      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.withdrawText}>Request Withdraw (Needs Approval)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0A0A0A',
    padding: wp('6%'),
    paddingTop: hp('7%'),
  },
  header: {
    fontSize: wp('7%'),
    fontWeight: '700',
    color: '#E4D9FF',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  detailCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: wp('4%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
    padding: wp('5%'),
    marginBottom: hp('4%'),
  },
  label: {
    color: '#AD99FF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginTop: hp('1.2%'),
  },
  value: {
    color: '#E4D9FF',
    fontSize: wp('4.2%'),
    marginBottom: hp('1%'),
  },
  withdrawButton: {
    backgroundColor: '#7A58C1',
    paddingVertical: hp('2%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
  },
  withdrawText: {
    color: '#FFF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
});
