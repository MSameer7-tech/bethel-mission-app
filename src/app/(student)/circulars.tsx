import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Download, BellRing, Calendar } from 'lucide-react-native';

const circulars = [
  { id: 1, title: 'Schedule for Half Yearly Examinations 2026', date: '05 Oct 2026', ref: 'BMS/2026/Cir-42', isNew: true },
  { id: 2, title: 'Revised Timings for Winter Session', date: '01 Oct 2026', ref: 'BMS/2026/Cir-41', isNew: false },
  { id: 3, title: 'Parent Teacher Meeting Guidelines', date: '28 Sep 2026', ref: 'BMS/2026/Cir-40', isNew: false },
  { id: 4, title: 'Diwali Vacation Announcement', date: '20 Sep 2026', ref: 'BMS/2026/Cir-39', isNew: false },
];

export default function CircularsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {circulars.map(circular => (
        <TouchableOpacity key={circular.id} style={styles.card} accessibilityRole="button">
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <BellRing color={circular.isNew ? "#E11D48" : "#0284C7"} size={24} />
            </View>
            <View style={styles.headerRight}>
              {circular.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
              <Text style={styles.refText}>{circular.ref}</Text>
            </View>
          </View>
          
          <Text style={styles.title} numberOfLines={2}>{circular.title}</Text>
          
          <View style={styles.footer}>
            <View style={styles.dateContainer}>
              <Calendar color="#64748B" size={14} />
              <Text style={styles.dateText}>{circular.date}</Text>
            </View>
            <TouchableOpacity style={styles.downloadBtn} accessibilityRole="button" accessibilityLabel="Download Circular">
              <Download color="#0B3B60" size={16} />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  newBadge: {
    backgroundColor: '#E11D48',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  refText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: '#64748B',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  downloadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0B3B60',
  },
});
