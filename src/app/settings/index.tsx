import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Palette, Bell, User, Shield, Info, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TouchableBounce } from '../../components/TouchableBounce';

const SECTIONS = [
  {
    title: 'PREFERENCES',
    items: [
      { id: 'appearance', icon: Palette, label: 'Appearance', route: '/settings/appearance' },
      { id: 'notifications', icon: Bell, label: 'Notifications', route: null },
    ]
  },
  {
    title: 'ACCOUNT',
    items: [
      { id: 'account', icon: User, label: 'Account Information', route: null },
      { id: 'security', icon: Shield, label: 'Security & Privacy', route: null },
    ]
  },
  {
    title: 'ABOUT',
    items: [
      { id: 'about', icon: Info, label: 'About Bethel Mission', route: null },
    ]
  }
];

export default function SettingsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {SECTIONS.map((section, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.card}>
            {section.items.map((item, i) => {
              const isLast = i === section.items.length - 1;
              return (
                <TouchableBounce 
                  bounceScale={0.98}
                  key={item.id}
                  style={[styles.row, isLast && styles.rowLast]}
                  onPress={() => item.route && router.push(item.route as any)}
                  disabled={!item.route}
                >
                  <View style={styles.rowLeft}>
                    <item.icon color={theme.colors.textSecondary} size={22} style={styles.icon} />
                    <Text style={styles.rowLabel}>{item.label}</Text>
                  </View>
                  <ChevronRight color={theme.colors.textMuted} size={20} />
                </TouchableBounce>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.screenPadding },
  section: { marginBottom: theme.spacing.xl },
  sectionTitle: { ...theme.typography.styles.sectionTitle, color: theme.colors.textMuted, marginBottom: theme.spacing.sm, marginLeft: 16 },
  card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.surface },
  rowLast: { borderBottomWidth: 0 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: theme.spacing.md },
  rowLabel: { ...theme.typography.styles.bodyMedium, color: theme.colors.textPrimary },
});
