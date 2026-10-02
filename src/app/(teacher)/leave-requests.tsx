import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { teacherLeaveRequests } from '@/data/teachers';

export default function LeaveRequestsScreen() {
  const [requests, setRequests] = useState(teacherLeaveRequests);

  const handleAction = (id: number, status: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {requests.map(req => (
        <View key={req.id} style={styles.card}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.studentName}>{req.studentName}</Text>
              <Text style={styles.detailsText}>Class {req.class} • Roll {req.roll}</Text>
            </View>
            <View style={[styles.statusBadge, req.status === 'approved' ? styles.badgeApproved : (req.status === 'rejected' ? styles.badgeRejected : styles.badgePending)]}>
              <Text style={[styles.statusText, req.status === 'approved' ? styles.textApproved : (req.status === 'rejected' ? styles.textRejected : styles.textPending)]}>
                {req.status.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{req.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reason:</Text>
            <Text style={styles.infoValue}>{req.reason}</Text>
          </View>

          {req.status === 'pending' && (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.rejectBtn} onPress={() => handleAction(req.id, 'rejected')}>
                <XCircle color="#E11D48" size={20} />
                <Text style={styles.rejectText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveBtn} onPress={() => handleAction(req.id, 'approved')}>
                <CheckCircle color="#FFFFFF" size={20} />
                <Text style={styles.approveText}>Approve</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  studentName: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  detailsText: { fontSize: 13, color: '#64748B' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgePending: { backgroundColor: '#FEF3C7' },
  badgeApproved: { backgroundColor: '#DCFCE7' },
  badgeRejected: { backgroundColor: '#FFE4E6' },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  textPending: { color: '#D97706' },
  textApproved: { color: '#16A34A' },
  textRejected: { color: '#E11D48' },
  infoRow: { flexDirection: 'row', marginBottom: 8 },
  infoLabel: { width: 60, fontSize: 14, color: '#64748B', fontWeight: '500' },
  infoValue: { flex: 1, fontSize: 14, color: '#1E293B' },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  rejectBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF1F2', paddingVertical: 12, borderRadius: 8, gap: 8 },
  rejectText: { color: '#E11D48', fontWeight: '600' },
  approveBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B3B60', paddingVertical: 12, borderRadius: 8, gap: 8 },
  approveText: { color: '#FFFFFF', fontWeight: '600' },
});
