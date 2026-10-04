import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const events = [
  { id: 1, date: '10 Oct 2026', title: 'Mathematics Unit Test', time: '10:00 AM - 11:30 AM', location: 'Classroom VII-C', type: 'Exam' },
  { id: 2, date: '15 Oct 2026', title: 'Parent Teacher Meeting', time: '09:00 AM - 12:00 PM', location: 'School Auditorium', type: 'Event' },
  { id: 3, date: '24 Oct 2026', title: 'Diwali Holidays Begin', time: 'All Day', location: '-', type: 'Holiday' },
];

export default function CalendarScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 24) }}
    >
      {events.map(event => (
        <View key={event.id} style={styles.eventCard}>
          <View style={styles.dateCol}>
            <Text style={styles.dateDay}>{event.date.split(' ')[0]}</Text>
            <Text style={styles.dateMonth}>{event.date.split(' ')[1]}</Text>
          </View>
          <View style={styles.eventContent}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={[styles.typeBadge, 
                event.type === 'Exam' && styles.typeExam,
                event.type === 'Holiday' && styles.typeHoliday,
                event.type === 'Event' && styles.typeEvent,
              ]}>
                <Text style={[styles.typeText,
                  event.type === 'Exam' && styles.typeTextExam,
                  event.type === 'Holiday' && styles.typeTextHoliday,
                  event.type === 'Event' && styles.typeTextEvent,
                ]}>{event.type}</Text>
              </View>
            </View>
            
            <View style={styles.eventDetail}>
              <Clock color={theme.colors.textSecondary} size={14} />
              <Text style={styles.eventDetailText}>{event.time}</Text>
            </View>
            {event.location !== '-' && (
              <View style={styles.eventDetail}>
                <MapPin color={theme.colors.textSecondary} size={14} />
                <Text style={styles.eventDetailText}>{event.location}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dateCol: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.surface,
  },
  dateMonth: {
    fontSize: 14,
    color: theme.colors.borderLight,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  eventContent: {
    flex: 1,
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeExam: { backgroundColor: theme.colors.errorBg },
  typeHoliday: { backgroundColor: theme.colors.successBg },
  typeEvent: { backgroundColor: theme.colors.warningBg },
  typeText: { fontSize: 11, fontWeight: 'bold' },
  typeTextExam: { color: theme.colors.error },
  typeTextHoliday: { color: theme.colors.success },
  typeTextEvent: { color: theme.colors.warning },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  eventDetailText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
});
