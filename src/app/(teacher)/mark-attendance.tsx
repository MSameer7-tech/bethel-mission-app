import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { classStudents } from '@/data/teachers';

export default function MarkAttendanceScreen() {
  const router = useRouter();
  const { classId } = useLocalSearchParams();
  const [attendance, setAttendance] = useState<Record<string, string>>(
    classStudents.reduce((acc, curr) => ({ ...acc, [curr.id]: 'present' }), {})
  );

  const toggleStatus = (id: string, status: string) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    alert('Attendance saved successfully!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</Text>
        <Text style={styles.subText}>{classId || 'Class VII-C'}</Text>
      </View>

      <ScrollView style={styles.list}>
        {classStudents.map(student => (
          <View key={student.id} style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.rollNumber}>Roll No: {student.roll}</Text>
            </View>
            <View style={styles.statusGroup}>
              <TouchableOpacity 
                style={[styles.statusBtn, attendance[student.id] === 'present' && styles.statusPresent]}
                onPress={() => toggleStatus(student.id, 'present')}
              >
                <Text style={[styles.statusBtnText, attendance[student.id] === 'present' && styles.textWhite]}>P</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.statusBtn, attendance[student.id] === 'absent' && styles.statusAbsent]}
                onPress={() => toggleStatus(student.id, 'absent')}
              >
                <Text style={[styles.statusBtnText, attendance[student.id] === 'absent' && styles.textWhite]}>A</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.statusBtn, attendance[student.id] === 'leave' && styles.statusLeave]}
                onPress={() => toggleStatus(student.id, 'leave')}
              >
                <Text style={[styles.statusBtnText, attendance[student.id] === 'leave' && styles.textWhite]}>L</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  dateText: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
  subText: { fontSize: 14, color: '#64748B', marginTop: 4 },
  list: { flex: 1, padding: 16 },
  studentCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  rollNumber: { fontSize: 13, color: '#64748B' },
  statusGroup: { flexDirection: 'row', gap: 8 },
  statusBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  statusPresent: { backgroundColor: '#16A34A' },
  statusAbsent: { backgroundColor: '#E11D48' },
  statusLeave: { backgroundColor: '#F59E0B' },
  statusBtnText: { fontSize: 14, fontWeight: 'bold', color: '#64748B' },
  textWhite: { color: '#FFFFFF' },
  footer: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  saveBtn: { backgroundColor: '#0B3B60', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
