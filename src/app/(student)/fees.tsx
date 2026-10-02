import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CreditCard, CheckCircle, FileText, ChevronRight } from 'lucide-react-native';
import { feeSummary, feeHistory } from '@/data/fees';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FeesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: Math.max(insets.bottom, 16) + 20 }]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient 
        colors={['#0B3B60', '#0D9488']} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.heroCard}
      >
        <Text style={styles.heroSub}>TOTAL PENDING</Text>
        <Text style={styles.heroAmount}>₹{feeSummary.pending.toLocaleString()}</Text>
        <Text style={styles.heroDate}>Due on {feeSummary.dueDate}</Text>

        <TouchableOpacity 
          style={styles.payNowBtn}
          activeOpacity={0.8}
          onPress={() => alert('Mock Payment Flow triggered.')}
        >
          <Text style={styles.payNowText}>Pay Now</Text>
          <ChevronRight color="#0B3B60" size={18} />
        </TouchableOpacity>
      </LinearGradient>

      <Text style={styles.sectionTitle}>FEE SUMMARY</Text>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Fee</Text>
          <Text style={styles.summaryValue}>₹{feeSummary.totalFee.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Paid</Text>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>₹{feeSummary.paid.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryRowLast}>
          <Text style={styles.summaryLabel}>Pending</Text>
          <Text style={[styles.summaryValue, { color: '#F43F5E' }]}>₹{feeSummary.pending.toLocaleString()}</Text>
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
          <TouchableOpacity 
            key={receipt.id} 
            style={[styles.receiptRow, idx === feeHistory.length - 1 && styles.rowLast]}
            activeOpacity={0.7}
          >
            <View style={styles.receiptIcon}>
              <CheckCircle color="#10B981" size={24} />
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
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  content: { padding: 20 },
  heroCard: { borderRadius: 24, padding: 32, marginBottom: 24, alignItems: 'center', shadowColor: '#0B3B60', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 6 },
  heroSub: { color: '#CCFBF1', fontSize: 13, fontWeight: '800', letterSpacing: 1, marginBottom: 12 },
  heroAmount: { color: '#FFFFFF', fontSize: 48, fontWeight: '900', marginBottom: 6 },
  heroDate: { color: '#E0F2FE', fontSize: 16, fontWeight: '600', marginBottom: 28 },
  payNowBtn: { backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 100, gap: 10 },
  payNowText: { color: '#0B3B60', fontWeight: '800', fontSize: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  summaryCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 24, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  summaryRowLast: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, marginBottom: 6 },
  summaryLabel: { fontSize: 16, color: '#475569', fontWeight: '600' },
  summaryValue: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  progressContainer: { marginTop: 10, backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16 },
  progressBar: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  progressFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabelLeft: { color: '#10B981', fontSize: 13, fontWeight: '800' },
  progressLabelRight: { color: '#64748B', fontSize: 13, fontWeight: '700' },
  historyCard: { backgroundColor: '#FFFFFF', borderRadius: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  receiptRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  rowLast: { borderBottomWidth: 0 },
  receiptIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#D1FAE5', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  receiptContent: { flex: 1 },
  receiptId: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  receiptDate: { fontSize: 14, color: '#64748B' },
  receiptRight: { alignItems: 'flex-end' },
  receiptAmount: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  viewBtn: { backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  viewBtnText: { fontSize: 12, fontWeight: '800', color: '#475569' },
});
