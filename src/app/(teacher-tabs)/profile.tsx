import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, LogOut, Phone, Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { teacherProfile } from '@/data/teachers';
import { useAuth } from '../../contexts/AuthContext';

export default function TeacherProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeaderCard}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>PS</Text>
          </View>
          <Text style={styles.profileName}>{teacherProfile.name}</Text>
          <Text style={styles.profileSubtext}>{teacherProfile.department}</Text>
          <Text style={styles.profileId}>ID: {teacherProfile.id}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Phone size={20} color="#64748B" />
            <Text style={styles.infoValue}>{teacherProfile.phone}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Mail size={20} color="#64748B" />
            <Text style={styles.infoValue}>{teacherProfile.email}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            await signOut();
          }}
        >
          <LogOut color="#E11D48" size={20} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F172A' },
  content: { padding: 20, paddingBottom: 40 },
  profileHeaderCard: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 24 },
  profileImagePlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#0B3B60', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  profileInitials: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  profileSubtext: { fontSize: 14, color: '#475569', marginBottom: 8 },
  profileId: { fontSize: 12, color: '#0B3B60', backgroundColor: '#F0F9FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, fontWeight: '600' },
  infoCard: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 24 },
  infoRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', gap: 16 },
  infoValue: { fontSize: 15, color: '#1E293B', fontWeight: '500' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF1F2', paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: '#FFE4E6' },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#E11D48', marginLeft: 8 },
});
