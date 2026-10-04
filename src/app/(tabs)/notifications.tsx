import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { BookOpen, CheckCircle, CreditCard, Calendar, FileClock, Bell } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { TouchableBounce } from '../../components/TouchableBounce';

// Static Data
const todayNotifications = [
  { id: 1, type: 'homework', title: 'New Homework assigned', desc: 'Mathematics: Quadratic Equations', time: '10:00 AM', unread: true },
  { id: 2, type: 'attendance', title: 'Attendance Updated', desc: 'You were marked Present for today', time: '08:15 AM', unread: true },
];

const earlierNotifications = [
  { id: 3, type: 'fee', title: 'Fee Reminder', desc: '₹2,500 due for Quarter 3. Please pay by 10 Oct.', time: 'Yesterday', unread: false },
  { id: 4, type: 'exam', title: 'Exam Timetable', desc: 'Half Yearly schedule published', time: '12 Oct', unread: false },
  { id: 5, type: 'leave', title: 'Leave Approved', desc: 'Your leave for 10 Oct is approved', time: '10 Oct', unread: false },
];

// Memoized Icon Fetchers
const getIcon = (type: string, theme: any) => {
  switch (type) {
    case 'homework': return <BookOpen color={theme.colors.academic} size={20} />;
    case 'attendance': return <CheckCircle color={theme.colors.success} size={20} />;
    case 'fee': return <CreditCard color={theme.colors.error} size={20} />;
    case 'exam': return <Calendar color={theme.colors.info} size={20} />;
    case 'leave': return <FileClock color={theme.colors.secondary} size={20} />;
    default: return <Bell color={theme.colors.textSecondary} size={20} />;
  }
};

const getIconBg = (type: string, theme: any) => {
  switch (type) {
    case 'homework': return theme.colors.academicBg;
    case 'attendance': return theme.colors.successBg;
    case 'fee': return theme.colors.errorBg;
    case 'exam': return theme.colors.infoBg;
    case 'leave': return theme.colors.successBg;
    default: return theme.colors.borderLight;
  }
};

// Memoized Row
const NotificationRow = React.memo(({ notif, isLast, theme, styles }: any) => {
  const icon = getIcon(notif.type, theme);
  const bg = getIconBg(notif.type, theme);

  return (
    <TouchableBounce 
      bounceScale={0.98}
      style={[styles.row, notif.unread && { backgroundColor: theme.colors.infoBg }]} 
    >
      <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
        {icon}
      </View>
      <View style={[styles.textContent, isLast && styles.textContentLast, notif.unread && { borderBottomColor: 'transparent' }]}>
        <View style={styles.titleRow}>
          <Text style={[styles.notifTitle, notif.unread && styles.textBold]} numberOfLines={1}>{notif.title}</Text>
          <Text style={styles.notifTime}>{notif.time}</Text>
        </View>
        <Text style={styles.notifDesc} numberOfLines={2}>{notif.desc}</Text>
      </View>
      {notif.unread && <View style={styles.unreadIndicator} />}
    </TouchableBounce>
  );
});

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const sections = useMemo(() => [
    { title: 'TODAY', data: todayNotifications },
    { title: 'EARLIER', data: earlierNotifications }
  ], []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <SectionList 
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 16) }]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionTitle, title === 'EARLIER' && { marginTop: theme.spacing.lg }]}>
            {title}
          </Text>
        )}
        renderItem={({ item, index, section }) => (
          <NotificationRow 
            notif={item} 
            isLast={index === section.data.length - 1} 
            theme={theme}
            styles={styles}
          />
        )}
      />
    </View>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  header: { paddingHorizontal: theme.spacing.screenPadding, paddingBottom: theme.spacing.md, backgroundColor: theme.colors.surface },
  title: { ...theme.typography.styles.display, color: theme.colors.textPrimary },
  
  content: { paddingTop: theme.spacing.sm },
  sectionTitle: { ...theme.typography.styles.sectionTitle, color: theme.colors.textMuted, marginBottom: theme.spacing.sm, paddingHorizontal: theme.spacing.screenPadding },
  
  row: { flexDirection: 'row', paddingHorizontal: theme.spacing.screenPadding, paddingTop: theme.spacing.lg, position: 'relative', backgroundColor: theme.colors.surface },
  iconWrapper: { width: 40, height: 40, borderRadius: theme.radius.sm, alignItems: 'center', justifyContent: 'center', marginRight: theme.spacing.md },
  
  textContent: { flex: 1, paddingBottom: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  textContentLast: { borderBottomWidth: 0 },
  
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notifTitle: { ...theme.typography.styles.bodyMedium, color: theme.colors.textPrimary, flex: 1, marginRight: 8 },
  textBold: { fontWeight: '700' },
  notifDesc: { ...theme.typography.styles.caption, color: theme.colors.textSecondary, lineHeight: 20 },
  notifTime: { ...theme.typography.styles.label, color: theme.colors.textMuted },
  
  unreadIndicator: { position: 'absolute', left: 10, top: '50%', marginTop: -4, width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.info },
});
