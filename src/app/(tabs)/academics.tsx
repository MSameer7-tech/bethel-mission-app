import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, Calendar, CheckCircle, FileText, ClipboardList, Bus, Library, Award, FileClock, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { TouchableBounce } from '../../components/TouchableBounce';

// Static Data Helper
const getSections = (theme: any) => [
  {
    title: 'Learning',
    data: [
      { id: 'homework', title: 'Homework', desc: 'Assignments and submissions', icon: BookOpen, color: theme.colors.academic, bg: theme.colors.academicBg, route: '/(student)/homework' },
      { id: 'studyMaterial', title: 'Study Material', desc: 'Notes, PDFs and resources', icon: FileText, color: theme.colors.success, bg: theme.colors.successBg, route: '/(student)/study-material' },
      { id: 'results', title: 'Results', desc: 'Report cards and grades', icon: Award, color: theme.colors.warning, bg: theme.colors.warningBg, route: '/(student)/results' },
    ]
  },
  {
    title: 'School',
    data: [
      { id: 'attendance', title: 'Attendance', desc: 'Daily attendance records', icon: CheckCircle, color: theme.colors.info, bg: theme.colors.infoBg, route: '/(student)/attendance' },
      { id: 'calendar', title: 'Calendar', desc: 'Events and holidays', icon: Calendar, color: theme.colors.error, bg: theme.colors.errorBg, route: '/(student)/calendar' },
      { id: 'circulars', title: 'Circulars', desc: 'Official school notices', icon: FileText, color: theme.colors.secondary, bg: theme.colors.successBg, route: '/(student)/circulars' },
    ]
  },
  {
    title: 'Services',
    data: [
      { id: 'fees', title: 'Fees', desc: 'Pending dues and receipts', icon: ClipboardList, color: theme.colors.error, bg: theme.colors.errorBg, route: '/(student)/fees' },
      { id: 'library', title: 'Library', desc: 'Issued books and catalogue', icon: Library, color: theme.colors.academic, bg: theme.colors.academicBg, route: '/(student)/library' },
      { id: 'transport', title: 'Transport', desc: 'Bus routes and driver info', icon: Bus, color: theme.colors.warning, bg: theme.colors.warningBg, route: '/(student)/transport' },
      { id: 'applyLeave', title: 'Apply Leave', desc: 'Submit a new leave request', icon: FileClock, color: theme.colors.textSecondary, bg: theme.colors.borderLight, route: '/(student)/apply-leave' },
    ]
  }
];

// Memoized Row
const AcademicRow = React.memo(({ item, isLast, isFirst, theme, styles, router }: any) => {
  const Icon = item.icon;
  
  return (
    <TouchableBounce 
      bounceScale={0.98}
      style={[
        styles.row, 
        isLast && styles.rowLast,
        isFirst && styles.rowFirst
      ]}
      onPress={() => router.push(item.route)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.bg }]}>
        <Icon color={item.color} size={20} />
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.rowDesc} numberOfLines={1}>{item.desc}</Text>
      </View>
      <ChevronRight color={theme.colors.border} size={20} />
    </TouchableBounce>
  );
});

export default function AcademicsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  
  const styles = useMemo(() => getStyles(theme), [theme]);
  const sections = useMemo(() => getSections(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <Text style={styles.title}>Academics</Text>
      </View>
      <SectionList 
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 16) }]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={5}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        renderItem={({ item, index, section }) => (
          <AcademicRow 
            item={item} 
            isFirst={index === 0}
            isLast={index === section.data.length - 1} 
            theme={theme}
            styles={styles}
            router={router}
          />
        )}
        SectionSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { paddingHorizontal: theme.spacing.screenPadding, paddingBottom: theme.spacing.md, backgroundColor: theme.colors.background },
  title: { ...theme.typography.styles.display, color: theme.colors.textPrimary },
  
  content: { paddingHorizontal: theme.spacing.screenPadding, paddingTop: theme.spacing.sm },
  sectionTitle: { ...theme.typography.styles.sectionTitle, color: theme.colors.textSecondary, marginBottom: theme.spacing.sm, marginLeft: 16, marginTop: theme.spacing.md },
  
  row: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.md, paddingHorizontal: theme.spacing.lg, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderBottomWidth: 0 },
  rowFirst: { borderTopLeftRadius: theme.radius.card, borderTopRightRadius: theme.radius.card },
  rowLast: { borderBottomWidth: 1, borderBottomLeftRadius: theme.radius.card, borderBottomRightRadius: theme.radius.card },
  
  separator: { height: 1, backgroundColor: theme.colors.border, marginLeft: 68 }, // align with content, not icon
  
  iconContainer: { width: 36, height: 36, borderRadius: theme.radius.sm, alignItems: 'center', justifyContent: 'center', marginRight: theme.spacing.md },
  rowContent: { flex: 1, justifyContent: 'center' },
  rowTitle: { ...theme.typography.styles.bodyMedium, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 2 },
  rowDesc: { ...theme.typography.styles.caption, color: theme.colors.textSecondary },
});
