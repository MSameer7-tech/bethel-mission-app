import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar as CalendarIcon, Paperclip } from 'lucide-react-native';

export default function ApplyLeaveScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('2026-10-15');
  const [toDate, setToDate] = useState('2026-10-16');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.label}>From Date</Text>
        <TouchableOpacity style={styles.inputContainer}>
          <CalendarIcon color={theme.colors.textSecondary} size={20} />
          <Text style={styles.inputText}>{fromDate}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>To Date</Text>
        <TouchableOpacity style={styles.inputContainer}>
          <CalendarIcon color={theme.colors.textSecondary} size={20} />
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
          <Paperclip color={theme.colors.primary} size={20} />
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

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: theme.colors.background,
    gap: 12,
  },
  inputText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.background,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    padding: 16,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.infoBg,
    borderRadius: theme.radius.card,
    marginBottom: 24,
    gap: 8,
  },
  attachText: {
    color: theme.colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.card,
    alignItems: 'center',
  },
  submitButtonText: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
    color: theme.colors.textPrimary,
  },
  historyReason: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  statusBadgeApproved: {
    backgroundColor: theme.colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusTextApproved: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
});
