import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, FileText, CheckCircle, CreditCard, BookOpen, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { TouchableBounce } from '../../components/TouchableBounce';
import Svg, { Circle } from 'react-native-svg';
import { useStudentProfile } from '../../hooks/useStudentProfile';
import { useAttendance } from '../../hooks/useAttendance';
import { ActivityIndicator } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const QA_CARD_WIDTH = (SCREEN_WIDTH - 40 - 14) / 2; // 40 = 20px padding each side, 14 = gap

export default function DashboardScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const { data: student, loading, error } = useStudentProfile();
  const { summary: attendanceSummary, loading: attendanceLoading } = useAttendance();

  const radius = 28;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const attendancePct = attendanceSummary?.percentage ?? 0;
  const strokeDashoffset = circumference - ((attendancePct / 100) * circumference);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { 
        paddingTop: Math.max(insets.top, 24),
        paddingBottom: Math.max(insets.bottom, 24) + 60 
      }]}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. STUDENT HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.schoolLogoText}>BETHEL MISSION</Text>
          
          {loading ? (
            <View style={{ gap: 4, marginTop: 4 }}>
               <View style={{ height: 24, width: 150, backgroundColor: theme.colors.surfaceSecondary, borderRadius: 4 }} />
               <View style={{ height: 28, width: 200, backgroundColor: theme.colors.surfaceSecondary, borderRadius: 4 }} />
               <View style={{ height: 16, width: 120, backgroundColor: theme.colors.surfaceSecondary, borderRadius: 4 }} />
            </View>
          ) : error ? (
            <Text style={[styles.greetingText, { color: theme.colors.error, marginTop: 8 }]}>{error}</Text>
          ) : (
            <>
              <Text style={styles.greetingText}>
                Good morning, {student?.firstName ?? 'Student'} 👋
              </Text>
              <Text style={styles.studentName}>
                {student?.firstName} {student?.lastName}
              </Text>
              <Text style={styles.studentClass}>
                {student?.className} {student?.sectionName !== 'Unassigned' ? `- ${student?.sectionName}` : ''} · {student?.academicYear}
              </Text>
            </>
          )}
        </View>
        
        <View style={styles.avatar}>
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <Text style={styles.avatarInitials}>
              {student?.firstName?.[0] ?? 'S'}
              {student?.lastName?.[0] ?? ''}
            </Text>
          )}
        </View>
      </View>

      {/* 2. SUMMARY CARDS (Strict Fixed Height & Layout) */}
      <View style={styles.summaryRow}>
        
        {/* ATTENDANCE CARD */}
        <TouchableBounce bounceScale={0.96} style={[styles.summaryCard, { flex: 1.25 }]} onPress={() => router.push('/(student)/attendance')}>
          <Text style={styles.sectionHeading}>ATTENDANCE</Text>
          <View style={styles.attendanceInner}>
            <View style={styles.progressRingContainer}>
              <Svg width={64} height={64} viewBox="0 0 64 64">
                <Circle cx="32" cy="32" r={radius} stroke={theme.colors.borderLight} strokeWidth={strokeWidth} fill="none" />
                <Circle 
                  cx="32" cy="32" r={radius} 
                  stroke={theme.colors.success} strokeWidth={strokeWidth} 
                  fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round" rotation="-90" origin="32, 32"
                />
              </Svg>
              <View style={styles.progressRingTextContainer}>
                {attendanceLoading ? (
                  <ActivityIndicator color={theme.colors.success} size="small" />
                ) : (
                  <Text style={styles.progressRingText}>{attendancePct}%</Text>
                )}
              </View>
            </View>
            <View style={styles.attendanceStats}>
              <View style={styles.statLineWrapper}>
                <View style={[styles.statDot, { backgroundColor: theme.colors.success }]} />
                <Text style={styles.statLine} numberOfLines={1}>{attendanceSummary?.present ?? 0} Present</Text>
              </View>
              <View style={styles.statLineWrapper}>
                <View style={[styles.statDot, { backgroundColor: theme.colors.error }]} />
                <Text style={styles.statLine} numberOfLines={1}>{attendanceSummary?.absent ?? 0} Absent</Text>
              </View>
            </View>
          </View>
        </TouchableBounce>

        {/* UP NEXT CARD */}
        <TouchableBounce bounceScale={0.96} style={[styles.summaryCard, { flex: 1 }]} onPress={() => router.push('/(student)/homework')}>
          <Text style={styles.sectionHeading}>UP NEXT</Text>
          <View style={styles.upNextInner}>
            <View>
              <View style={styles.upNextIconRow}>
                <View style={[styles.statDot, { backgroundColor: theme.colors.info }]} />
                <Text style={styles.upNextTitle} numberOfLines={1}>Math Unit Test</Text>
              </View>
              <Text style={styles.upNextTime} numberOfLines={1}>Tomorrow · 10:00 AM</Text>
            </View>
            <View style={styles.upNextAction}>
              <Text style={styles.upNextActionText}>View Exam</Text>
              <ChevronRight color={theme.colors.info} size={14} />
            </View>
          </View>
        </TouchableBounce>

      </View>

      {/* 3. FEE CARD */}
      <TouchableBounce bounceScale={0.98} style={styles.feeCard} onPress={() => router.push('/(student)/fees')}>
        <View style={styles.feeLeft}>
          <Text style={styles.feeHeading}>FEE DUE</Text>
          <Text style={styles.feeAmount}>₹2,500</Text>
          <Text style={styles.feeDate}>Due 10 October</Text>
        </View>
        <View style={styles.feePayBtn}>
          <Text style={styles.feePayBtnText}>Pay Fee</Text>
          <ChevronRight color={theme.colors.surface} size={16} />
        </View>
      </TouchableBounce>

      {/* 4. QUICK ACCESS */}
      <View style={styles.sectionHeaderSpacing}>
        <Text style={styles.sectionTitle}>QUICK ACCESS</Text>
      </View>
      <View style={styles.quickAccessGrid}>
        <View style={styles.qaRow}>
          <QuickAccessTile icon={CheckCircle} color={theme.colors.success} bg={theme.colors.successBg} label="Attendance" route="/(student)/attendance" router={router} styles={styles} />
          <QuickAccessTile icon={BookOpen} color={theme.colors.academic} bg={theme.colors.academicBg} label="Homework" route="/(student)/homework" router={router} styles={styles} />
        </View>
        <View style={styles.qaRow}>
          <QuickAccessTile icon={FileText} color={theme.colors.info} bg={theme.colors.infoBg} label="Results" route="/(student)/results" router={router} styles={styles} />
          <QuickAccessTile icon={CreditCard} color={theme.colors.error} bg={theme.colors.errorBg} label="Fees" route="/(student)/fees" router={router} styles={styles} />
        </View>
        <View style={styles.qaRow}>
          <QuickAccessTile icon={Calendar} color={theme.colors.warning} bg={theme.colors.warningBg} label="Calendar" route="/(student)/calendar" router={router} styles={styles} />
          <QuickAccessTile icon={BookOpen} color={theme.colors.primary} bg={theme.colors.infoBg} label="Study Material" route="/(student)/study-material" router={router} styles={styles} />
        </View>
      </View>

      {/* 5. RECENT ACTIVITY */}
      <View style={styles.sectionHeaderSpacing}>
        <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
      </View>
      <View style={styles.activityContainer}>
        <ActivityItem title="Science homework uploaded" time="2 hours ago" color={theme.colors.academic} styles={styles} />
        <ActivityItem title="Parent Teacher Meeting scheduled" time="5 hours ago" color={theme.colors.info} styles={styles} />
        <ActivityItem title="Mathematics study material added" time="Yesterday" color={theme.colors.success} isLast styles={styles} />
      </View>
      
    </ScrollView>
  );
}

const QuickAccessTile = React.memo(({ icon: Icon, color, bg, label, route, router, styles }: any) => (
  <TouchableBounce bounceScale={0.96} style={styles.qaTile} onPress={() => router.push(route)}>
    <View style={[styles.qaIconWrapper, { backgroundColor: bg }]}>
      <Icon color={color} size={20} strokeWidth={2.5} />
    </View>
    <Text style={styles.qaLabel} numberOfLines={1}>{label}</Text>
  </TouchableBounce>
));

const ActivityItem = React.memo(({ title, time, color, isLast = false, styles }: any) => (
  <View style={styles.activityItem}>
    <View style={styles.activityTimeline}>
      <View style={[styles.activityDot, { backgroundColor: color }]} />
      {!isLast && <View style={styles.activityLine} />}
    </View>
    <TouchableBounce bounceScale={0.98} style={styles.activityContent}>
      <Text style={styles.activityTitle} numberOfLines={1}>{title}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </TouchableBounce>
  </View>
));

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingHorizontal: 20 },
  
  // Section Spacing Rhythm (Strict mappings)
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 },
  summaryRow: { flexDirection: 'row', gap: 14, marginBottom: 16 },
  feeCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.feeCardBg, padding: 16, borderRadius: 18, marginBottom: 26, borderWidth: 1, borderColor: theme.colors.feeCardBorder, height: 110 },
  sectionHeaderSpacing: { marginBottom: 12 },
  quickAccessGrid: { gap: 14, marginBottom: 26 },
  
  // Header Content
  headerTextContainer: { flex: 1, paddingRight: 16 },
  schoolLogoText: { color: theme.colors.textMuted, fontWeight: '700', fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 },
  greetingText: { fontSize: 15, fontWeight: '500', color: theme.colors.textSecondary, marginBottom: 2 },
  studentName: { fontSize: 22, fontWeight: '800', color: theme.colors.textPrimary, marginBottom: 2 },
  studentClass: { fontSize: 14, fontWeight: '500', color: theme.colors.textSecondary },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: theme.colors.infoBg, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { color: theme.colors.info, fontWeight: '700', fontSize: 18 },
  
  // Base Card Styles
  summaryCard: { flex: 1, backgroundColor: theme.colors.surface, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: theme.colors.border, ...theme.shadows.card, height: 150 },
  sectionHeading: { fontSize: 12, fontWeight: '800', color: theme.colors.textMuted, letterSpacing: 1 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: theme.colors.textMuted, letterSpacing: 1, marginLeft: 4 },
  
  // Attendance Sub-layout
  attendanceInner: { flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 12 },
  progressRingContainer: { position: 'relative', width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  progressRingTextContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  progressRingText: { fontSize: 15, fontWeight: '800', color: theme.colors.textPrimary },
  attendanceStats: { gap: 8, flex: 1, justifyContent: 'center' },
  statLineWrapper: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statDot: { width: 6, height: 6, borderRadius: 3 },
  statLine: { fontSize: 13, fontWeight: '600', color: theme.colors.textPrimary, flexShrink: 1 },
  
  // Up Next Sub-layout
  upNextInner: { flex: 1, justifyContent: 'space-between', marginTop: 14 },
  upNextIconRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  upNextTitle: { fontSize: 14, fontWeight: '700', color: theme.colors.textPrimary, flexShrink: 1 },
  upNextTime: { fontSize: 13, color: theme.colors.textSecondary, marginLeft: 12, fontWeight: '500' },
  upNextAction: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  upNextActionText: { fontSize: 13, fontWeight: '700', color: theme.colors.info },
  
  // Fee Card Content
  feeLeft: { flexDirection: 'column', justifyContent: 'center' },
  feeHeading: { fontSize: 12, fontWeight: '800', color: theme.colors.error, letterSpacing: 1, marginBottom: 4 },
  feeAmount: { fontSize: 28, fontWeight: '800', color: theme.colors.error, marginBottom: 2 },
  feeDate: { fontSize: 13, fontWeight: '500', color: theme.colors.error, opacity: 0.8 },
  feePayBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.colors.error, paddingHorizontal: 20, height: 44, borderRadius: 12, justifyContent: 'center' },
  feePayBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  
  // Quick Access
  qaRow: { flexDirection: 'row', gap: 14 },
  qaTile: { width: QA_CARD_WIDTH, backgroundColor: theme.colors.surface, paddingHorizontal: 14, height: 76, borderRadius: 18, borderWidth: 1, borderColor: theme.colors.border, flexDirection: 'row', alignItems: 'center', gap: 12, ...theme.shadows.card },
  qaIconWrapper: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  qaLabel: { fontSize: 15, fontWeight: '600', color: theme.colors.textPrimary, flexShrink: 1 },
  
  // Recent Activity
  activityContainer: { backgroundColor: theme.colors.surface, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: theme.colors.border, ...theme.shadows.card },
  activityItem: { flexDirection: 'row', minHeight: 44 },
  activityTimeline: { alignItems: 'center', marginRight: 14, width: 12 },
  activityDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6, zIndex: 1 },
  activityLine: { width: 2, flex: 1, backgroundColor: theme.colors.borderLight, marginTop: -6, marginBottom: -14 },
  activityContent: { flex: 1, paddingBottom: 14 },
  activityTitle: { fontSize: 14, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 4 },
  activityTime: { fontSize: 13, fontWeight: '500', color: theme.colors.textSecondary },
});
