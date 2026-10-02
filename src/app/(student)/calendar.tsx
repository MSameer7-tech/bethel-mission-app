import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react-native';

const events = [
  { id: 1, date: '10 Oct 2026', title: 'Mathematics Unit Test', time: '10:00 AM - 11:30 AM', location: 'Classroom VII-C', type: 'Exam' },
  { id: 2, date: '15 Oct 2026', title: 'Parent Teacher Meeting', time: '09:00 AM - 12:00 PM', location: 'School Auditorium', type: 'Event' },
  { id: 3, date: '24 Oct 2026', title: 'Diwali Holidays Begin', time: 'All Day', location: '-', type: 'Holiday' },
];

export default function CalendarScreen() {
  return (
    <ScrollView style={styles.container}>
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
              <Clock color="#64748B" size={14} />
              <Text style={styles.eventDetailText}>{event.time}</Text>
            </View>
            {event.location !== '-' && (
              <View style={styles.eventDetail}>
                <MapPin color="#64748B" size={14} />
                <Text style={styles.eventDetailText}>{event.location}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    overflow: 'hidden',
  },
  dateCol: {
    backgroundColor: '#0B3B60',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateMonth: {
    fontSize: 14,
    color: '#E2E8F0',
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
    color: '#0F172A',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeExam: { backgroundColor: '#FEE2E2' },
  typeHoliday: { backgroundColor: '#DCFCE7' },
  typeEvent: { backgroundColor: '#FEF3C7' },
  typeText: { fontSize: 11, fontWeight: 'bold' },
  typeTextExam: { color: '#B91C1C' },
  typeTextHoliday: { color: '#15803D' },
  typeTextEvent: { color: '#B45309' },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  eventDetailText: {
    fontSize: 13,
    color: '#64748B',
  },
});
