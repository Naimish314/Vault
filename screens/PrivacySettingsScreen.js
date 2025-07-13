// screens/PrivacySettingsScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacySettingsScreen({ navigation }) {
  const [isPrivateVault, setIsPrivateVault] = useState(true);
  const [showActivity, setShowActivity] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#D4C2FF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Privacy Settings</Text>
        </View>

        {/* Settings */}
        <View style={styles.settingRow}>
          <Text style={styles.label}>Make vault private</Text>
          <Switch
            value={isPrivateVault}
            onValueChange={setIsPrivateVault}
            trackColor={{ false: '#666', true: '#AD99FF' }}
            thumbColor={isPrivateVault ? '#D4C2FF' : '#888'}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Show activity status</Text>
          <Switch
            value={showActivity}
            onValueChange={setShowActivity}
            trackColor={{ false: '#666', true: '#AD99FF' }}
            thumbColor={showActivity ? '#D4C2FF' : '#888'}
          />
        </View>
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
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 20,
    color: '#E4D9FF',
    fontWeight: '700',
  },
  settingRow: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#C7B3FF',
    fontWeight: '600',
  },
});
