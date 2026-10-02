import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, Calendar, CheckCircle, FileText, ClipboardList, Bus, Library, Award, FileClock, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

export default function AcademicsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const headerHeight = Math.max(insets.top + 8, 16) + 56;

  const sections = [
    {
      title: 'Learning',
      items: [
        { id: 'homework', title: 'Homework', desc: 'Assignments and submissions', icon: BookOpen, color: '#8B5CF6', bg: '#EDE9FE', route: '/(student)/homework' },
        { id: 'studyMaterial', title: 'Study Material', desc: 'Notes, PDFs and resources', icon: FileText, color: '#10B981', bg: '#D1FAE5', route: '/(student)/study-material' },
        { id: 'results', title: 'Results', desc: 'Report cards and grades', icon: Award, color: '#F59E0B', bg: '#FEF3C7', route: '/(student)/results' },
      ]
    },
    {
      title: 'School',
      items: [
        { id: 'attendance', title: 'Attendance', desc: 'Daily attendance records', icon: CheckCircle, color: '#0EA5E9', bg: '#E0F2FE', route: '/(student)/attendance' },
        { id: 'calendar', title: 'Calendar', desc: 'Events and holidays', icon: Calendar, color: '#EC4899', bg: '#FCE7F3', route: '/(student)/calendar' },
        { id: 'circulars', title: 'Circulars', desc: 'Official school notices', icon: FileText, color: '#0D9488', bg: '#CCFBF1', route: '/(student)/circulars' },
      ]
    },
    {
      title: 'Services',
      items: [
        { id: 'fees', title: 'Fees', desc: 'Pending dues and receipts', icon: ClipboardList, color: '#F43F5E', bg: '#FFE4E6', route: '/(student)/fees' },
        { id: 'library', title: 'Library', desc: 'Issued books and catalogue', icon: Library, color: '#6366F1', bg: '#E0E7FF', route: '/(student)/library' },
        { id: 'transport', title: 'Transport', desc: 'Bus routes and driver info', icon: Bus, color: '#F97316', bg: '#FFEDD5', route: '/(student)/transport' },
        { id: 'applyLeave', title: 'Apply Leave', desc: 'Submit a new leave request', icon: FileClock, color: '#64748B', bg: '#F1F5F9', route: '/(student)/apply-leave' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.content, { paddingTop: headerHeight + 12, paddingBottom: Math.max(insets.bottom, 16) + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, idx) => (
          <View key={idx} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
            <View style={styles.cardContainer}>
              {section.items.map((item, itemIdx) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.row, itemIdx === section.items.length - 1 && styles.rowLast]}
                  activeOpacity={0.6}
                  onPress={() => router.push(item.route as any)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: item.bg }]}>
                    <item.icon color={item.color} size={22} />
                  </View>
                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.rowDesc} numberOfLines={1}>{item.desc}</Text>
                  </View>
                  <ChevronRight color="#CBD5E1" size={20} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Frosted glass header */}
      <BlurView intensity={90} tint="light" style={[styles.headerBlur, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <View style={styles.headerInner}>
          <Text style={styles.title}>Academics</Text>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  headerBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(244,247,250,0.72)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(241,245,249,0.8)',
  },
  headerInner: { paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  content: { padding: 20 },
  sectionContainer: { marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  cardContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', minHeight: 72 },
  rowLast: { borderBottomWidth: 0 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  rowContent: { flex: 1, justifyContent: 'center' },
  rowTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 2 },
  rowDesc: { fontSize: 14, color: '#64748B' },
});
