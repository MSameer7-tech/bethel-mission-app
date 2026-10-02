import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Award, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const examsList = [
  { id: '1', name: 'Half Yearly Examination 2026', class: 'VII-C', subject: 'Mathematics', status: 'Pending Marks' },
  { id: '2', name: 'Unit Test II', class: 'VII-C', subject: 'Mathematics', status: 'Published' },
  { id: '3', name: 'Half Yearly Examination 2026', class: 'VIII-A', subject: 'Mathematics', status: 'Pending Marks' },
];

export default function ExaminationsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examsList.map(exam => (
        <TouchableOpacity 
          key={exam.id} 
          style={styles.card}
          onPress={() => {
            if (exam.status === 'Pending Marks') {
              router.push(`/(teacher)/enter-marks?examId=${exam.id}` as any);
            } else {
              alert('Marks already published.');
            }
          }}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Award color="#0284C7" size={24} />
            </View>
            <View style={[styles.statusBadge, exam.status === 'Published' ? styles.badgeSuccess : styles.badgeWarning]}>
              <Text style={[styles.statusText, exam.status === 'Published' ? styles.textSuccess : styles.textWarning]}>{exam.status}</Text>
            </View>
          </View>
          
          <Text style={styles.title}>{exam.name}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>Class: {exam.class}</Text>
            <View style={styles.dot} />
            <Text style={styles.detailsText}>{exam.subject}</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.actionText}>{exam.status === 'Pending Marks' ? 'Enter Marks' : 'View Marks'}</Text>
            <ChevronRight color="#0284C7" size={16} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#F0F9FF', alignItems: 'center', justifyContent: 'center' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeSuccess: { backgroundColor: '#DCFCE7' },
  badgeWarning: { backgroundColor: '#FEF3C7' },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  textSuccess: { color: '#16A34A' },
  textWarning: { color: '#D97706' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  detailsText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1', marginHorizontal: 8 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9', gap: 4 },
  actionText: { color: '#0284C7', fontWeight: '600', fontSize: 14 },
});
