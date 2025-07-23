import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DepositScreen({ navigation }) {
  const [vaults, setVaults] = useState([]);
  const [selectedVaultId, setSelectedVaultId] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    (async () => {
      const storedVaults = await AsyncStorage.getItem('vaults');
      setVaults(storedVaults ? JSON.parse(storedVaults) : []);
    })();
  }, []);

  const handleDeposit = async () => {
    if (!selectedVaultId || !amount || isNaN(amount) || Number(amount) <= 0) {
      Alert.alert('Error', 'Please select a vault and enter a valid amount.');
      return;
    }
    const updatedVaults = vaults.map(vault => {
      if (vault.id === selectedVaultId) {
        return {
          ...vault,
          amount: (Number(vault.amount) || 0) + Number(amount),
        };
      }
      return vault;
    });
    await AsyncStorage.setItem('vaults', JSON.stringify(updatedVaults));
    Alert.alert('Success', 'Deposit successful!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deposit to Vault</Text>
      <Text style={styles.label}>Select Vault</Text>
      <FlatList
        data={vaults}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.vaultItem,
              selectedVaultId === item.id && styles.vaultItemSelected,
            ]}
            onPress={() => setSelectedVaultId(item.id)}
          >
            <Text style={styles.vaultTitle}>{item.title}</Text>
            <Text style={styles.vaultAmount}>{item.amount}/-</Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
        underlineColorAndroid="transparent"
        placeholderTextColor="#AAA"
      />
      <TouchableOpacity style={styles.depositBtn} onPress={handleDeposit}>
        <Text style={styles.depositText}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#181818', padding: 24 },
  header: { fontSize: 22, fontWeight: '700', color: '#FFF', marginBottom: 24 },
  label: { color: '#AAA', fontSize: 15, marginBottom: 8 },
  vaultItem: {
    backgroundColor: '#232323',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vaultItemSelected: {
    borderColor: '#AD99FF',
    borderWidth: 2,
  },
  vaultTitle: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  vaultAmount: { color: '#AD99FF', fontSize: 15, fontWeight: '500' },
  input: {
    backgroundColor: '#232323',
    borderRadius: 10,
    padding: 12,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 0,
    underlineColorAndroid: 'transparent',
  },
  depositBtn: {
    backgroundColor: '#7A58C1',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
 depositText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});