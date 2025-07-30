
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Modal, FlatList
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import uuid from 'react-native-uuid';

export default function SubVaultsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { vaultId } = route.params;

  const [subVaults, setSubVaults] = useState([]);
  const [subVaultName, setSubVaultName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    const loadSubVaults = async () => {
      const storedSubVaults = await AsyncStorage.getItem(`subvaults_${vaultId}`);
      if (storedSubVaults) {
        setSubVaults(JSON.parse(storedSubVaults));
      }
    };
    loadSubVaults();
  }, [vaultId]);

  const saveSubVault = async () => {
    if (!subVaultName || !goalAmount || !startDate || !endDate) {
      setSuccessModalVisible(true);
      return;
    }

    const newSubVault = {
      id: uuid.v4(),
      name: subVaultName,
      goalAmount,
      startDate,
      endDate,
      progress: 0,
      collectedAmount: 0, // ✅ initialize here
    };

    const updatedSubVaults = [...subVaults, newSubVault];
    setSubVaults(updatedSubVaults);
    await AsyncStorage.setItem(`subvaults_${vaultId}`, JSON.stringify(updatedSubVaults));

    setSubVaultName('');
    setGoalAmount('');
    setStartDate('');
    setEndDate('');
    setSuccessModalVisible(true);
  };

  const renderSubVault = ({ item }) => (
    <View style={styles.vaultCard}>
      <Text style={styles.vaultTitle}>{item.name}</Text>
      <Text style={styles.vaultDetails}>Goal: ₹{item.goalAmount}</Text>
      <Text style={styles.vaultDetails}>From: {item.startDate} To: {item.endDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a Sub-Vault</Text>
       

      <TextInput
        style={styles.input}
        placeholder="Sub-Vault Name"
        placeholderTextColor="#AAA"
        value={subVaultName}
        onChangeText={setSubVaultName}
      />

      <TextInput
        style={styles.input}
        placeholder="Goal Amount"
        placeholderTextColor="#AAA"
        value={goalAmount}
        onChangeText={setGoalAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={() => setShowStartCalendar(!showStartCalendar)} style={styles.input}>
        <Text style={{ color: '#E4D9FF' }}>{startDate ? `Start Date: ${startDate}` : 'Select Start Date'}</Text>
      </TouchableOpacity>
      {showStartCalendar && (
        <Calendar
          onDayPress={day => {
            setStartDate(day.dateString);
            setShowStartCalendar(false);
          }}
          theme={calendarTheme}
          markedDates={{ [startDate]: { selected: true, selectedColor: '#7A58C1' } }}
        />
      )}

      <TouchableOpacity onPress={() => setShowEndCalendar(!showEndCalendar)} style={styles.input}>
        <Text style={{ color: '#E4D9FF' }}>{endDate ? `End Date: ${endDate}` : 'Select End Date'}</Text>
      </TouchableOpacity>
      {showEndCalendar && (
        <Calendar
          onDayPress={day => {
            setEndDate(day.dateString);
            setShowEndCalendar(false);
          }}
          theme={calendarTheme}
          markedDates={{ [endDate]: { selected: true, selectedColor: '#AD99FF' } }}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={saveSubVault}>
        <Text style={styles.saveText}>Save Sub-Vault</Text>
      </TouchableOpacity>

      <FlatList
        data={subVaults}
        keyExtractor={(item) => item.id}
        renderItem={renderSubVault}
        contentContainerStyle={{ paddingBottom: hp('10%') }}
      />

      <Modal
        animationType="fade"
        transparent
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {subVaultName && goalAmount && startDate && endDate ? 'Missing Details' : 'Sub-Vault Created 🎉'}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const calendarTheme = {
  backgroundColor: '#0A0A0A',
  calendarBackground: '#0A0A0A',
  textSectionTitleColor: '#AD99FF',
  selectedDayBackgroundColor: '#7A58C1',
  selectedDayTextColor: '#FFFFFF',
  todayTextColor: '#AD99FF',
  dayTextColor: '#E4D9FF',
  textDisabledColor: '#555',
  dotColor: '#7A58C1',
  arrowColor: '#AD99FF',
  monthTextColor: '#E4D9FF',
  textDayFontWeight: '500',
  textMonthFontWeight: '700',
  textDayHeaderFontWeight: '600',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: wp('6%'),
    paddingTop: hp('6%'),
  },
  header: {
    fontSize: wp('6.5%'),
    fontWeight: '700',
    color: '#E4D9FF',
    marginBottom: hp('3%'),
  },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFF',
    paddingVertical: hp('1.7%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('3.5%'),
    fontSize: wp('4.5%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
    marginBottom: hp('2.2%'),
  },
  saveButton: {
    backgroundColor: '#7A58C1',
    paddingVertical: hp('2.2%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
  },
  saveText: {
    color: '#FFF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  vaultCard: {
    backgroundColor: '#1A1A1A',
    padding: wp('4%'),
    marginVertical: hp('1%'),
    borderRadius: wp('3%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
  },
  vaultTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#E4D9FF',
  },
  vaultDetails: {
    color: '#AD99FF',
    fontSize: wp('4%'),
    marginTop: hp('0.5%')
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: wp('6%'),
    width: wp('80%'),
    borderColor: '#7A58C1',
    borderWidth: 1,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: wp('5.5%'),
    fontWeight: '700',
    color: '#E4D9FF',
    marginBottom: hp('1.5%'),
  },
  modalButton: {
    backgroundColor: '#7A58C1',
    borderRadius: 10,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('10%'),
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: wp('4%'),
  },
});
