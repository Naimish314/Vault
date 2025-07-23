import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavingsScreen({ route }) {
  const [savingsGoals, setSavingsGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // Try to get from navigation params first
        if (route.params?.savingsGoals) {
          setSavingsGoals(route.params.savingsGoals);
        } else {
          // Otherwise, get from AsyncStorage
          const storedVaults = await AsyncStorage.getItem('vaults');
          const parsedVaults = storedVaults ? JSON.parse(storedVaults) : [];
          setSavingsGoals(parsedVaults);
        }
      } catch (err) {
        setSavingsGoals([]);
      }
    };
    fetchGoals();
  }, [route.params]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Savings Overview</Text>

        <View style={styles.statsBox}>
          <Text style={styles.goalCount}>{savingsGoals.length} Vault Goals</Text>
          <Text style={styles.subtext}>You're making progress 🚀</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              New: {savingsGoals.filter(g => g.status === 'New').length}
            </Text>
            <Text style={styles.progressText}>
              In Progress: {savingsGoals.filter(g => g.status === 'In Progress').length}
            </Text>
            <Text style={styles.progressText}>
              Completed: {savingsGoals.filter(g => g.status === 'Completed').length}
            </Text>
          </View>
        </View>

        {savingsGoals.map((goal, index) => (
          <TouchableOpacity key={index} style={[styles.card, { borderLeftColor: goal.color || '#7A58C1' }]}>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{goal.title}</Text>
              <Text style={styles.cardDescription}>{goal.description}</Text>
              <Text style={styles.cardStatus}>Status: {goal.status}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={wp('6%')} color="#aaa" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
 safeArea: {
        flex: 1,
        backgroundColor: '#0A0A0A',
    },
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: wp('5%'),
  },
  header: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#E4D9FF',
    marginBottom: hp('2.5%'),
    textAlign: 'center',
  },
  statsBox: {
    backgroundColor: '#1F1333',
    borderRadius: wp('5%'),
    padding: wp('5%'),
    marginBottom: hp('3%'),
    alignItems: 'center',
    borderColor: '#7A58C1',
    borderWidth: 1,
  },
  goalCount: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#DCCEFF',
  },
  subtext: {
    color: '#B4A5E5',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
    marginBottom: hp('1.5%'),
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp('1%'),
  },
  progressText: {
    color: '#AD99FF',
    fontSize: wp('3.5%'),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: wp('3.5%'),
    padding: wp('4.5%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: wp('1.3%'),
  },
  cardText: {
    flex: 1,
    paddingRight: wp('3%'),
  },
  cardTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#E4D9FF',
  },
  cardDescription: {
    fontSize: wp('3.5%'),
    color: '#B4A5E5',
    marginVertical: hp('0.5%'),
  },
  cardStatus: {
    fontSize: wp('3.2%'),
    color: '#AAA',
  },
});