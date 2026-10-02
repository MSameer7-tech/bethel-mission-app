import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { GraduationCap, BookOpen } from 'lucide-react-native';

export default function RoleSwitcher() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Placeholder for Bethel Mission School Logo */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>BMS</Text>
        </View>
        <Text style={styles.title}>Bethel Mission HR. SEC. School</Text>
        <Text style={styles.subtitle}>Prototype Demonstration</Text>
      </View>

      <View style={styles.roleContainer}>
        <Text style={styles.sectionTitle}>Select Role to Preview</Text>
        
        <TouchableOpacity 
          style={styles.roleCard}
          onPress={() => router.push('/(auth)/login?role=student')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#E0F2FE' }]}>
            <GraduationCap color="#0284C7" size={32} />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>Student / Parent</Text>
            <Text style={styles.roleDescription}>Preview the student dashboard and features</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.roleCard}
          onPress={() => router.push('/(auth)/login?role=teacher')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#ECFCCB' }]}>
            <BookOpen color="#65A30D" size={32} />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>Teacher</Text>
            <Text style={styles.roleDescription}>Preview the teacher dashboard and tools</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0B3B60',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  roleContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    textAlign: 'center',
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#64748B',
  },
});
