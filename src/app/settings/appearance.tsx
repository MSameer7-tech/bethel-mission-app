import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { TouchableBounce } from "../../components/TouchableBounce";
import { Check, Sun, Moon, Smartphone } from 'lucide-react-native';
import { useTheme, ThemeMode } from '../../theme/ThemeContext';

export default function AppearanceScreen() {
  const { theme, themeMode, setThemeMode } = useTheme();
  const styles = getStyles(theme);

  const options: { id: ThemeMode; label: string; icon: any }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Smartphone },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>THEME</Text>
      <View style={styles.card}>
        {options.map((option, i) => {
          const isSelected = themeMode === option.id;
          const isLast = i === options.length - 1;
          
          return (
            <TouchableBounce bounceScale={0.98} 
              key={option.id}
              style={[styles.row, isLast && styles.rowLast]}
              onPress={() => setThemeMode(option.id)}
            >
              <View style={styles.rowLeft}>
                <option.icon 
                  color={isSelected ? theme.colors.primary : theme.colors.textSecondary} 
                  size={22} 
                  style={styles.icon} 
                />
                <Text style={[styles.rowLabel, isSelected && styles.rowLabelSelected]}>
                  {option.label}
                </Text>
              </View>
              {isSelected && <Check color={theme.colors.primary} size={20} />}
            </TouchableBounce>
          );
        })}
      </View>
      <Text style={styles.footerText}>
        System mode will match your device's active appearance setting.
      </Text>
    </View>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.screenPadding },
  sectionTitle: { ...theme.typography.styles.sectionTitle, color: theme.colors.textMuted, marginBottom: theme.spacing.sm, marginLeft: 4, marginTop: theme.spacing.md },
  card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.card, ...theme.shadows.card },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  rowLast: { borderBottomWidth: 0 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: theme.spacing.md },
  rowLabel: { ...theme.typography.styles.bodyMedium, color: theme.colors.textPrimary },
  rowLabelSelected: { color: theme.colors.primary, fontWeight: '600' },
  footerText: { ...theme.typography.styles.caption, color: theme.colors.textMuted, marginTop: theme.spacing.md, marginHorizontal: 4 },
});
