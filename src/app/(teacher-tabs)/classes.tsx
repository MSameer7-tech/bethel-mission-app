import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Users, ChevronRight, Calendar } from 'lucide-react-native';
import { teacherClasses } from '@/data/teachers';
import { useRouter } from 'expo-router';

export default function MyClassesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Classes</Text>
      </View>
      <ScrollView style={styles.content}>
        {teacherClasses.map((cls) => (
          <TouchableOpacity 
            key={cls.id} 
            style={styles.card}
            onPress={() => router.push(`/(teacher)/class-details?id=${cls.id}` as any)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Users color="#0284C7" size={24} />
              </View>
              <Text style={styles.className}>{cls.name}</Text>
            </View>
            <Text style={styles.subjectText}>{cls.subject}</Text>
            <View style={styles.footer}>
              <View style={styles.stat}>
                <Users color="#64748B" size={16} />
                <Text style={styles.statText}>{cls.studentCount} Students</Text>
              </View>
              <View style={styles.stat}>
                <Calendar color="#64748B" size={16} />
                <Text style={styles.statText}>{cls.nextClass}</Text>
              </View>
              <ChevronRight color="#CBD5E1" size={20} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F172A' },
  content: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#F0F9FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  className: { fontSize: 20, fontWeight: 'bold', color: '#0F172A' },
  subjectText: { fontSize: 15, color: '#64748B', marginBottom: 20 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { fontSize: 14, color: '#475569', fontWeight: '500' },
});
