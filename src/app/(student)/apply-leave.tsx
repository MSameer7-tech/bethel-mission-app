import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar as CalendarIcon, Paperclip } from 'lucide-react-native';

export default function ApplyLeaveScreen() {
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('2026-10-15');
  const [toDate, setToDate] = useState('2026-10-16');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.label}>From Date</Text>
        <TouchableOpacity style={styles.inputContainer}>
          <CalendarIcon color="#64748B" size={20} />
          <Text style={styles.inputText}>{fromDate}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>To Date</Text>
        <TouchableOpacity style={styles.inputContainer}>
          <CalendarIcon color="#64748B" size={20} />
          <Text style={styles.inputText}>{toDate}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Reason for Leave</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Please explain why you need leave..."
            placeholderTextColor="#94A3B8"
            value={reason}
            onChangeText={setReason}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.attachButton}>
          <Paperclip color="#0284C7" size={20} />
          <Text style={styles.attachText}>Attach Document (Medical Certificate etc.)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={() => alert('Leave application submitted successfully.')}>
          <Text style={styles.submitButtonText}>Submit Application</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Leave History</Text>
      
      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyDates}>25 Sept 2026</Text>
          <View style={styles.statusBadgeApproved}>
            <Text style={styles.statusTextApproved}>Approved</Text>
          </View>
        </View>
        <Text style={styles.historyReason}>Family Function</Text>
      </View>

      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyDates}>10 Aug - 12 Aug 2026</Text>
          <View style={styles.statusBadgeApproved}>
            <Text style={styles.statusTextApproved}>Approved</Text>
          </View>
        </View>
        <Text style={styles.historyReason}>Viral Fever (Medical Certificate attached)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    gap: 12,
  },
  inputText: {
    fontSize: 16,
    color: '#1E293B',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  attachText: {
    color: '#0284C7',
    fontWeight: '500',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#0B3B60',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDates: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  historyReason: {
    fontSize: 14,
    color: '#64748B',
  },
  statusBadgeApproved: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusTextApproved: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '600',
  },
});
