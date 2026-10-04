import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CreditCard, CheckCircle, FileText, ChevronRight } from 'lucide-react-native';
import { feeSummary, feeHistory } from '@/data/fees';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableBounce } from '../../components/TouchableBounce';

export default function FeesScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: Math.max(insets.bottom, 24) }]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient 
        colors={[theme.colors.primary, theme.colors.teal]} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.heroCard}
      >
        <Text style={styles.heroSub}>TOTAL PENDING</Text>
        <Text style={styles.heroAmount}>₹{feeSummary.pending.toLocaleString()}</Text>
        <Text style={styles.heroDate}>Due on {feeSummary.dueDate}</Text>

        <TouchableBounce 
          style={styles.payNowBtn}
          bounceScale={0.96}
          onPress={() => alert('Mock Payment Flow triggered.')}
        >
          <Text style={styles.payNowText}>Pay Now</Text>
          <ChevronRight color={theme.colors.primary} size={18} />
        </TouchableBounce>
      </LinearGradient>

      <Text style={styles.sectionTitle}>FEE SUMMARY</Text>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Fee</Text>
          <Text style={styles.summaryValue}>₹{feeSummary.totalFee.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Paid</Text>
          <Text style={[styles.summaryValue, { color: theme.colors.success }]}>₹{feeSummary.paid.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryRowLast}>
          <Text style={styles.summaryLabel}>Pending</Text>
          <Text style={[styles.summaryValue, { color: theme.colors.error }]}>₹{feeSummary.pending.toLocaleString()}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(feeSummary.paid / feeSummary.totalFee) * 100}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabelLeft}>{Math.round((feeSummary.paid / feeSummary.totalFee) * 100)}% Paid</Text>
            <Text style={styles.progressLabelRight}>₹{feeSummary.pending.toLocaleString()} left</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>PAYMENT HISTORY</Text>
      <View style={styles.historyCard}>
        {feeHistory.map((receipt, idx) => (
          <TouchableBounce 
            key={receipt.id} 
            style={[styles.receiptRow, idx === feeHistory.length - 1 && styles.rowLast]}
            bounceScale={0.98}
          >
            <View style={styles.receiptIcon}>
              <CheckCircle color={theme.colors.success} size={24} />
            </View>
            <View style={styles.receiptContent}>
              <Text style={styles.receiptId}>Receipt #{receipt.id}</Text>
              <Text style={styles.receiptDate}>{receipt.date}</Text>
            </View>
            <View style={styles.receiptRight}>
              <Text style={styles.receiptAmount}>₹{receipt.amount.toLocaleString()}</Text>
              <View style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>View</Text>
              </View>
            </View>
          </TouchableBounce>
        ))}
      </View>
    </ScrollView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20 },
  heroCard: { borderRadius: theme.radius.card, padding: 32, marginBottom: 24, alignItems: 'center', shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 6 },
  heroSub: { color: theme.colors.tealBg, fontSize: 13, fontWeight: '800', letterSpacing: 1, marginBottom: 12 },
  heroAmount: { color: '#FFFFFF', fontSize: 48, fontWeight: '900', marginBottom: 6 },
  heroDate: { color: '#E0F2FE', fontSize: 16, fontWeight: '600', marginBottom: 28 },
  payNowBtn: { backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 100, gap: 10 },
  payNowText: { color: theme.colors.primary, fontWeight: '800', fontSize: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: theme.colors.textMuted, letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  summaryCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, padding: 20, marginBottom: 24, ...theme.shadows.card, borderWidth: 1, borderColor: theme.colors.border },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.borderLight },
  summaryRowLast: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginBottom: 6 },
  summaryLabel: { fontSize: 16, color: theme.colors.textSecondary, fontWeight: '600' },
  summaryValue: { fontSize: 18, fontWeight: '800', color: theme.colors.textPrimary },
  progressContainer: { marginTop: 10, backgroundColor: theme.colors.background, padding: 16, borderRadius: theme.radius.card },
  progressBar: { height: 8, backgroundColor: theme.colors.border, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  progressFill: { height: '100%', backgroundColor: theme.colors.success, borderRadius: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabelLeft: { color: theme.colors.success, fontSize: 13, fontWeight: '800' },
  progressLabelRight: { color: theme.colors.textSecondary, fontSize: 13, fontWeight: '700' },
  historyCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, ...theme.shadows.card, borderWidth: 1, borderColor: theme.colors.border },
  receiptRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.borderLight },
  rowLast: { borderBottomWidth: 0 },
  receiptIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: theme.colors.successBg, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  receiptContent: { flex: 1 },
  receiptId: { fontSize: 16, fontWeight: '800', color: theme.colors.textPrimary, marginBottom: 4 },
  receiptDate: { fontSize: 14, color: theme.colors.textSecondary },
  receiptRight: { alignItems: 'flex-end' },
  receiptAmount: { fontSize: 16, fontWeight: '800', color: theme.colors.textPrimary, marginBottom: 6 },
  viewBtn: { backgroundColor: theme.colors.borderLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  viewBtnText: { fontSize: 12, fontWeight: '800', color: theme.colors.textSecondary },
});
