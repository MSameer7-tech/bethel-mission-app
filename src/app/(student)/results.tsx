import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Award, FileText, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const examResults = [
  { subject: 'Mathematics', score: 84, total: 100, color: '#0EA5E9' },
  { subject: 'Science', score: 79, total: 100, color: '#8B5CF6' },
  { subject: 'English', score: 91, total: 100, color: '#10B981' },
  { subject: 'Hindi', score: 87, total: 100, color: '#F59E0B' },
  { subject: 'Social Science', score: 82, total: 100, color: '#F43F5E' },
];

export default function ResultsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: Math.max(insets.bottom, 16) + 20 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroIconWrapper}>
          <Award color="#0D9488" size={32} />
        </View>
        <Text style={styles.heroSubtitle}>Half Yearly Examination 2026</Text>
        <Text style={styles.heroTitle}>84.6%</Text>
        <Text style={styles.heroGrade}>Grade A</Text>
      </View>

      <Text style={styles.sectionTitle}>SUBJECT PERFORMANCE</Text>
      <View style={styles.subjectsCard}>
        {examResults.map((res, idx) => (
          <View key={idx} style={[styles.subjectRow, idx === examResults.length - 1 && styles.rowLast]}>
            <View style={styles.subjectTop}>
              <Text style={styles.subjectName}>{res.subject}</Text>
              <Text style={styles.subjectScore}><Text style={styles.scoreHighlight}>{res.score}</Text>/{res.total}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { backgroundColor: res.color, width: `${(res.score / res.total) * 100}%` }]} />
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>TEACHER REMARKS</Text>
      <View style={styles.remarksCard}>
        <Text style={styles.remarksText}>
          "Jitendra has shown excellent progress this term, particularly in English and Mathematics. Continue working on Science practical concepts to improve further."
        </Text>
      </View>

      <TouchableOpacity style={styles.reportBtn} activeOpacity={0.8}>
        <FileText color="#FFFFFF" size={20} />
        <Text style={styles.reportBtnText}>View Full Report Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  content: { padding: 20 },
  heroCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 32, alignItems: 'center', marginBottom: 24, shadowColor: '#0D9488', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 3, borderWidth: 1, borderColor: '#CCFBF1' },
  heroIconWrapper: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroSubtitle: { fontSize: 14, color: '#64748B', fontWeight: '700', marginBottom: 6 },
  heroTitle: { fontSize: 48, fontWeight: '900', color: '#0F172A', marginBottom: 6 },
  heroGrade: { fontSize: 16, fontWeight: '800', color: '#0D9488', backgroundColor: '#F0FDFA', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  subjectsCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 24, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  subjectRow: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingBottom: 16 },
  rowLast: { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
  subjectTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  subjectName: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  subjectScore: { fontSize: 15, color: '#94A3B8', fontWeight: '600' },
  scoreHighlight: { color: '#0F172A', fontWeight: '800' },
  progressBarBg: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  remarksCard: { backgroundColor: '#FEF9C3', padding: 20, borderRadius: 20, marginBottom: 32, borderWidth: 1, borderColor: '#FEF08A' },
  remarksText: { fontSize: 16, lineHeight: 24, color: '#854D0E', fontStyle: 'italic' },
  reportBtn: { backgroundColor: '#0B3B60', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: 20, gap: 10, shadowColor: '#0B3B60', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 16 },
  reportBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
});
