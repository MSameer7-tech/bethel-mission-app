import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FileText, Download, BellRing, Calendar } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableBounce } from '../../components/TouchableBounce';

export default function CircularsScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const insets = useSafeAreaInsets();

  const circulars = [
    { id: 1, title: 'Schedule for Half Yearly Examinations 2026', date: '05 Oct 2026', ref: 'BMS/2026/Cir-42', isNew: true },
    { id: 2, title: 'Revised Timings for Winter Session', date: '01 Oct 2026', ref: 'BMS/2026/Cir-41', isNew: false },
    { id: 3, title: 'Parent Teacher Meeting Guidelines', date: '28 Sep 2026', ref: 'BMS/2026/Cir-40', isNew: false },
    { id: 4, title: 'Diwali Vacation Announcement', date: '20 Sep 2026', ref: 'BMS/2026/Cir-39', isNew: false },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      {circulars.map(circular => (
        <TouchableBounce key={circular.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, circular.isNew && { backgroundColor: theme.colors.errorBg }]}>
              <BellRing color={circular.isNew ? theme.colors.error : theme.colors.primary} size={24} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.refText}>Ref: {circular.ref}</Text>
              {circular.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newText}>NEW</Text>
                </View>
              )}
            </View>
          </View>
          
          <Text style={styles.title}>{circular.title}</Text>
          
          <View style={styles.cardFooter}>
            <View style={styles.dateContainer}>
              <Calendar color={theme.colors.textSecondary} size={14} />
              <Text style={styles.dateText}>{circular.date}</Text>
            </View>
            <View style={styles.downloadBtn}>
              <Download color={theme.colors.primary} size={16} />
              <Text style={styles.downloadText}>Download</Text>
            </View>
          </View>
        </TouchableBounce>
      ))}
    </ScrollView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
    ...theme.shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.infoBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    alignItems: 'flex-end',
    gap: 6,
  },
  refText: {
    fontSize: 12,
    color: theme.colors.textMuted,
    fontWeight: '600',
  },
  newBadge: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 20,
    lineHeight: 22,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.infoBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  downloadText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
