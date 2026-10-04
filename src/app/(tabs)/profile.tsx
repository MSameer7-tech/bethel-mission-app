import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LogOut, ChevronRight, Settings, Lock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { studentProfile } from '@/data/students';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { TouchableBounce } from '../../components/TouchableBounce';
import { useAuth } from '../../contexts/AuthContext';
import { useStudentProfile } from '../../hooks/useStudentProfile';
import { ActivityIndicator } from 'react-native';

// Memoized pure components
const InfoRow = React.memo(({ label, value, isLast, theme, styles }: any) => (
  <View style={[styles.infoRow, isLast && styles.rowLast]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
  </View>
));

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const { data: student, loading, error } = useStudentProfile();
  
  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleLogout = async () => {
    await signOut();
    // The AuthContext listener will automatically detect session null
    // and layout's effect will redirect to login.
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <Text style={styles.title}>Profile</Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 16) }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.heroContainer}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              {loading ? (
                <ActivityIndicator color={theme.colors.primary} />
              ) : (
                <Text style={styles.avatarInitials}>
                  {student?.firstName?.[0] ?? 'S'}{student?.lastName?.[0] ?? ''}
                </Text>
              )}
            </View>
            <View style={styles.statusDot} />
          </View>

          {loading ? (
            <View style={{ gap: 8, alignItems: 'center', marginTop: 12 }}>
              <View style={{ height: 28, width: 200, backgroundColor: theme.colors.surfaceSecondary, borderRadius: 4 }} />
              <View style={{ height: 16, width: 150, backgroundColor: theme.colors.surfaceSecondary, borderRadius: 4 }} />
              <View style={{ height: 24, width: 140, backgroundColor: theme.colors.surfaceSecondary, borderRadius: 12 }} />
            </View>
          ) : error ? (
            <Text style={[styles.studentName, { color: theme.colors.error, marginTop: 12 }]}>{error}</Text>
          ) : (
            <>
              <Text style={styles.studentName}>{student?.firstName} {student?.lastName}</Text>
              <Text style={styles.studentClass}>Class {student?.className}-{student?.sectionName} • Roll No. {studentProfile.rollNumber}</Text>
              <View style={styles.admissionBadge}>
                <Text style={styles.admissionText}>Admin No: {student?.admissionNumber}</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>ACADEMIC</Text>
          <View style={styles.cardContainer}>
            <InfoRow label="Academic Year" value={student?.academicYear || 'Loading...'} theme={theme} styles={styles} />
            <InfoRow label="House" value={studentProfile.house} theme={theme} styles={styles} />
            <InfoRow label="Transport" value={studentProfile.transportInfo} isLast theme={theme} styles={styles} />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>PERSONAL</Text>
          <View style={styles.cardContainer}>
            <InfoRow label="Father" value={studentProfile.fatherName} theme={theme} styles={styles} />
            <InfoRow label="Mother" value={studentProfile.motherName} theme={theme} styles={styles} />
            <InfoRow label="Blood Group" value={studentProfile.bloodGroup} isLast theme={theme} styles={styles} />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>CONTACT</Text>
          <View style={styles.cardContainer}>
            <InfoRow label="Phone" value={studentProfile.phone} theme={theme} styles={styles} />
            <InfoRow label="Email" value={studentProfile.email} theme={theme} styles={styles} />
            <InfoRow label="Address" value={studentProfile.address} isLast theme={theme} styles={styles} />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>ACCOUNT & SETTINGS</Text>
          <View style={styles.cardContainer}>
            <TouchableBounce 
              bounceScale={0.98}
              style={styles.actionRow} 
              onPress={() => router.push('/settings')}
            >
              <View style={styles.rowLeftContent}>
                <Settings color={theme.colors.textSecondary} size={20} style={{marginRight: 12}} />
                <Text style={styles.infoValueLeft}>Settings</Text>
              </View>
              <ChevronRight color={theme.colors.border} size={20} />
            </TouchableBounce>
            
            <TouchableBounce 
              bounceScale={0.98}
              style={styles.actionRow} 
            >
              <View style={styles.rowLeftContent}>
                <Lock color={theme.colors.textSecondary} size={20} style={{marginRight: 12}} />
                <Text style={styles.infoValueLeft}>Change Password</Text>
              </View>
              <ChevronRight color={theme.colors.border} size={20} />
            </TouchableBounce>
            
            <TouchableBounce 
              bounceScale={0.98}
              style={[styles.actionRow, styles.rowLast]} 
              onPress={handleLogout} 
            >
              <View style={styles.rowLeftContent}>
                <LogOut color={theme.colors.error} size={20} style={{marginRight: 12}} />
                <Text style={[styles.infoValueLeft, { color: theme.colors.error, fontWeight: '600' }]}>Sign Out</Text>
              </View>
            </TouchableBounce>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { paddingHorizontal: theme.spacing.screenPadding, paddingBottom: theme.spacing.md, backgroundColor: theme.colors.background },
  title: { ...theme.typography.styles.display, color: theme.colors.textPrimary },
  content: { padding: theme.spacing.screenPadding, paddingTop: 0 },
  
  heroContainer: { alignItems: 'center', marginBottom: theme.spacing.xxxl, paddingTop: theme.spacing.xl },
  avatarWrapper: { position: 'relative', marginBottom: theme.spacing.lg },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontSize: 32, fontWeight: 'bold', color: theme.colors.surface },
  statusDot: { position: 'absolute', bottom: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: theme.colors.success, borderWidth: 3, borderColor: theme.colors.background },
  studentName: { ...theme.typography.styles.pageTitle, color: theme.colors.textPrimary, marginBottom: 4 },
  studentClass: { ...theme.typography.styles.bodyMedium, color: theme.colors.textSecondary, marginBottom: 12 },
  admissionBadge: { backgroundColor: theme.colors.surface, paddingHorizontal: 16, paddingVertical: 6, borderRadius: theme.radius.pill, borderWidth: 1, borderColor: theme.colors.border },
  admissionText: { color: theme.colors.textSecondary, ...theme.typography.styles.label, fontWeight: '600' },
  
  sectionContainer: { marginBottom: theme.spacing.xxl },
  sectionTitle: { ...theme.typography.styles.sectionTitle, color: theme.colors.textSecondary, marginBottom: theme.spacing.sm, marginLeft: 16 },
  cardContainer: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.surface },
  rowLast: { borderBottomWidth: 0 },
  infoLabel: { ...theme.typography.styles.bodyMedium, color: theme.colors.textSecondary, width: 110 },
  infoValue: { ...theme.typography.styles.bodyMedium, fontWeight: '600', color: theme.colors.textPrimary, flex: 1, textAlign: 'right' },
  
  rowLeftContent: { flexDirection: 'row', alignItems: 'center' },
  infoValueLeft: { ...theme.typography.styles.bodyMedium, color: theme.colors.textPrimary },
});
