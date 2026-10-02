import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Plus, BookOpen, Clock, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { homeworkData } from '@/data/homework';

export default function TeacherHomeworkScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list} contentContainerStyle={styles.content}>
        {homeworkData.map((hw, idx) => (
          <TouchableOpacity key={idx} style={styles.hwCard}>
            <View style={styles.hwHeader}>
              <View style={styles.classBadge}>
                <Text style={styles.classBadgeText}>VII-C</Text>
              </View>
              <Text style={styles.dateText}>Due: {hw.dueDate}</Text>
            </View>
            <Text style={styles.hwTitle}>{hw.title}</Text>
            <Text style={styles.hwDesc} numberOfLines={2}>{hw.description}</Text>
            <View style={styles.hwFooter}>
              <View style={styles.footerItem}>
                <Users color="#64748B" size={14} />
                <Text style={styles.footerText}>32/42 Submitted</Text>
              </View>
              <TouchableOpacity style={styles.reviewBtn}>
                <Text style={styles.reviewBtnText}>Review</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/(teacher)/create-homework' as any)}
      >
        <Plus color="#FFFFFF" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { flex: 1 },
  content: { padding: 16, paddingBottom: 100 },
  hwCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  hwHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  classBadge: { backgroundColor: '#F0F9FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  classBadgeText: { color: '#0284C7', fontSize: 12, fontWeight: 'bold' },
  dateText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  hwTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  hwDesc: { fontSize: 14, color: '#64748B', marginBottom: 16, lineHeight: 20 },
  hwFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  reviewBtn: { backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  reviewBtnText: { color: '#0284C7', fontSize: 12, fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#0B3B60', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
});
