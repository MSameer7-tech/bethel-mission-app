import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FileText, Download, File, Image as ImageIcon, Video, FileArchive } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableBounce } from '../../components/TouchableBounce';

const materials = [
  { id: '1', subject: 'Science', title: 'Chapter 4: Heat - Revision Notes', type: 'pdf', size: '2.4 MB', date: '12 Oct 2026' },
  { id: 2, subject: 'Mathematics', title: 'Quadratic Equations Formula Sheet', type: 'doc', size: '1.1 MB', date: '10 Oct 2026' },
  { id: 3, subject: 'English', title: 'Grammar Rules - Tenses', type: 'image', size: '800 KB', date: '08 Oct 2026' },
  { id: 4, subject: 'Social Science', title: 'French Revolution Timeline', type: 'video', size: '15.6 MB', date: '05 Oct 2026' },
];

export default function StudyMaterialScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const insets = useSafeAreaInsets();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText color={theme.colors.error} size={24} />;
      case 'doc': return <File color={theme.colors.info} size={24} />;
      case 'image': return <ImageIcon color={theme.colors.success} size={24} />;
      case 'video': return <Video color={theme.colors.academic} size={24} />;
      default: return <FileArchive color={theme.colors.textSecondary} size={24} />;
    }
  };

  const getBackgroundColorForType = (type: string) => {
    switch (type) {
      case 'pdf': return theme.colors.errorBg;
      case 'doc': return theme.colors.infoBg;
      case 'image': return theme.colors.successBg;
      case 'video': return theme.colors.academicBg;
      default: return theme.colors.borderLight;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 24) }]}>
      <View style={styles.filterScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', 'Science', 'Mathematics', 'English', 'Social Science'].map((sub, index) => (
            <TouchableBounce bounceScale={0.97} key={sub} style={[styles.filterChip, index === 0 && styles.filterActive]}>
              <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{sub}</Text>
            </TouchableBounce>
          ))}
        </ScrollView>
      </View>

      {materials.map(mat => (
        <TouchableBounce bounceScale={0.98} key={mat.id} style={styles.materialCard}>
          <View style={[styles.iconContainer, { backgroundColor: getBackgroundColorForType(mat.type) }]}>
            {getIconForType(mat.type)}
          </View>
          <View style={styles.materialContent}>
            <Text style={styles.materialSubject}>{mat.subject}</Text>
            <Text style={styles.materialTitle} numberOfLines={2}>{mat.title}</Text>
            <View style={styles.materialMeta}>
              <Text style={styles.metaText}>{mat.type.toUpperCase()}</Text>
              <View style={[styles.metaDot, { backgroundColor: theme.colors.textMuted }]} />
              <Text style={styles.metaText}>{mat.size}</Text>
              <View style={[styles.metaDot, { backgroundColor: theme.colors.textMuted }]} />
              <Text style={styles.metaText}>{mat.date}</Text>
            </View>
          </View>
          <TouchableBounce bounceScale={0.9} style={styles.downloadButton}>
            <Download color={theme.colors.primary} size={20} />
          </TouchableBounce>
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
  filterScroll: {
    marginBottom: 20,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
    fontSize: 14,
  },
  filterTextActive: {
    color: theme.colors.surface,
    fontWeight: '500',
  },
  materialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  materialContent: {
    flex: 1,
    marginRight: 12,
  },
  materialSubject: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  materialTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 8,
    lineHeight: 20,
  },
  materialMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 8,
  },
  downloadButton: {
    padding: 8,
    backgroundColor: theme.colors.infoBg,
    borderRadius: 12,
  },
});
