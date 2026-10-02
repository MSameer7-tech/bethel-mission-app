import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { classStudents } from '@/data/teachers';

export default function EnterMarksScreen() {
  const router = useRouter();
  const { examId } = useLocalSearchParams();
  const [marks, setMarks] = useState<Record<string, string>>({});

  const handleSave = () => {
    alert('Marks saved successfully!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Half Yearly Exam 2026</Text>
        <Text style={styles.subtitle}>Class VII-C • Mathematics (Max 100)</Text>
      </View>

      <ScrollView style={styles.list}>
        {classStudents.map(student => (
          <View key={student.id} style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.rollNumber}>Roll No: {student.roll}</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder="0-100"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={marks[student.id] || ''}
                onChangeText={(val) => setMarks(prev => ({ ...prev, [student.id]: val }))}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Marks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#64748B' },
  list: { flex: 1, padding: 16 },
  studentCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  studentInfo: { flex: 1, marginRight: 16 },
  studentName: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 4 },
  rollNumber: { fontSize: 13, color: '#64748B' },
  inputContainer: { width: 80 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, fontWeight: '600', color: '#0F172A', textAlign: 'center' },
  footer: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  saveBtn: { backgroundColor: '#0B3B60', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
