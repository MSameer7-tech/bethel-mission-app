import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const unreadMessages = [
  { id: 1, name: 'Pushpendra Singh', subject: 'Mathematics', message: 'Please ensure you submit the quadratic equations assignment by tomorrow morning.', time: '10:30 AM', unread: true },
];

const otherMessages = [
  { id: 2, name: 'Anita Sharma', subject: 'Science', message: 'The science lab will be closed on Friday due to maintenance.', time: 'Yesterday', unread: false },
  { id: 3, name: 'Neha Verma', subject: 'English', message: 'Well done on your recent essay. Keep up the good work.', time: '12 Oct', unread: false },
];

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.searchBar}>
          <Search color="#94A3B8" size={20} />
          <TextInput 
            placeholder="Search conversations"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>
      </View>
      
      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 16) + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>UNREAD</Text>
        <View style={styles.cardContainer}>
          {unreadMessages.map((msg, idx) => (
            <MessageRow key={msg.id} msg={msg} isLast={idx === unreadMessages.length - 1} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>EARLIER</Text>
        <View style={styles.cardContainer}>
          {otherMessages.map((msg, idx) => (
            <MessageRow key={msg.id} msg={msg} isLast={idx === otherMessages.length - 1} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const MessageRow = ({ msg, isLast }: any) => (
  <TouchableOpacity style={[styles.messageRow, isLast && styles.rowLast]} activeOpacity={0.6}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{msg.name.charAt(0)}</Text>
      {msg.unread && <View style={styles.unreadDot} />}
    </View>
    <View style={styles.messageContent}>
      <View style={styles.nameRow}>
        <Text style={[styles.senderName, msg.unread && styles.textBold]} numberOfLines={1}>{msg.name}</Text>
        <Text style={[styles.timeText, msg.unread && styles.timeTextUnread]}>{msg.time}</Text>
      </View>
      <Text style={styles.subjectText} numberOfLines={1}>{msg.subject}</Text>
      <Text style={[styles.previewText, msg.unread && styles.textBold]} numberOfLines={1}>{msg.message}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  header: { paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#0F172A', height: '100%' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  cardContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  messageRow: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  rowLast: { borderBottomWidth: 0 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center', marginRight: 16, position: 'relative' },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: '#0B3B60' },
  unreadDot: { position: 'absolute', top: 0, right: -2, width: 14, height: 14, borderRadius: 7, backgroundColor: '#0EA5E9', borderWidth: 2, borderColor: '#FFFFFF' },
  messageContent: { flex: 1, justifyContent: 'center' },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  senderName: { fontSize: 16, fontWeight: '700', color: '#1E293B', flex: 1, marginRight: 8 },
  timeText: { fontSize: 12, color: '#94A3B8' },
  timeTextUnread: { color: '#0EA5E9', fontWeight: '800' },
  subjectText: { fontSize: 14, color: '#0D9488', fontWeight: '600', marginBottom: 4 },
  previewText: { fontSize: 14, color: '#64748B', lineHeight: 20 },
  textBold: { fontWeight: '800', color: '#0F172A' },
});
