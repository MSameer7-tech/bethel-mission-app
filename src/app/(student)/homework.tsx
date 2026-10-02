import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Clock, ChevronRight, CheckCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const studentHomework = [
  { id: 1, subject: 'MATHEMATICS', title: 'Quadratic Equations', dueDate: 'Tomorrow, 08:00 AM', status: 'Pending', color: '#0EA5E9', bg: '#E0F2FE' },
  { id: 2, subject: 'SCIENCE', title: 'Digestive System', dueDate: '12 Oct 2026', status: 'Pending', color: '#8B5CF6', bg: '#EDE9FE' },
  { id: 3, subject: 'ENGLISH', title: 'Essay: Global Warming', dueDate: '10 Oct 2026', status: 'Submitted', color: '#10B981', bg: '#D1FAE5' },
];

export default function HomeworkScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: Math.max(insets.bottom, 16) + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {studentHomework.map((hw, idx) => (
          <TouchableOpacity key={hw.id} style={styles.hwCard} activeOpacity={0.7}>
            <View style={styles.cardHeader}>
              <View style={styles.subjectBadge}>
                <View style={[styles.subjectDot, { backgroundColor: hw.color }]} />
                <Text style={[styles.subjectText, { color: hw.color }]}>{hw.subject}</Text>
              </View>
              {hw.status === 'Submitted' ? (
                <View style={styles.statusBadgeSuccess}>
                  <CheckCircle color="#10B981" size={14} />
                  <Text style={styles.statusTextSuccess}>Submitted</Text>
                </View>
              ) : (
                <View style={styles.statusBadgePending}>
                  <Clock color="#D97706" size={14} />
                  <Text style={styles.statusTextPending}>Pending</Text>
                </View>
              )}
            </View>

            <Text style={styles.hwTitle} numberOfLines={2}>{hw.title}</Text>
            
            <View style={styles.dueRow}>
              <Text style={styles.dueLabel}>Due:</Text>
              <Text style={[styles.dueValue, hw.status === 'Pending' && { color: '#E11D48' }]}>{hw.dueDate}</Text>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.attachment}>
                <FileText color="#64748B" size={16} />
                <Text style={styles.attachmentText}>Questions.pdf</Text>
              </View>
              <View style={[styles.viewBtn, { backgroundColor: hw.bg }]}>
                <Text style={[styles.viewBtnText, { color: hw.color }]}>View</Text>
                <ChevronRight color={hw.color} size={16} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  content: { padding: 20 },
  hwCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2, borderWidth: 1, borderColor: '#F1F5F9' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  subjectBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subjectDot: { width: 10, height: 10, borderRadius: 5 },
  subjectText: { fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  statusBadgeSuccess: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#D1FAE5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  statusTextSuccess: { color: '#10B981', fontSize: 12, fontWeight: '800' },
  statusBadgePending: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  statusTextPending: { color: '#D97706', fontSize: 12, fontWeight: '800' },
  hwTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  dueRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dueLabel: { fontSize: 14, color: '#64748B', marginRight: 8 },
  dueValue: { fontSize: 14, fontWeight: '700', color: '#334155' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  attachment: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  attachmentText: { fontSize: 14, color: '#475569', fontWeight: '600' },
  viewBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, gap: 4 },
  viewBtnText: { fontSize: 13, fontWeight: '800' },
});
