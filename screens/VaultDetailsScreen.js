import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function VaultDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { vaultId } = route.params;
  const [vault, setVault] = useState(null);
  const [subVaults, setSubVaults] = useState([]);

  useEffect(() => {
    const fetchVaultDetails = async () => {
      try {
        const storedVaults = await AsyncStorage.getItem('vaults');
        const vaultList = storedVaults ? JSON.parse(storedVaults) : [];
        const foundVault = vaultList.find(v => v.id === vaultId);
        setVault(foundVault);
      } catch (err) {
        console.error('Error loading vault:', err);
      }
    };

    const fetchSubVaults = async () => {
      try {
        const key = `subvaults_${vaultId}`;
        const storedSubVaults = await AsyncStorage.getItem(key);
        const parsed = storedSubVaults ? JSON.parse(storedSubVaults) : [];
        setSubVaults(parsed);
      } catch (error) {
        console.error('Failed to load sub-vaults:', error);
      }
    };

    fetchVaultDetails();
    fetchSubVaults();
  }, [vaultId]);

  const renderSubVaultCard = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate('SubVaultsDetail', {
          subVault: { ...item, mainVaultName: vault?.title },
        })
      }
      style={styles.subVaultCard}
    >
      <Text style={styles.subVaultTitle}>{item.name}</Text>

      <View style={styles.row}>
        <MaterialCommunityIcons name="target" size={20} color="#A259FF" />
        <Text style={[styles.subVaultText, { marginLeft: 6 }]}>Goal: ₹{item.goalAmount}</Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="calendar-start" size={20} color="#A259FF" />
        <Text style={[styles.subVaultText, { marginLeft: 6 }]}>From: {item.startDate}</Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="calendar-end" size={20} color="#A259FF" />
        <Text style={[styles.subVaultText, { marginLeft: 6 }]}>To: {item.endDate}</Text>
      </View>
    </TouchableOpacity>
  );

  if (!vault) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading Vault...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={{ paddingTop: hp('5%'), paddingHorizontal: wp('5%') }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={wp('7%')} color="#D4C2FF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{vault.title}</Text>
        </View>

        {/* Group Info */}
        <View style={styles.detailCard}>
          <Text style={styles.label}>Group Name:</Text>
          <Text style={styles.value}>{vault.title}</Text>

          <Text style={styles.label}>Number of Members:</Text>
          <Text style={styles.value}>{vault.numMembers}</Text>

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

        <Text style={styles.subVaultHeader}>Sub-Vaults</Text>
      </View>

      {/* SubVaults ScrollView */}
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
      >
        {subVaults.length > 0 ? (
          subVaults.map(renderSubVaultCard)
        ) : (
          <Text style={styles.noSubVaults}>No sub-vaults created yet</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  container: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('4%'),
  },
  detailCard: {
    backgroundColor: '#1A1A1A',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#7A58C1',
  },
  label: {
    color: '#AD99FF',
    fontSize: wp('4%'),
    marginTop: hp('1%'),
  },
  value: {
    color: '#E4D9FF',
    fontSize: wp('4.2%'),
  },
  withdrawButton: {
    backgroundColor: '#AD99FF',
    padding: wp('3.5%'),
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  withdrawText: {
    color: '#0A0A0A',
    fontWeight: 'bold',
    fontSize: wp('4.2%'),
  },
  subVaultHeader: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#E4D9FF',
    marginBottom: hp('1%'),
    marginTop: hp('2%'),
  },
  subVaultCard: {
    backgroundColor: '#1A1A1A',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    marginVertical: hp('1%'),
    borderWidth: 1,
    borderColor: '#7A58C1',
  },
  subVaultTitle: {
    fontSize: wp('4.5%'),
    color: '#AD99FF',
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  subVaultText: {
    fontSize: wp('4%'),
    color: '#E4D9FF',
  },
  noSubVaults: {
    color: '#CCC',
    fontSize: wp('4%'),
    marginTop: hp('1%'),
    fontStyle: 'italic',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp('1%'),
    paddingBottom: hp('1.5%'),
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#E4D9FF',
    marginLeft: wp('4%'),
    flexShrink: 1,
  },
});
