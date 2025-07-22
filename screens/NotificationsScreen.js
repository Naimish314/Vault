import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const mockNotifications = [
  { id: '1', message: 'You deposited ₹500 in Travel Vault', time: '2h ago' },
  { id: '2', message: 'Amit joined Family Vault', time: '5h ago' },
  { id: '3', message: 'You withdrew ₹200 from Party Vault', time: '1d ago' },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={mockNotifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingTop: 10 }}
      />
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
    color: '#E4D9FF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  notificationItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  message: {
    color: '#E4D9FF',
    fontSize: 16,
  },
  time: {
    color: '#AAA',
    fontSize: 13,
    marginTop: 4,
  },
});