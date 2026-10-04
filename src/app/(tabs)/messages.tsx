import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { TouchableBounce } from '../../components/TouchableBounce';

// Static data outside component
const unreadMessages = [
  { id: 1, name: 'Pushpendra Singh', initials: 'PS', subject: 'Mathematics', message: 'Please ensure you submit the quadratic equations assignment by tomorrow morning.', time: '10:30 AM', unread: true, bgKey: 'infoBg', colorKey: 'info' },
];

const otherMessages = [
  { id: 2, name: 'Anita Sharma', initials: 'AS', subject: 'Science', message: 'The science lab will be closed on Friday due to maintenance.', time: 'Yesterday', unread: false, bgKey: 'academicBg', colorKey: 'academic' },
  { id: 3, name: 'Neha Verma', initials: 'NV', subject: 'English', message: 'Well done on your recent essay. Keep up the good work.', time: '12 Oct', unread: false, bgKey: 'successBg', colorKey: 'success' },
  { id: 4, name: 'Rahul Desai', initials: 'RD', subject: 'History', message: 'Chapter 4 notes have been uploaded to the portal.', time: '10 Oct', unread: false, bgKey: 'warningBg', colorKey: 'warning' },
];

const MessageRow = React.memo(({ msg, theme, styles }: any) => {
  const isUnread = msg.unread;
  const avatarBg = theme.colors[msg.bgKey];
  const avatarText = theme.colors[msg.colorKey];

  return (
    <TouchableBounce 
      bounceScale={0.96} 
      style={[
        styles.messageCard, 
        isUnread && { backgroundColor: theme.colors.infoBg, borderColor: theme.mode === 'dark' ? theme.colors.borderLight : 'transparent' }
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
        <Text style={[styles.avatarText, { color: avatarText }]}>{msg.initials}</Text>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.nameRow}>
          <Text style={[styles.senderName, isUnread && styles.textBold]} numberOfLines={1}>{msg.name}</Text>
          <View style={styles.timeContainer}>
            <Text style={[styles.timeText, isUnread && styles.timeTextUnread]}>{msg.time}</Text>
            {isUnread && <View style={styles.unreadDotIndicator} />}
          </View>
        </View>
        <Text style={[styles.subjectText, isUnread && styles.textBold]} numberOfLines={1}>{msg.subject}</Text>
        <Text style={styles.previewText} numberOfLines={2}>{msg.message}</Text>
      </View>
    </TouchableBounce>
  );
});

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const sections = useMemo(() => [
    { title: 'UNREAD', data: unreadMessages },
    { title: 'EARLIER', data: otherMessages }
  ], []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.searchBar}>
          <Search color={theme.colors.textMuted} size={20} />
          <TextInput 
            placeholder="Search conversations"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.searchInput}
          />
        </View>
      </View>
      
      <SectionList 
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 24) }]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionTitle, title === 'EARLIER' && { marginTop: 12 }]}>
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <MessageRow 
            msg={item} 
            theme={theme} 
            styles={styles} 
          />
        )}
      />
    </View>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 16, backgroundColor: theme.colors.background },
  title: { ...theme.typography.styles.display, color: theme.colors.textPrimary, marginBottom: 16 },
  
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: theme.colors.input, 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    height: 48 
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 10, 
    fontSize: 16, 
    color: theme.colors.textPrimary, 
    height: '100%' 
  },
  
  content: { paddingBottom: 20 },
  sectionTitle: { 
    ...theme.typography.styles.sectionTitle, 
    color: theme.colors.textMuted, 
    marginBottom: 12, 
    paddingHorizontal: 20 
  },
  
  messageCard: { 
    flexDirection: 'row', 
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card
  },
  
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 16 
  },
  avatarText: { fontSize: 18, fontWeight: '700' },
  
  messageContent: { flex: 1 },
  
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  senderName: { ...theme.typography.styles.bodyMedium, color: theme.colors.textPrimary, flex: 1, marginRight: 8 },
  timeContainer: { flexDirection: 'row', alignItems: 'center' },
  timeText: { ...theme.typography.styles.caption, color: theme.colors.textMuted },
  timeTextUnread: { color: theme.colors.info, fontWeight: '700' },
  unreadDotIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.info, marginLeft: 6 },
  
  subjectText: { ...theme.typography.styles.bodyMedium, color: theme.colors.textPrimary, marginBottom: 4 },
  previewText: { ...theme.typography.styles.caption, color: theme.colors.textSecondary, lineHeight: 20 },
  textBold: { fontWeight: '700', color: theme.colors.textPrimary },
});
