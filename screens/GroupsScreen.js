import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockGroups = [
  { id: '1', name: 'Goa Trip', total: 3200, members: 5 },
  { id: '2', name: 'Birthday Bash', total: 1500, members: 4 },
  { id: '3', name: 'New Year Plan', total: 5000, members: 6 },
];

export default function GroupsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {/* Top header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={wp('7%')} color="#D4C2FF" />
        </TouchableOpacity>
        <Text style={styles.header}>In Groups</Text>
        <Ionicons name="lock-closed-outline" size={wp('6%')} color="#D4C2FF" />
      </View>

      {/* Group List */}
      <FlatList
        data={mockGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupCard}>
            <View style={styles.groupLeft}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.membersText}>members: {item.members}</Text>
            </View>
            <View style={styles.amountBox}>
              <Text style={styles.amountText}>₹{item.total}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: hp('3%') }}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: wp('5%'),
    paddingTop: hp('6%'),
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
  groupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1B1B1B',
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
  },
  groupLeft: {
    flex: 1,
  },
  groupName: {
    fontSize: wp('4.5%'),
    color: '#DCD6FF',
    fontWeight: '600',
  },
  membersText: {
    color: '#AAA',
    fontSize: wp('3.2%'),
    marginTop: hp('0.5%'),
  },
  amountBox: {
    backgroundColor: '#2F2F2F',
    borderRadius: wp('3%'),
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('4%'),
    justifyContent: 'center',
  },
  amountText: {
    color: '#E4D9FF',
    fontWeight: '600',
    fontSize: wp('4%'),
  },
});
