// screens/TermsPoliciesScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsPoliciesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={26} color="#D4C2FF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>T&Cs and Policies</Text>
        </View>

        {/* Terms Content */}
        <Text style={styles.sectionHeader}>Terms & Conditions</Text>
        <Text style={styles.contentText}>
          By using the Vault app, you agree to contribute and access savings only with unanimous group approval. Misuse may lead to restricted access or account review.
        </Text>

        <Text style={styles.sectionHeader}>Privacy Policy</Text>
        <Text style={styles.contentText}>
          We respect your privacy. No personal data is shared with third parties. Profile pictures and activity logs are stored locally and are not uploaded to our servers.
        </Text>

        <Text style={styles.sectionHeader}>Data Storage</Text>
        <Text style={styles.contentText}>
          All group-related data is securely stored within the device using encrypted storage. You can request complete deletion of your data via app settings.
        </Text>

        <Text style={styles.sectionHeader}>User Responsibility</Text>
        <Text style={styles.contentText}>
          Users are expected to participate honestly in group savings. Any form of manipulation, impersonation, or misrepresentation may lead to suspension.
        </Text>
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
    padding: 20,
    paddingBottom: 60,
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
  sectionHeader: {
    color: '#AD99FF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#CCC',
    lineHeight: 22,
  },
});
