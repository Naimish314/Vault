import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Modal, FlatList, ScrollView
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

export default function CreateVaultScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [numMembers, setNumMembers] = useState('');
  const [memberInput, setMemberInput] = useState('');
  const [members, setMembers] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const addMember = () => {
    if (memberInput.trim()) {
      setMembers([...members, memberInput.trim()]);
      setMemberInput('');
    }
  };

  const saveVault = async () => {

    try {

    const newVault = {
        id: Date.now().toString(),
        title,
        numMembers,
        members,
      };


      const storedVaults = await AsyncStorage.getItem('vaults');
      const parsedVaults = storedVaults ? JSON.parse(storedVaults) : [];
      parsedVaults.push(newVault);

      await AsyncStorage.setItem('vaults', JSON.stringify(parsedVaults));
      setSuccessModalVisible(true);
    } catch (err) {
      console.log('Error saving vault:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create a New Vault</Text>

      <TextInput
        style={styles.input}
        placeholder="Vault Title"
        placeholderTextColor="#AAA"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Members"
        placeholderTextColor="#AAA"
        value={numMembers}
        onChangeText={setNumMembers}
        keyboardType="numeric"
      />


      {/* Add Members */}
      <View style={styles.memberSection}>
        <Text style={styles.subHeader}>Add Members</Text>

        <View style={styles.memberInputRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Enter member name/email"
            placeholderTextColor="#AAA"
            value={memberInput}
            onChangeText={setMemberInput}
          />
          <TouchableOpacity onPress={addMember} style={styles.addBtn}>
            <Feather name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {members.map((item, index) => (
            <Text key={index} style={styles.memberText}>• {item}</Text>
            ))}

      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveVault}>
        <Text style={styles.saveText}>Save Vault</Text>
      </TouchableOpacity>

      {/* Themed Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {title && numMembers  ? 'Vault Created 🎉' : 'Missing Details'}
            </Text>
          

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSuccessModalVisible(false);
                if (title && numMembers ) navigation.navigate('Home');
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  subHeader: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#E4D9FF',
    marginBottom: hp('1.2%'),
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
    marginTop: hp('3%'),
    marginBottom: hp('6%'),
  },
  saveText: {
    color: '#FFF',
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  memberSection: { marginTop: hp('2%') },
  memberInputRow: { flexDirection: 'row', alignItems: 'center', gap: wp('3%') },
  addBtn: {
    backgroundColor: '#7A58C1',
    padding: wp('3.2%'),
    borderRadius: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberText: { color: '#AD99FF', fontSize: wp('4%'), marginVertical: hp('0.3%') },
  modalBackdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', alignItems: 'center',
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
  modalTitle: { fontSize: wp('5.5%'), fontWeight: '700', color: '#E4D9FF', marginBottom: hp('1%') },
  modalMessage: {
    color: '#AAA', fontSize: wp('4%'),
    textAlign: 'center', marginBottom: hp('2.5%')
  },
  modalButton: {
    backgroundColor: '#7A58C1',
    borderRadius: 10,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('10%'),
  },
  modalButtonText: { color: '#FFF', fontWeight: '600', fontSize: wp('4%') },
});
