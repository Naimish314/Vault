import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'; // Use this for icons
import ProgressBar from 'react-native-progress/Bar';

const SubVaultsDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subVault } = route.params;

  const {
    name,
    goalAmount,
    collectedAmount = 0,
    startDate,
    endDate,
    mainVaultName,
  } = subVault;

  const calculateDaysRemaining = () => {
    if (!endDate) return '—';
    const today = new Date();
    const end = new Date(endDate);
    const diff = end - today;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  const progress = goalAmount && goalAmount > 0 ? collectedAmount / goalAmount : 0;
  const progressPercent = isNaN(progress) ? 0 : progress;

  const handleWithdrawRequest = () => {
    Alert.alert('Withdrawal', 'Request sent for unanimous approval.');
  };

  const handleDeleteSubVault = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this sub-vault?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ marginLeft: wp('2%') }}>
          <Text style={styles.vaultTitle}>{mainVaultName}</Text>
          <Text style={styles.subVaultTitle}>{name}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress Section */}
        <View style={styles.card}>
          <Text style={styles.label}>Progress</Text>
          <ProgressBar
            progress={progressPercent}
            width={null}
            height={12}
            borderRadius={20}
            color="#B388EB"
            unfilledColor="#3a3a3a"
          />
          <Text style={styles.progressText}>
            {`${Math.round(progressPercent * 100)}% Collected`}
          </Text>
        </View>

        {/* Goal Info */}
        <View style={styles.infoCard}>
           <Text style={styles.infoText}>
            <Icon name="calendar-outline" size={18} color="#ccc" /> From: {startDate || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Icon name="calendar-outline" size={18} color="#ccc" /> To: {endDate || 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            <Icon name="time-outline" size={18} color="#ccc" /> Days remaining: {calculateDaysRemaining()}
          </Text>
          <Text style={styles.infoText}>
            <Icon name="cash-outline" size={18} color="#ccc" /> Collected: ₹{collectedAmount}
          </Text>
          <Text style={styles.infoText}>
            <Icon name="wallet-outline" size={18} color="#ccc" /> Remaining: ₹{goalAmount - collectedAmount}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdrawRequest}>
            <Icon name="checkmark-circle-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Request Withdrawal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSubVault}>
            <Icon name="trash-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Delete Sub-Vault</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SubVaultsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: hp('5%'),
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('2%'),
    backgroundColor: '#0A0A0A',
  },
  vaultTitle: {
    color: '#AAA',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  subVaultTitle: {
    color: '#E4D9FF',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginTop: 2,
  },
  content: {
    padding: wp('5%'),
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: wp('5%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#7A58C1',
  },
  label: {
    color: '#AD99FF',
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    fontWeight: '600',
  },
  progressText: {
    color: '#E4D9FF',
    marginTop: hp('1%'),
    fontSize: wp('4%'),
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: wp('5%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#7A58C1',
  },
  infoText: {
    color: '#CCC',
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    fontWeight: '400',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: hp('1.5%'),
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7A58C1',
    padding: wp('4%'),
    borderRadius: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#AD99FF',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a83232',
    padding: wp('4%'),
    borderRadius: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff5a5a',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    marginLeft: wp('2%'),
    fontWeight: '600',
  },
});
