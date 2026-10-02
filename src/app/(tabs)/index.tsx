import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, CheckCircle, BookOpen, CreditCard, ChevronRight, Bell, FileText } from 'lucide-react-native';
import { studentProfile, attendanceSummary } from '@/data/students';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StudentDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const radius = 32;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attendanceSummary.percentage / 100) * circumference;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: Math.max(insets.bottom, 16) + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER HERO */}
      <LinearGradient 
        colors={['#0B3B60', '#0D9488']} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.heroCard}
      >
        <View style={styles.heroTop}>
          <View style={styles.schoolLogo}>
            <Text style={styles.schoolLogoText}>BMS</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn} onPress={() => router.push('/(tabs)/notifications')}>
            <Bell color="#FFFFFF" size={20} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroContent}>
          <View style={styles.heroText}>
            <Text style={styles.greetingText}>Good Morning 👋</Text>
            <Text style={styles.studentName} numberOfLines={1}>{studentProfile.name}</Text>
            <Text style={styles.studentClass}>{studentProfile.class}-{studentProfile.section} • {studentProfile.academicYear}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>JS</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* COMPACT INFO ROW: ATTENDANCE + UP NEXT */}
      <View style={styles.infoRow}>
        <TouchableOpacity 
          style={styles.attendanceHalf} 
          activeOpacity={0.8}
          onPress={() => router.push('/(student)/attendance')}
        >
          <Text style={styles.sectionHeading}>ATTENDANCE</Text>
          <View style={styles.attendanceContent}>
            <View style={styles.progressRingContainer}>
              <Svg width={72} height={72} viewBox="0 0 72 72">
                <Circle cx="36" cy="36" r={radius} stroke="#F1F5F9" strokeWidth={strokeWidth} fill="none" />
                <Circle 
                  cx="36" cy="36" r={radius} 
                  stroke="#0D9488" strokeWidth={strokeWidth} 
                  fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round" rotation="-90" origin="36, 36"
                />
              </Svg>
              <View style={styles.progressRingTextContainer}>
                <Text style={styles.progressRingText}>{attendanceSummary.percentage}%</Text>
              </View>
            </View>
            <View style={styles.attendanceStats}>
              <Text style={styles.statLine}><Text style={{color:'#10B981'}}>●</Text> {attendanceSummary.present} P</Text>
              <Text style={styles.statLine}><Text style={{color:'#F43F5E'}}>●</Text> {attendanceSummary.absent} A</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.upNextHalf} 
          activeOpacity={0.8}
          onPress={() => router.push('/(student)/results')}
        >
          <Text style={styles.sectionHeading}>UP NEXT</Text>
          <View style={styles.upNextIconRow}>
            <View style={styles.timelineDot} />
            <Text style={styles.upNextTitle} numberOfLines={1}>Math Unit Test</Text>
          </View>
          <Text style={styles.upNextTime}>Tomorrow, 10:00 AM</Text>
        </TouchableOpacity>
      </View>

      {/* FEE REMINDER */}
      <TouchableOpacity 
        style={styles.feeCard}
        activeOpacity={0.8}
        onPress={() => router.push('/(student)/fees')}
      >
        <View style={styles.feeLeft}>
          <Text style={styles.feeHeading}>FEE DUE</Text>
          <Text style={styles.feeAmount}>₹2,500</Text>
          <Text style={styles.feeDate}>Due 10 Oct</Text>
        </View>
        <View style={styles.feePayBtn}>
          <Text style={styles.feePayBtnText}>Pay →</Text>
        </View>
      </TouchableOpacity>

      {/* QUICK ACCESS */}
      <Text style={styles.sectionTitle}>QUICK ACCESS</Text>
      <View style={styles.quickAccessGrid}>
        <QuickAccessTile icon={CheckCircle} color="#0EA5E9" bg="#E0F2FE" label="Attendance" route="/(student)/attendance" router={router} />
        <QuickAccessTile icon={BookOpen} color="#8B5CF6" bg="#EDE9FE" label="Homework" route="/(student)/homework" router={router} />
        <QuickAccessTile icon={FileText} color="#10B981" bg="#D1FAE5" label="Results" route="/(student)/results" router={router} />
        <QuickAccessTile icon={CreditCard} color="#F43F5E" bg="#FFE4E6" label="Fees" route="/(student)/fees" router={router} />
        <QuickAccessTile icon={Calendar} color="#F59E0B" bg="#FEF3C7" label="Calendar" route="/(student)/calendar" router={router} />
        <QuickAccessTile icon={BookOpen} color="#0D9488" bg="#CCFBF1" label="Materials" route="/(student)/study-material" router={router} />
      </View>

      {/* RECENT ACTIVITY */}
      <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
      <View style={styles.activityContainer}>
        <ActivityItem title="Science homework uploaded" time="2 hours ago" color="#8B5CF6" />
        <ActivityItem title="PTM scheduled" time="5 hours ago" color="#0EA5E9" />
        <ActivityItem title="Maths material added" time="Yesterday" color="#10B981" isLast />
      </View>
    </ScrollView>
  );
}

const QuickAccessTile = ({ icon: Icon, color, bg, label, route, router }: any) => (
  <TouchableOpacity 
    style={styles.qaTile} 
    activeOpacity={0.7}
    onPress={() => router.push(route)}
  >
    <View style={[styles.qaIconWrapper, { backgroundColor: bg }]}>
      <Icon color={color} size={24} />
    </View>
    <Text style={styles.qaLabel} numberOfLines={1}>{label}</Text>
  </TouchableOpacity>
);

const ActivityItem = ({ title, time, color, isLast = false }: any) => (
  <View style={styles.activityItem}>
    <View style={styles.activityTimeline}>
      <View style={[styles.activityDot, { backgroundColor: color }]} />
      {!isLast && <View style={styles.activityLine} />}
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle} numberOfLines={1}>{title}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  content: { paddingHorizontal: 20 },
  heroCard: { borderRadius: 24, padding: 24, marginBottom: 20, shadowColor: '#0B3B60', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 6 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  schoolLogo: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  schoolLogoText: { color: '#FFFFFF', fontWeight: '900', fontSize: 13, letterSpacing: 1 },
  notificationBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, position: 'relative' },
  notificationDot: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: '#F43F5E', borderWidth: 1.5, borderColor: '#0D9488' },
  heroContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  heroText: { flex: 1, paddingRight: 16 },
  greetingText: { color: '#E0F2FE', fontSize: 15, fontWeight: '600', marginBottom: 6 },
  studentName: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold', marginBottom: 4 },
  studentClass: { color: '#CCFBF1', fontSize: 14, fontWeight: '500' },
  profileAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
  profileInitials: { color: '#0B3B60', fontWeight: '800', fontSize: 20 },
  
  infoRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  attendanceHalf: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  upNextHalf: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  sectionHeading: { fontSize: 12, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 12 },
  attendanceContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progressRingContainer: { position: 'relative', width: 72, height: 72, alignItems: 'center', justifyContent: 'center' },
  progressRingTextContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  progressRingText: { fontSize: 16, fontWeight: '800', color: '#0D9488' },
  attendanceStats: { flex: 1 },
  statLine: { fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 4 },
  
  upNextIconRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0EA5E9' },
  upNextTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', flex: 1 },
  upNextTime: { fontSize: 14, color: '#0EA5E9', fontWeight: '600', paddingLeft: 18 },
  
  feeCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF1F2', padding: 20, borderRadius: 20, marginBottom: 24, borderWidth: 1, borderColor: '#FFE4E6' },
  feeLeft: { flexDirection: 'column' },
  feeHeading: { fontSize: 12, fontWeight: '800', color: '#E11D48', letterSpacing: 1, marginBottom: 4 },
  feeAmount: { fontSize: 28, fontWeight: '900', color: '#9F1239', marginBottom: 4 },
  feeDate: { fontSize: 14, color: '#BE123C', fontWeight: '600' },
  feePayBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, shadowColor: '#E11D48', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
  feePayBtnText: { color: '#E11D48', fontWeight: '800', fontSize: 15 },
  
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#64748B', letterSpacing: 1, marginBottom: 16, marginLeft: 4 },
  quickAccessGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 28 },
  qaTile: { width: '47%', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  qaIconWrapper: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  qaLabel: { fontSize: 15, fontWeight: '700', color: '#1E293B', flex: 1 },
  
  activityContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12 },
  activityItem: { flexDirection: 'row', marginBottom: 16 },
  activityTimeline: { alignItems: 'center', marginRight: 16, width: 12 },
  activityDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4, zIndex: 1 },
  activityLine: { width: 2, flex: 1, backgroundColor: '#F1F5F9', marginTop: -4, marginBottom: -16 },
  activityContent: { flex: 1, paddingBottom: 6 },
  activityTitle: { fontSize: 15, fontWeight: '600', color: '#0F172A', marginBottom: 4 },
  activityTime: { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
});
