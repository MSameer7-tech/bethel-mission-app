import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { GraduationCap, BookOpen } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { TouchableBounce } from '../components/TouchableBounce';

export default function RoleSwitcher() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>BETHEL</Text>
        </View>
        <Text style={styles.title}>Bethel Mission HR. SEC.</Text>
        <Text style={styles.subtitle}>Prototype Demonstration</Text>
      </View>

      <View style={styles.roleContainer}>
        <Text style={styles.sectionTitle}>SELECT ROLE TO PREVIEW</Text>
        
        <TouchableBounce 
          bounceScale={0.96}
          style={styles.roleCard}
          onPress={() => router.push('/(auth)/login?role=student')}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.infoBg }]}>
            <GraduationCap color={theme.colors.info} size={28} />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>Student / Parent</Text>
            <Text style={styles.roleDescription}>Preview the student dashboard</Text>
          </View>
        </TouchableBounce>

        <TouchableBounce 
          bounceScale={0.96}
          style={styles.roleCard}
          onPress={() => router.push('/(auth)/login?role=teacher')}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.academicBg }]}>
            <BookOpen color={theme.colors.academic} size={28} />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>Teacher</Text>
            <Text style={styles.roleDescription}>Preview the teacher dashboard</Text>
          </View>
        </TouchableBounce>
      </View>
    </View>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.screenPadding,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    ...theme.shadows.card,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    ...theme.typography.styles.pageTitle,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    ...theme.typography.styles.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  roleContainer: {
    gap: 16,
  },
  sectionTitle: {
    ...theme.typography.styles.sectionTitle,
    color: theme.colors.textMuted,
    marginBottom: 8,
    textAlign: 'center',
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.radius.card,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    ...theme.typography.styles.cardTitle,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  roleDescription: {
    ...theme.typography.styles.caption,
    color: theme.colors.textSecondary,
  },
});
