import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Users, CheckSquare, BookOpen, Award, ChevronRight } from 'lucide-react-native';
import { classStudents, teacherClasses } from '@/data/teachers';

export default function ClassDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const classInfo = teacherClasses.find(c => c.id === id) || teacherClasses[0];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.className}>{classInfo.name}</Text>
        <Text style={styles.classSubject}>{classInfo.subject}</Text>
        
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => router.push(`/(teacher)/mark-attendance?classId=${classInfo.id}` as any)}
          >
            <CheckSquare color="#0284C7" size={20} />
            <Text style={styles.actionText}>Attendance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(teacher)/homework' as any)}>
            <BookOpen color="#0284C7" size={20} />
            <Text style={styles.actionText}>Homework</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Students ({classStudents.length})</Text>
      </View>

      <View style={styles.listContainer}>
        {classStudents.map((student, idx) => (
          <TouchableOpacity key={student.id} style={[styles.studentRow, idx === classStudents.length - 1 && styles.noBorder]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.rollNumber}>Roll No: {student.roll}</Text>
            </View>
            <ChevronRight color="#CBD5E1" size={20} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  headerCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 24 },
  className: { fontSize: 24, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  classSubject: { fontSize: 14, color: '#64748B', marginBottom: 20 },
  actionGrid: { flexDirection: 'row', gap: 12 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F9FF', paddingVertical: 12, borderRadius: 12, gap: 8 },
  actionText: { color: '#0284C7', fontWeight: '600', fontSize: 14 },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
  listContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginBottom: 32 },
  studentRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  noBorder: { borderBottomWidth: 0 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  avatarText: { color: '#0284C7', fontWeight: 'bold', fontSize: 16 },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 2 },
  rollNumber: { fontSize: 13, color: '#64748B' },
});
