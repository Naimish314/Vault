// screens/AlertSettingsScreen.js

import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AlertSettingsScreen({ navigation }) {
  const [reminder, setReminder] = useState(true);
  const [lowBalance, setLowBalance] = useState(false);
  const [groupActivity, setGroupActivity] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#D4C2FF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Alert Settings</Text>
        </View>

        {/* Settings */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Contribution Reminders</Text>
          <Switch
            value={reminder}
            onValueChange={setReminder}
            thumbColor={reminder ? '#AD99FF' : '#666'}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Low Vault Balance Alerts</Text>
          <Switch
            value={lowBalance}
            onValueChange={setLowBalance}
            thumbColor={lowBalance ? '#AD99FF' : '#666'}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Group Activity Updates</Text>
          <Switch
            value={groupActivity}
            onValueChange={setGroupActivity}
            thumbColor={groupActivity ? '#AD99FF' : '#666'}
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
  header: {
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
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  optionText: {
    color: '#E4D9FF',
    fontSize: 15,
  },
});
