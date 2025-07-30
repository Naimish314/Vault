import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupsScreen({ navigation }) {
  const [vaults, setVaults] = useState([]);

useEffect(() => {
  const fetchVaults = async () => {
    const data = await AsyncStorage.getItem('vaults');
    if (data) {
      const allVaults = JSON.parse(data);
      const completeVaults = allVaults.filter(v => v?.title );
      setVaults(completeVaults);
    }
  };

    const unsubscribe = navigation.addListener('focus', fetchVaults);
    return unsubscribe;
  }, [navigation]);

  const deleteVault = async (id) => {
    Alert.alert(
      'Delete Vault',
      'Are you sure you want to delete this vault?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = vaults.filter((v) => v.id !== id);
            setVaults(updated);
            await AsyncStorage.setItem('vaults', JSON.stringify(updated));
          },
        },
      ]
    );
  };

const renderVault = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('VaultDetails', { vaultId: item.id })}
      activeOpacity={0.85}
      style={styles.vaultCard}
    >
      <Text style={styles.vaultTitle}>{item.title}</Text>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={(e) => {
            e.stopPropagation(); // Prevent parent touch
            Alert.alert('Edit feature coming soon!');
          }}
        >
          <Text style={styles.btnText}>Edit Vault</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={(e) => {
            e.stopPropagation();
            deleteVault(item.id);
          }}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={(e) => {
            e.stopPropagation();
            navigation.navigate('SubVault', {
              vaultId: item.id,
              members: item.members,
            });
          }}
        >
          <Text style={styles.btnText}>Sub-Vault</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={wp('7%')} color="#D4C2FF" />
          </TouchableOpacity>
          <Text style={styles.header}>Groups</Text>
          <Ionicons name="lock-closed-outline" size={wp('6%')} color="#D4C2FF" />
        </View>

        {/* Vault List */}
        <FlatList
          data={vaults}
          keyExtractor={(item) => item.id}
          renderItem={renderVault}
          contentContainerStyle={{ paddingBottom: hp('3%') }}
        />
      </View>
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
    padding: wp('5%'),
    paddingTop: hp('2%'),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  header: {
    fontSize: wp('6%'),
    color: '#E4D9FF',
    fontWeight: '700',
  },
  vaultCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2.5%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
  },
  vaultTitle: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#DCD6FF',
    marginBottom: hp('1%'),
  },
  info: {
    color: '#AAA',
    fontSize: wp('3.7%'),
    marginBottom: hp('0.6%'),
  },
  progressBar: {
    height: hp('1.3%'),
    backgroundColor: '#333',
    borderRadius: wp('2%'),
    overflow: 'hidden',
    marginVertical: hp('1%'),
  },
  progressFill: {
    backgroundColor: '#AD99FF',
    height: '100%',
  },
  progressText: {
    color: '#AD99FF',
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp('3%'),
    marginTop: hp('1.5%'),
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#5A3C9A',
    padding: hp('1.2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#3A234F',
    padding: hp('1.2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  btnText: {
    color: '#E4D9FF',
    fontWeight: '600',
    fontSize: wp('4%'),
  },
});
