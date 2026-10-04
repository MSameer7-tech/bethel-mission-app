import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Clock, ChevronRight, CheckCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function HomeworkScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const insets = useSafeAreaInsets();

  const studentHomework = [
  { id: 1, subject: 'MATHEMATICS', title: 'Quadratic Equations', dueDate: 'Tomorrow, 08:00 AM', status: 'Pending', color: theme.colors.info, bg: theme.colors.infoBg },
  { id: 2, subject: 'SCIENCE', title: 'Digestive System', dueDate: '12 Oct 2026', status: 'Pending', color: theme.colors.academic, bg: theme.colors.academicBg },
  { id: 3, subject: 'ENGLISH', title: 'Essay: Global Warming', dueDate: '10 Oct 2026', status: 'Submitted', color: theme.colors.success, bg: theme.colors.successBg },
];


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
                  <CheckCircle color={theme.colors.success} size={14} />
                  <Text style={styles.statusTextSuccess}>Submitted</Text>
                </View>
              ) : (
                <View style={styles.statusBadgePending}>
                  <Clock color={theme.colors.warning} size={14} />
                  <Text style={styles.statusTextPending}>Pending</Text>
                </View>
              )}
            </View>

            <Text style={styles.hwTitle} numberOfLines={2}>{hw.title}</Text>
            
            <View style={styles.dueRow}>
              <Text style={styles.dueLabel}>Due:</Text>
              <Text style={[styles.dueValue, hw.status === 'Pending' && { color: theme.colors.error }]}>{hw.dueDate}</Text>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.attachment}>
                <FileText color={theme.colors.textSecondary} size={16} />
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

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20 },
  hwCard: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 20, marginBottom: 20, shadowColor: '#111827', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2, borderWidth: 1, borderColor: theme.colors.borderLight },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  subjectBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subjectDot: { width: 10, height: 10, borderRadius: 5 },
  subjectText: { fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  statusBadgeSuccess: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.successBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  statusTextSuccess: { color: theme.colors.success, fontSize: 12, fontWeight: '800' },
  statusBadgePending: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.warningBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  statusTextPending: { color: theme.colors.warning, fontSize: 12, fontWeight: '800' },
  hwTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.textPrimary, marginBottom: 10 },
  dueRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dueLabel: { fontSize: 14, color: theme.colors.textSecondary, marginRight: 8 },
  dueValue: { fontSize: 14, fontWeight: '700', color: theme.colors.textPrimary },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTopWidth: 1, borderTopColor: theme.colors.borderLight },
  attachment: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  attachmentText: { fontSize: 14, color: '#475569', fontWeight: '600' },
  viewBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, gap: 4 },
  viewBtnText: { fontSize: 13, fontWeight: '800' },
});
