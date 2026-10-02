import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BookOpen, CheckCircle, CreditCard, Calendar, FileClock, Bell } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const todayNotifications = [
  { id: 1, type: 'homework', title: 'New Homework', desc: 'Mathematics: Quadratic Equations', time: '10:00 AM', unread: true },
  { id: 2, type: 'attendance', title: 'Attendance Updated', desc: 'Marked Present for today', time: '08:15 AM', unread: true },
];

const earlierNotifications = [
  { id: 3, type: 'fee', title: 'Fee Reminder', desc: '₹2,500 due for Quarter 3', time: 'Yesterday', unread: false },
  { id: 4, type: 'exam', title: 'Exam Timetable', desc: 'Half Yearly schedule published', time: '12 Oct', unread: false },
  { id: 5, type: 'leave', title: 'Leave Approved', desc: 'Your leave for 10 Oct is approved', time: '10 Oct', unread: false },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

  const getIcon = (type: string) => {
    switch (type) {
      case 'homework': return <BookOpen color="#8B5CF6" size={22} />;
      case 'attendance': return <CheckCircle color="#10B981" size={22} />;
      case 'fee': return <CreditCard color="#F43F5E" size={22} />;
      case 'exam': return <Calendar color="#0EA5E9" size={22} />;
      case 'leave': return <FileClock color="#0D9488" size={22} />;
      default: return <Bell color="#64748B" size={22} />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'homework': return '#EDE9FE';
      case 'attendance': return '#D1FAE5';
      case 'fee': return '#FFE4E6';
      case 'exam': return '#E0F2FE';
      case 'leave': return '#CCFBF1';
      default: return '#F1F5F9';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 16) + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>TODAY</Text>
        <View style={styles.cardContainer}>
          {todayNotifications.map((notif, idx) => (
            <NotificationRow 
              key={notif.id} 
              notif={notif} 
              icon={getIcon(notif.type)} 
              bg={getIconBg(notif.type)} 
              isLast={idx === todayNotifications.length - 1} 
            />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>EARLIER</Text>
        <View style={styles.cardContainer}>
          {earlierNotifications.map((notif, idx) => (
            <NotificationRow 
              key={notif.id} 
              notif={notif} 
              icon={getIcon(notif.type)} 
              bg={getIconBg(notif.type)} 
              isLast={idx === earlierNotifications.length - 1} 
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const NotificationRow = ({ notif, icon, bg, isLast }: any) => (
  <TouchableOpacity 
    style={[styles.row, isLast && styles.rowLast, notif.unread && styles.rowUnread]} 
    activeOpacity={0.6}
  >
    <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
      {icon}
    </View>
    <View style={styles.textContent}>
      <Text style={[styles.notifTitle, notif.unread && styles.textBold]} numberOfLines={1}>{notif.title}</Text>
      <Text style={styles.notifDesc} numberOfLines={1}>{notif.desc}</Text>
      <Text style={styles.notifTime}>{notif.time}</Text>
    </View>
    {notif.unread && <View style={styles.unreadIndicator} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FA' },
  header: { paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  cardContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2, overflow: 'hidden' },
  row: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F8FAFC', backgroundColor: '#FFFFFF' },
  rowLast: { borderBottomWidth: 0 },
  rowUnread: { backgroundColor: '#F0F9FF' },
  iconWrapper: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  textContent: { flex: 1, justifyContent: 'center' },
  notifTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 2 },
  textBold: { color: '#0F172A', fontWeight: '800' },
  notifDesc: { fontSize: 14, color: '#475569', marginBottom: 6 },
  notifTime: { fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  unreadIndicator: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0EA5E9', marginTop: 6, marginLeft: 10 },
});
