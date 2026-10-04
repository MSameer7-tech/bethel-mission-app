import React, { useMemo } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAttendance } from '../../hooks/useAttendance';
import { TouchableBounce } from '../../components/TouchableBounce';

export default function AttendanceScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  
  const { records, summary, loading, error, refetch } = useAttendance();

  // If loading or no summary yet, we can show a placeholder or loader
  const percentage = summary?.percentage ?? 0;

  const radius = 56;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const renderContent = () => {
    if (loading && !summary) {
      return (
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 12, color: theme.colors.textSecondary }}>Loading attendance...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ padding: 40, alignItems: 'center' }}>
          <AlertCircle color={theme.colors.error} size={48} />
          <Text style={{ marginTop: 12, color: theme.colors.textPrimary, textAlign: 'center' }}>{error}</Text>
          <TouchableBounce onPress={refetch} style={{ marginTop: 16, backgroundColor: theme.colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}>
            <Text style={{ color: '#FFF', fontWeight: '600' }}>Retry</Text>
          </TouchableBounce>
        </View>
      );
    }

    if (records.length === 0) {
      return (
        <View style={{ padding: 40, alignItems: 'center' }}>
          <CalendarIcon color={theme.colors.textMuted} size={48} />
          <Text style={{ marginTop: 12, color: theme.colors.textSecondary }}>No attendance records yet.</Text>
        </View>
      );
    }

    return (
      <>
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
              <Text style={styles.ringText}>{summary?.percentage ?? 0}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatTile label="Present" value={summary?.present ?? 0} color={theme.colors.success} styles={styles} />
          <StatTile label="Absent" value={summary?.absent ?? 0} color={theme.colors.error} styles={styles} />
          <StatTile label="Leave" value={summary?.excused ?? 0} color={theme.colors.info} styles={styles} />
          <StatTile label="Late" value={summary?.late ?? 0} color={theme.colors.warning} styles={styles} />
        </View>

        <Text style={styles.sectionTitle}>RECENT ATTENDANCE</Text>
        <View style={styles.calendarCard}>
          {records.slice(0, 10).map((record) => {
            let dotColor = theme.colors.success;
            let label = 'Present';
            if (record.status === 'absent') { dotColor = theme.colors.error; label = 'Absent'; }
            else if (record.status === 'excused') { dotColor = theme.colors.info; label = 'Leave'; }
            else if (record.status === 'late') { dotColor = theme.colors.warning; label = 'Late'; }

            // Safe date formatting avoiding timezone shifts
            const [year, month, day] = record.date.split('-');
            const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
            const formattedDate = dateObj.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });

            return (
              <View key={record.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.borderLight }}>
                <Text style={{ fontSize: 16, color: theme.colors.textPrimary, fontWeight: '500' }}>{formattedDate}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dotColor }} />
                  <Text style={{ fontSize: 14, color: theme.colors.textSecondary, fontWeight: '600' }}>{label}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: Math.max(insets.bottom, 16) + 20 }]}
      showsVerticalScrollIndicator={false}
    >
      {renderContent()}
    </ScrollView>
  );
}

const StatTile = ({ label, value, color, styles }: any) => (
  <View style={styles.statTile}>
    <View style={styles.statTopRow}>
      <View style={[styles.statDot, { backgroundColor: color }]} />
      <Text style={styles.statLabel}>{label}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20 },
  heroCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, padding: 32, alignItems: 'center', marginBottom: 20, shadowColor: '#111827', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  heroTitle: { fontSize: 13, fontWeight: '800', color: theme.colors.textMuted, letterSpacing: 1, marginBottom: 20 },
  ringWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  ringTextContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  ringText: { fontSize: 32, fontWeight: '900', color: theme.colors.teal },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 28 },
  statTile: { width: '47%', backgroundColor: theme.colors.surface, padding: 20, borderRadius: 20, shadowColor: '#111827', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  statTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  statDot: { width: 10, height: 10, borderRadius: 5 },
  statLabel: { fontSize: 14, fontWeight: '700', color: theme.colors.textSecondary },
  statValue: { fontSize: 28, fontWeight: '800', color: theme.colors.textPrimary },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: theme.colors.textMuted, letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  calendarCard: { backgroundColor: theme.colors.surface, borderRadius: 20, padding: 20, shadowColor: '#111827', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  calendarHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
  monthText: { fontSize: 18, fontWeight: '700', color: theme.colors.textPrimary },
  weekDays: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 4 },
  weekDayText: { width: 36, textAlign: 'center', fontSize: 13, fontWeight: '700', color: theme.colors.textMuted },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'flex-start' },
  dayCell: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  dayPresent: { backgroundColor: theme.colors.successBg },
  dayAbsent: { backgroundColor: theme.colors.error },
  dayLeave: { backgroundColor: theme.colors.info },
  dayText: { fontSize: 16, fontWeight: '600', color: theme.colors.success },
  dayTextWhite: { color: theme.colors.surface },
});
