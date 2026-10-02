import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LogOut, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { studentProfile } from '@/data/students';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const headerHeight = Math.max(insets.top + 8, 16) + 56;

  const handleLogout = () => router.replace('/');

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.content, { paddingTop: headerHeight + 12, paddingBottom: Math.max(insets.bottom, 16) + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>JS</Text>
            </View>
            <View style={styles.statusDot} />
          </View>
          <View style={styles.heroTextContent}>
            <Text style={styles.studentName}>{studentProfile.name}</Text>
            <Text style={styles.studentClass}>Class {studentProfile.class}-{studentProfile.section} • Roll No. {studentProfile.rollNumber}</Text>
            <View style={styles.admissionBadge}>
              <Text style={styles.admissionText}>{studentProfile.admissionNumber}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ACADEMIC</Text>
        <View style={styles.cardContainer}>
          <InfoRow label="Academic Year" value={studentProfile.academicYear} />
          <InfoRow label="House" value={studentProfile.house} />
          <InfoRow label="Transport" value={studentProfile.transportInfo} isLast />
        </View>

        <Text style={styles.sectionTitle}>PERSONAL</Text>
        <View style={styles.cardContainer}>
          <InfoRow label="Father" value={studentProfile.fatherName} />
          <InfoRow label="Mother" value={studentProfile.motherName} />
          <InfoRow label="Blood Group" value={studentProfile.bloodGroup} isLast />
        </View>

        <Text style={styles.sectionTitle}>CONTACT</Text>
        <View style={styles.cardContainer}>
          <InfoRow label="Phone" value={studentProfile.phone} />
          <InfoRow label="Email" value={studentProfile.email} />
          <InfoRow label="Address" value={studentProfile.address} isLast />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <LogOut color="#E11D48" size={20} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Frosted glass header */}
      <BlurView intensity={90} tint="light" style={[styles.headerBlur, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <View style={styles.headerInner}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Settings color="#0F172A" size={24} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

const InfoRow = ({ label, value, isLast }: any) => (
  <View style={[styles.infoRow, isLast && styles.rowLast]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
  </View>
);

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
  headerInner: { paddingHorizontal: 20, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  settingsBtn: { padding: 10, backgroundColor: 'rgba(241,245,249,0.8)', borderRadius: 10 },
  content: { padding: 20 },
  heroContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 28, padding: 20, backgroundColor: '#FFFFFF', borderRadius: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  avatarWrapper: { position: 'relative', marginRight: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0B3B60', alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  statusDot: { position: 'absolute', bottom: 2, right: 2, width: 20, height: 20, borderRadius: 10, backgroundColor: '#10B981', borderWidth: 3, borderColor: '#FFFFFF' },
  heroTextContent: { flex: 1 },
  studentName: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  studentClass: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  admissionBadge: { alignSelf: 'flex-start', backgroundColor: '#F0F9FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  admissionText: { color: '#0284C7', fontWeight: '700', fontSize: 13 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  cardContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2, marginBottom: 24 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  rowLast: { borderBottomWidth: 0 },
  infoLabel: { fontSize: 15, color: '#64748B', fontWeight: '600', width: 110 },
  infoValue: { fontSize: 16, color: '#1E293B', fontWeight: '700', flex: 1, textAlign: 'right' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', paddingVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: '#FFE4E6', gap: 10, marginTop: 8 },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#E11D48' },
});
