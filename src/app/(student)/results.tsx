import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Award, FileText, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableBounce } from '../../components/TouchableBounce';

export default function ResultsScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const insets = useSafeAreaInsets();

  const examResults = [
    { subject: 'Mathematics', score: 84, total: 100, color: theme.colors.info },
    { subject: 'Science', score: 79, total: 100, color: theme.colors.academic },
    { subject: 'English', score: 91, total: 100, color: theme.colors.success },
    { subject: 'Hindi', score: 87, total: 100, color: theme.colors.warning },
    { subject: 'Social Science', score: 82, total: 100, color: theme.colors.error },
  ];

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: Math.max(insets.bottom, 24) }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroIconWrapper}>
          <Award color={theme.colors.teal} size={32} />
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

      <TouchableBounce bounceScale={0.97} style={styles.reportBtn}>
        <FileText color={theme.colors.surface} size={20} />
        <Text style={styles.reportBtnText}>View Full Report Card</Text>
      </TouchableBounce>
    </ScrollView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20 },
  heroCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, padding: 32, alignItems: 'center', marginBottom: 24, shadowColor: theme.colors.teal, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 3, borderWidth: 1, borderColor: theme.colors.border },
  heroIconWrapper: { width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.tealBg, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroSubtitle: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '700', marginBottom: 6 },
  heroTitle: { fontSize: 48, fontWeight: '900', color: theme.colors.textPrimary, marginBottom: 6 },
  heroGrade: { fontSize: 16, fontWeight: '800', color: theme.colors.teal, backgroundColor: theme.colors.tealBg, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, overflow: 'hidden' },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: theme.colors.textMuted, letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  subjectsCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, padding: 20, marginBottom: 24, ...theme.shadows.card, borderWidth: 1, borderColor: theme.colors.border },
  subjectRow: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.borderLight, paddingBottom: 16 },
  rowLast: { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
  subjectTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  subjectName: { fontSize: 16, fontWeight: '700', color: theme.colors.textPrimary },
  subjectScore: { fontSize: 15, color: theme.colors.textMuted, fontWeight: '600' },
  scoreHighlight: { color: theme.colors.textPrimary, fontWeight: '800' },
  progressBarBg: { height: 8, backgroundColor: theme.colors.borderLight, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  remarksCard: { backgroundColor: theme.colors.warningBg, padding: 20, borderRadius: theme.radius.card, marginBottom: 32, borderWidth: 1, borderColor: theme.colors.border },
  remarksText: { fontSize: 16, lineHeight: 24, color: theme.colors.warning, fontStyle: 'italic' },
  reportBtn: { backgroundColor: theme.colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: theme.radius.card, gap: 10 },
  reportBtnText: { color: theme.colors.surface, fontSize: 17, fontWeight: 'bold' },
});
