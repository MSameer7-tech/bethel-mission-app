import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AttendanceScreen() {
  const insets = useSafeAreaInsets();
  const attendanceData = { percentage: 92, present: 21, absent: 2, leave: 1, late: 1 };

  const radius = 56;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attendanceData.percentage / 100) * circumference;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: Math.max(insets.bottom, 16) + 20 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>OVERALL ATTENDANCE</Text>
        <View style={styles.ringWrapper}>
          <Svg width={140} height={140} viewBox="0 0 140 140">
            <Circle cx="70" cy="70" r={radius} stroke="#F1F5F9" strokeWidth={strokeWidth} fill="none" />
            <Circle 
              cx="70" cy="70" r={radius} 
              stroke="#0D9488" strokeWidth={strokeWidth} 
              fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              strokeLinecap="round" rotation="-90" origin="70, 70"
            />
          </Svg>
          <View style={styles.ringTextContainer}>
            <Text style={styles.ringText}>{attendanceData.percentage}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatTile label="Present" value={attendanceData.present} color="#10B981" />
        <StatTile label="Absent" value={attendanceData.absent} color="#F43F5E" />
        <StatTile label="Leave" value={attendanceData.leave} color="#0EA5E9" />
        <StatTile label="Late" value={attendanceData.late} color="#F59E0B" />
      </View>

      <Text style={styles.sectionTitle}>MONTHLY ATTENDANCE</Text>
      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <CalendarIcon color="#64748B" size={20} />
          <Text style={styles.monthText}>October 2026</Text>
        </View>
        <View style={styles.weekDays}>
          {['M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <Text key={i} style={styles.weekDayText}>{d}</Text>
          ))}
        </View>
        <View style={styles.daysGrid}>
          {Array.from({length: 15}).map((_, i) => (
            <View key={i} style={[styles.dayCell, i === 1 ? styles.dayAbsent : (i === 10 ? styles.dayLeave : styles.dayPresent)]}>
              <Text style={[styles.dayText, (i === 1 || i === 10) && styles.dayTextWhite]}>{i + 1}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const StatTile = ({ label, value, color }: any) => (
  <View style={styles.statTile}>
    <View style={styles.statTopRow}>
      <View style={[styles.statDot, { backgroundColor: color }]} />
      <Text style={styles.statLabel}>{label}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  content: { padding: 20 },
  heroCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 32, alignItems: 'center', marginBottom: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  heroTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 20 },
  ringWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  ringTextContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  ringText: { fontSize: 32, fontWeight: '900', color: '#0D9488' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 28 },
  statTile: { width: '47%', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  statTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  statDot: { width: 10, height: 10, borderRadius: 5 },
  statLabel: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  statValue: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  calendarHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
  monthText: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  weekDays: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 4 },
  weekDayText: { width: 36, textAlign: 'center', fontSize: 13, fontWeight: '700', color: '#94A3B8' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'flex-start' },
  dayCell: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  dayPresent: { backgroundColor: '#D1FAE5' },
  dayAbsent: { backgroundColor: '#F43F5E' },
  dayLeave: { backgroundColor: '#0EA5E9' },
  dayText: { fontSize: 16, fontWeight: '600', color: '#065F46' },
  dayTextWhite: { color: '#FFFFFF' },
});
