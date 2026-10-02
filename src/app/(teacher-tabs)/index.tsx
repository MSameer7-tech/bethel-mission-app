import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, CheckSquare, BookOpen, Users, FileText, Award, Bell } from 'lucide-react-native';
import { teacherProfile, teacherClasses } from '@/data/teachers';

export default function TeacherDashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {teacherProfile.name.split(' ')[0]}</Text>
          <Text style={styles.subGreeting}>{teacherProfile.department} • Class Teacher: {teacherProfile.classTeacherOf}</Text>
        </View>
        <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/(teacher-tabs)/profile' as any)}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>PS</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Today's Classes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classesScroll}>
        {teacherClasses.map((cls, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={[styles.classCard, idx === 0 && styles.classCardActive]}
            onPress={() => router.push(`/(teacher)/class-details?id=${cls.id}` as any)}
          >
            <Text style={[styles.className, idx === 0 && styles.textWhite]}>{cls.name}</Text>
            <Text style={[styles.classSubject, idx === 0 && styles.textWhiteSub]}>{cls.subject}</Text>
            <View style={styles.classFooter}>
              <View style={styles.classFooterItem}>
                <Calendar color={idx === 0 ? "#E0F2FE" : "#64748B"} size={14} />
                <Text style={[styles.classTime, idx === 0 && styles.textWhiteSub]}>{cls.nextClass}</Text>
              </View>
              <View style={styles.classFooterItem}>
                <Users color={idx === 0 ? "#E0F2FE" : "#64748B"} size={14} />
                <Text style={[styles.classTime, idx === 0 && styles.textWhiteSub]}>{cls.studentCount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickAccessGrid}>
        <QuickAccessItem icon={<CheckSquare color="#0284C7" size={28} />} label="Attendance" onPress={() => router.push('/(teacher)/mark-attendance' as any)} />
        <QuickAccessItem icon={<BookOpen color="#0284C7" size={28} />} label="Homework" onPress={() => router.push('/(teacher)/homework' as any)} />
        <QuickAccessItem icon={<Award color="#0284C7" size={28} />} label="Examinations" onPress={() => router.push('/(teacher)/examinations' as any)} />
        <QuickAccessItem icon={<FileText color="#0284C7" size={28} />} label="Leave Reqs" onPress={() => router.push('/(teacher)/leave-requests' as any)} />
      </View>

      <View style={styles.recentUpdatesHeader}>
        <Text style={styles.sectionTitle}>Pending Tasks</Text>
      </View>
      
      <View style={styles.updatesContainer}>
        <TaskItem icon={<BookOpen color="#D97706" size={20} />} title="Grade Science Homework" desc="Class VII-C (32 submissions)" color="#FEF3C7" />
        <TaskItem icon={<FileText color="#0284C7" size={20} />} title="Review Leave Applications" desc="2 pending requests" color="#F0F9FF" />
      </View>
    </ScrollView>
  );
}

const QuickAccessItem = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.qaItem} onPress={onPress}>
    <View style={styles.qaIconContainer}>{icon}</View>
    <Text style={styles.qaLabel}>{label}</Text>
  </TouchableOpacity>
);

const TaskItem = ({ icon, title, desc, color }: any) => (
  <View style={styles.updateItem}>
    <View style={[styles.updateIcon, { backgroundColor: color }]}>{icon}</View>
    <View style={styles.updateContent}>
      <Text style={styles.updateText}>{title}</Text>
      <Text style={styles.updateTime}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#0F172A' },
  subGreeting: { fontSize: 14, color: '#64748B', marginTop: 4 },
  profileIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  profileImagePlaceholder: { flex: 1, backgroundColor: '#0B3B60', alignItems: 'center', justifyContent: 'center' },
  profileInitials: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 16 },
  classesScroll: { marginHorizontal: -20, paddingHorizontal: 20, marginBottom: 24 },
  classCard: { width: 240, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginRight: 16 },
  classCardActive: { backgroundColor: '#0B3B60', borderColor: '#0B3B60' },
  className: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  classSubject: { fontSize: 14, color: '#64748B', marginBottom: 16 },
  textWhite: { color: '#FFFFFF' },
  textWhiteSub: { color: '#E0F2FE' },
  classFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 12 },
  classFooterItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  classTime: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  quickAccessGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 24 },
  qaItem: { width: '47%', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  qaIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0F9FF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  qaLabel: { fontSize: 14, fontWeight: '600', color: '#334155' },
  recentUpdatesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  updatesContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  updateItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  updateIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  updateContent: { flex: 1 },
  updateText: { fontSize: 15, color: '#0F172A', fontWeight: '600', marginBottom: 2 },
  updateTime: { fontSize: 13, color: '#64748B' },
});
